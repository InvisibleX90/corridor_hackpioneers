import React, { useState } from 'react';

const AddRule = () => {
  const [value, setValue] = useState({
    dataType: '',
    operand: '',
    operator: '', // New state for the operator
  });

  const handleChange = (e) => {
    const { name, value: inputValue } = e.target;

    if (name === 'dataType') {
      // Clear the previous criteria and operator values when changing data type
      setValue((prevValue) => ({
        ...prevValue,
        operand: '',
        // operator: '',
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

  const handleChangeOperator = (e) => {
    const { value: operatorValue } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      operator: operatorValue,
    }));
  };

  return (
    <div>
      <div>
        <label htmlFor="operator">Select Operator:</label>
        <select
            className="form-control"
            id="operator"
            name="operator"
            onChange={handleChangeOperator}
            value={value.operator}
            required
        >
            <option value="">-- Select Operator Type --</option>
            <optgroup label="Arithmetic">
                <option value="+">Addition</option>
                <option value="-">Subtraction</option>
                <option value="*">Multiplication</option>
                <option value="\">Division</option>
            </optgroup>
            <optgroup label="Relational">
                <option value="<">&lt;</option>
                <option value=">">&gt;</option>
                <option value="<=">&le;</option>
                <option value=">=">&ge;</option>
                <option value="==">==</option>
                <option value="!=">!=</option>
            </optgroup>
            <optgroup label="Logical">
                <option value="&&">AND</option>
                <option value="||">OR</option>
                <option value="!">NOT</option>
            </optgroup>
        </select>
      </div>

      <div>
        <label htmlFor="dataType">Select Data Type:</label>
        <select
          className="form-control"
          id="dataType"
          name="dataType"
          onChange={handleChange}
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
            onChange={handleChange}
            value={value.operand}
            required
          >
            <option value="">-- Select Variable --</option>
            <option value="cibil">CIBIL Score</option>
            <option value="loanAmount">Loan Amount</option>
            <option value="loanPeriod">Loan Period</option>
          </select>
        )}
      </div>
    </div>
  );
};

export default AddRule;