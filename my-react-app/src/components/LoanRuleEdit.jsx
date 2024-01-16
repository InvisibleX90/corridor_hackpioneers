import React, { useState, useEffect } from 'react';
import './LoanRuleEdit.css';

const LoanRuleEdit = () => {
  const [criteria, setCriteria] = useState('');
  const [operator, setOperator] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    fetchDefaultRules();
  }, []);

  const fetchDefaultRules = () => {
    fetch('/api/rules')
      .then(response => response.json())
      .then(data => {
        // Set default values for criteria, operator, and value
        const defaultRule = Object.values(data)[0];
        setCriteria(Object.keys(data)[0]);
        setOperator(defaultRule.operator);
        setValue(defaultRule.value);
      })
      .catch(error => console.error('Error fetching default rules:', error));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRule = {
      [criteria]: {
        operator: operator,
        value: parseFloat(value),
        interest_rate: 0.07, // Set a default interest rate for the rule
      },
    };

    fetch('/api/rules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRule),
    })
      .then(response => response.json())
      .then(data => {
        console.log('New rule saved:', data);
      })
      .catch(error => console.error('Error saving new rule:', error));
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form>
          <div class="form-group">
            <label for="criteriaDropdown">Select Criteria</label>
            <select class="form-control" id="criteriaDropdown">
              <option value="">-- Select --</option>
              <option value="cibil">CIBIL Score</option>
              <option value="loanAmount">Loan Amount</option>
              <option value="loanPeriod">Loan Period</option>
          
            </select>
          </div>

          <div class="form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <select class="form-control" id="comparisonDropdown">
                  <option value="">-- Comparison --</option>
                  
                  <option value="=">=</option>
                  <option value="<">&lt;</option>
                  <option value=">">&gt;</option>
                  <option value="<=">&le;</option>
                  <option value=">=">&ge;</option>
                </select>
              </div>
              <input type="number" class="form-control" id="numericInput" placeholder="Enter value" />
            </div>
          </div>

          <div class="form-group">
            <label for="loanInterestDropdown">Loan Interest</label>
            <input type="number" class="form-control" id="loanInterestInput" placeholder="Loan Interest" />
          </div>

          <div class="form-group">
            <label for="siCiDropdown">Simple Interest / Compound Interest</label>
            <select class="form-control" id="siCiDropdown">
              <option value="">-- Select --</option>
              <option value="si">Simple Interest</option>
              <option value="ci">Compound Interest</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoanRuleEdit;
