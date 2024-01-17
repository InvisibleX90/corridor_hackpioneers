from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'  
db = SQLAlchemy(app)
migrate = Migrate(app, db)


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

loan_details = {
    "loan_amount": 100000,
    "loan_period": 36,
    "cibil_score": 700,
    "age": 30,
}

# Default rules
rules = {
    "cibil_score": {
        "operator": ">=",
        "value": 700,
        "interest_rate": 0.05,
    },
    "age": {
        "operator": "<=",
        "value": 35,
        "interest_rate": 0.06,
    },
}

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
def save_loan_rule():
    try:
        data = request.json

        # Create a new LoanRule instance
        new_rule = LoanRule(
            rule_id=data['rule_id'],
            cibil_lower=data['cibil']['lowercibil'],
            cibil_higher=data['cibil']['highercibil'],
            loan_amount_lower=data['loanAmount']['loweramt'],
            loan_amount_higher=data['loanAmount']['higheramt'],
            loan_period_lower=data['loanPeriod']['lowerperiod'],
            loan_period_higher=data['loanPeriod']['higherperiod'],
            loan_interest=data['loanInterest'],
            loan_type=data['loanType']
        )

        # Add the new rule to the database
        db.session.add(new_rule)
        db.session.commit()

        return jsonify({'message': f'Loan rule saved successfully rule_id={new_rule.rule_id}'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

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
