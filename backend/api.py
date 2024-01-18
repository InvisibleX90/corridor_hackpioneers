import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy.dialects.postgresql import JSON


app = Flask(__name__)

# load_dotenv()
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')  
db = SQLAlchemy(app)
migrate = Migrate(app, db)

app.config['SQLALCHEMY_BINDS'] = {
    'second_database': 'sqlite:///rule.db'
}
db_second = SQLAlchemy(app)

class LoanRule(db.Model):
    rule_id = db.Column(db.String(3), primary_key=True)
    cibil_lower = db.Column(db.Float)
    cibil_higher = db.Column(db.Float)
    loan_amount_lower = db.Column(db.Float)
    loan_amount_higher = db.Column(db.Float)
    loan_period_lower = db.Column(db.Float)
    loan_period_higher = db.Column(db.Float)
    loan_interest = db.Column(db.Float)
    loan_type = db.Column(db.String(50))

class Rule(db_second.Model):
    id = db_second.Column(db.Integer, primary_key=True)
    rule_id = db_second.Column(db.String(3))
    dynamic_columns = db_second.Column(JSON)  # Use JSON type for dynamic columns

    def __repr__(self):
        return f'<Rule {self.id}>'



@app.route('/api/columns', methods=['GET'])
def get_columns():
    inspector = db.inspect(db.engine)
    tables = inspector.get_table_names()

    # Fetch column names from all tables in the database
    column_names = []

    for table_name in tables:
        columns = inspector.get_columns(table_name)
        column_names.extend(column['name'] for column in columns)

    return jsonify(column_names)

# loan_details = {
#     "loan_amount": 100000,
#     "loan_period": 36,
#     "cibil_score": 700,
#     "age": 30,
# }

# # Default rules
# rules = {
#     "cibil_score": {
#         "operator": ">=",
#         "value": 700,
#         "interest_rate": 0.05,
#     },
#     "age": {
#         "operator": "<=",
#         "value": 35,
#         "interest_rate": 0.06,
#     },
# }

@app.route('/api/loan', methods=['GET', 'POST'])
def handle_loan_details():
    if request.method == 'GET':
        return jsonify(loan_details)
    elif request.method == 'POST':
        data = request.json
        loan_details.update(data)
        update_interest_rate()
        return jsonify(loan_details)

# @app.route('/api/rules', methods=['GET', 'POST'])
# def handle_rules():
#     if request.method == 'GET':
#         rules = Rule.query.all()
#         return jsonify({rule.criteria: {
#             'operator': rule.operator,
#             'value': rule.value,
#             'interest_rate': rule.interest_rate,
#         } for rule in rules})
#     elif request.method == 'POST':
#         data = request.json
#         criteria = list(data.keys())[0]

#         # Check if the rule already exists
#         existing_rule = Rule.query.filter_by(criteria=criteria).first()
#         if existing_rule:
#             existing_rule.operator = data[criteria]['operator']
#             existing_rule.value = data[criteria]['value']
#             existing_rule.interest_rate = data[criteria]['interest_rate']
#         else:
#             new_rule = Rule(criteria=criteria,
#                             operator=data[criteria]['operator'],
#                             value=data[criteria]['value'],
#                             interest_rate=data[criteria]['interest_rate'])
#             db.session.add(new_rule)

#         db.session.commit()
#         return jsonify({criteria: data[criteria]})

@app.route('/api/rules', methods=['POST'])
def add_rules():
    try:
        new_rules = request.json
        for rule_data in new_rules:
            rule = Rule(
                rule_id=rule_data['rule_id'],
                dynamic_columns=rule_data[list(rule_data.keys())[1]]  # Assuming criteria is the second key in each rule
            )
            db.session.add(rule)

        db.session.commit()
        return jsonify({"message": "Rules added successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.session.close()
        
def update_interest_rate():
    # Update interest rate based on rules and loan details
    interest_rate = 0.05  # default interest rate
    for rule_key, rule in rules.items():
        if rule_key in loan_details and apply_rule(rule, loan_details[rule_key]):
            interest_rate = rule['interest_rate']
            break
    loan_details['interest_rate'] = interest_rate

def apply_rule(rule, value):
    operator = rule['operator']
    rule_value = rule['value']
    if operator == '>=':
        return value >= rule_value
    elif operator == '<=':
        return value <= rule_value



if __name__ == '__main__':
    app.run(debug=True)
