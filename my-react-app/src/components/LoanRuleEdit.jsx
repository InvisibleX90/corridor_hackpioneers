import React, { useState } from 'react';
import axios from 'axios';

const LoanRuleEdit = () => {
  const [value, setValue] = useState({
    rule_id: '',
    lowercibil: '',
    highercibil: '',
    loweramt: '',
    higheramt: '',
    lowerperiod: '',
    higherperiod: '',
  });

  const handleChange = (e) => {
    const { name, value: inputValue } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: name === 'rule_id' ? inputValue.toUpperCase() : inputValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRule = {
      rule_id: value.rule_id,
      cibil: {
        lowercibil: parseFloat(value.lowercibil),
        highercibil: parseFloat(value.highercibil),
      },
      loanAmount: {
        loweramt: parseFloat(value.loweramt),
        higheramt: parseFloat(value.higheramt),
      },
      loanPeriod: {
        lowerperiod: parseFloat(value.lowerperiod),
        higherperiod: parseFloat(value.higherperiod),
      },
      loanInterest: parseFloat(document.getElementById('loanInterestInput').value) || 0.07,
      loanType: document.getElementById('siCiDropdown').value,
    };

    axios
      .post('/api/rules', newRule)
      .then((response) => {
        console.log('New rule saved:', response.data);
        // Handle success or additional logic here
      })
      .catch((error) => console.error('Error saving new rule:', error));
  };

  const validateRuleId = () => {
    const rule_idInput = document.getElementById('rule_id');
    const errorMessage = document.getElementById('errorMessage');

    if (rule_idInput.value.length < 3) {
      errorMessage.textContent = 'Rule ID must be 3 letters.';
    } else {
      errorMessage.textContent = '';
      // You can handle form submission logic here
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="rule_id">Rule ID (3 letters):</label>
              <div className="input-group">
                <input
                  type="text"
                  id="rule_id"
                  name="rule_id"
                  maxLength="3"
                  placeholder="Eg: RH1, RP5"
                  required
                  value={value.rule_id}
                  onBlur={validateRuleId}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="cibilRange">CIBIL Score</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="lowercibil"
                  name="lowercibil"
                  placeholder="Lower limit"
                  value={value.lowercibil}
                  onChange={handleChange}
                />
                <p className='pp'>-</p>
                <input
                  type="number"
                  className="form-control"
                  id="highercibil"
                  name="highercibil"
                  placeholder="Upper limit"
                  value={value.highercibil}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="loanAmountRange">Amount</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="loweramt"
                  name="loweramt"
                  placeholder="Lower limit"
                  value={value.loweramt}
                  onChange={handleChange}
                />
                <p className='pp'>-</p>
                <input
                  type="number"
                  className="form-control"
                  id="higheramt"
                  name="higheramt"
                  placeholder="Upper limit"
                  value={value.higheramt}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="loanPeriodRange">Period</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="lowerperiod"
                  name="lowerperiod"
                  placeholder="Lower limit"
                  value={value.lowerperiod}
                  onChange={handleChange}
                />
                <p className='pp'>-</p>
                <input
                  type="number"
                  className="form-control"
                  id="higherperiod"
                  name="higherperiod"
                  placeholder="Upper limit"
                  value={value.higherperiod}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="loanInterestInput">Interest</label>
              <input
                type="number"
                className="form-control"
                id="loanInterestInput"
                name="loanInterestInput"
                placeholder="Eg: 10"
              />
            </div>

            <div className="form-group">
              <label htmlFor="siCiDropdown">Loan Type</label>
              <select
                className="form-control"
                id="siCiDropdown"
                name="siCiDropdown"
              >
                <option value="">-- Select --</option>
                <option value="Home Loan">Home Loan</option>
                <option value="Student Loan">Student Loan</option>
                <option value="Personal Loan">Personal Loan</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
            <p class="error-message" id="errorMessage"></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoanRuleEdit;