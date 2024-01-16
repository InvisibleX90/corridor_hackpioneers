from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'  
db = SQLAlchemy(app)
migrate = Migrate(app, db)


class Rule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    criteria = db.Column(db.String(100), nullable=False, unique=True)
    operator = db.Column(db.String(10), nullable=False)
    value = db.Column(db.Float, nullable=False)
    interest_rate = db.Column(db.Float, nullable=False)

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

@app.route('/api/rules', methods=['GET', 'POST'])
def handle_rules():
    if request.method == 'GET':
        rules = Rule.query.all()
        return jsonify({rule.criteria: {
            'operator': rule.operator,
            'value': rule.value,
            'interest_rate': rule.interest_rate,
        } for rule in rules})
    elif request.method == 'POST':
        data = request.json
        criteria = list(data.keys())[0]

        # Check if the rule already exists
        existing_rule = Rule.query.filter_by(criteria=criteria).first()
        if existing_rule:
            existing_rule.operator = data[criteria]['operator']
            existing_rule.value = data[criteria]['value']
            existing_rule.interest_rate = data[criteria]['interest_rate']
        else:
            new_rule = Rule(criteria=criteria,
                            operator=data[criteria]['operator'],
                            value=data[criteria]['value'],
                            interest_rate=data[criteria]['interest_rate'])
            db.session.add(new_rule)

        db.session.commit()
        return jsonify({criteria: data[criteria]})

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
