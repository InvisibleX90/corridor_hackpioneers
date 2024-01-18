import React, { useState , useEffect } from 'react';
import axios from 'axios';
import AddRule from './AddRule';



const LoanRuleEdit = () => {
  const [value, setValue] = useState({
    rule_id: '',
    criteria: '',
    lowerLimit: '',
    lowerOperator: '',
    upperLimit: '',
    inputType: '', // New state for input type
    stringOptions: []
  });

  // const [value, setValue] = useState({
  //   stringOptions: [], //for storing db columnnames
  // });

  const [limitRanges, setLimitRanges] = useState([]); // State to manage multiple limit ranges

  useEffect(() => {
    axios.get('/api/columns')  
      .then(response => {
        const columnNames = response.data; 
        setValue((prevValue) => ({
          ...prevValue,
          stringOptions: columnNames,
        }));
      })
      .catch(error => console.error('Error fetching column names:', error));
  }, []);

  const handleChange = (e, index) => {
    const { name, value: inputValue } = e.target;
    const newLimitRanges = [...limitRanges];
    newLimitRanges[index] = {
      ...newLimitRanges[index],
      [name]: inputValue,
    };
    setLimitRanges(newLimitRanges);
  };

  const handleChangeOne = (e) => {
    const { name, value: inputValue } = e.target;

    if (name === 'dataType') {
      // Clear the previous criteria and operator values when changing data type
      setValue((prevValue) => ({
        ...prevValue,
        operand: '',
        operator: '',
        [name]: inputValue,
      }));
    } else {
      // Check data type and validate accordingly
      if (value.dataType === 'numeric' && isNaN(inputValue)) {
        // If numeric and not a valid number, do not update state
        return;
      }

      setValue((prevValue) => ({
        ...prevValue,
        [name]: inputValue,
      }));
    }
  };

  const handleAddLimitRange = () => {
    // Add the current limit range to the array
    setLimitRanges([...limitRanges, { ...value }]);
    // Clear the input fields for the next limit range
    setValue({
      rule_id: value.rule_id,
      criteria: value.criteria,
      lowerLimit: '',
      lowerOperator: '',
      upperLimit: '',
      inputType: value.inputType,
      stringOptions: value.stringOptions,
    });
  };

  const handleDeleteLimitRange = (index) => {
    // Remove the limit range at the specified index
    setLimitRanges((prevLimitRanges) => [
      ...prevLimitRanges.slice(0, index),
      ...prevLimitRanges.slice(index + 1),
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Process and submit all limit ranges
    const newRules = limitRanges.map((limitRange) => ({
      rule_id: document.getElementById('rule_id').value,
      [limitRange.criteria]: {
        lowerLimit: limitRange.inputType === 'numeric' ? parseFloat(limitRange.lowerLimit) : limitRange.lowerLimit,
        lowerOperator: limitRange.lowerOperator,
        upperLimit: limitRange.inputType === 'numeric' ? parseFloat(limitRange.upperLimit) : limitRange.upperLimit,
      },
    }));

    axios
      .post('/api/rules', newRules)
      .then((response) => {
        console.log('New rules saved:', response.data);
      })
      .catch((error) => console.error('Error saving new rules:', error));
  };

  const [showAddRule, setShowAddRule] = useState(false);

  
  const handleDeleteLastRule = () => {
    // Remove the last added rule
    setLimitRanges((prevLimitRanges) => prevLimitRanges.slice(0, -1));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="rule_id">rule_id (at most 3 letters):</label>
              <div className="input-group">
                <input
                  type="text"
                  onChange={(e) => setValue((prev) => ({ ...prev, rule_id: e.target.value }))}
                  id="rule_id"
                  name="rule_id"
                  maxLength="3"
                  required
                  value={value.rule_id}
                />
              </div>
            </div>

            <div>
              <div>
              <label htmlFor="dataType">Select Data Type:</label>
              <select
                  className="form-control"
                  id="dataType"
                  name="dataType"
                  onChange={handleChangeOne}
                  value={value.dataType}
                  required
              >
                  <option value="">-- Select Data Type --</option>
                  <option value="numeric">Numeric</option>
                  <option value="string">String</option>
              </select>
              </div>

              <div>
              <label htmlFor="operand">Operand:</label>
              {value.dataType === 'numeric' ? (
                <input
                  type="numeric"
                  className="form-control"
                  id="operand"
                  name="operand"
                  placeholder="Number"
                  value={value.operand}
                  onChange={handleChange}
                  required
                />
              ) : (
                <select
                  className="form-control"
                  id="operand"
                  name="operand"
                  onChange={handleChangeOne}
                  value={value.operand}
                  required
                >
                  <option value="">-- Select Variable --</option>
                  {value.stringOptions.map((option) => (
                    <option key={option} value={option}>{option}
                    </option>
                  ))}
                </select>
              )}
              </div>
            </div>

            {limitRanges.map((limit, index) => (
              <AddRule
                key={index}
                index={index}
                limit={limit}
                handleChange={handleChange}
                handleDeleteLimitRange={handleDeleteLimitRange}
              />
            ))}

            {showAddRule && (
              <AddRule
                index={limitRanges.length}
                limit={value}
                handleChange={handleChange}
                handleDeleteLimitRange={() => {}}
              />
            )}

            <div className="mt-3 d-flex justify-content-between">
              <button type="button" className="btn btn-success mt-2" onClick={handleAddLimitRange}>
                Add
              </button>

              <button type="button" className="btn btn-danger mt-2" onClick={handleDeleteLastRule}>
                Delete 
              </button>
            </div>

            <div className="mt-3 d-flex justify-content-between">
            <button type="button" className="btn btn-primary">
                Test
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoanRuleEdit;
