// import React from 'react';
// import { Link } from 'react-router-dom';


// const LoanPage = () => {
//   return (
//     <div className="container mt-5">
//       <div className="row">
//         <div className="col-md-6 offset-md-3">
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <h2>Loan Details</h2>
//             <Link to="/loanrule-edit" className="btn btn-success">Edit Rules</Link>
//           </div>
//           {/* Display loan details here (replace with actual loan information) */}
//           <p>Loan Amount: $100,000</p>
//           <p>Loan Term: 36 months</p>
//           <p>Interest Rate: 5%</p>
//           <p>Total Repayment: $105,000</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoanPage;



import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoanDetails = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [loanDetails, setLoanDetails] = useState(null);

  const fetchLoanDetails = () => {
    fetch(`/api/loan/${accountNumber}`)
      .then(response => response.json())
      .then(data => setLoanDetails(data))
      .catch(error => console.error('Error fetching loan details:', error));
  };

  const handleAccountNumberChange = (e) => {
    setAccountNumber(e.target.value);
  };

  let loanDetailsContent;

  if (loanDetails) {
    loanDetailsContent = (
      <>
        <p>Loan Amount: ${loanDetails.loan_amount}</p>
        <p>Loan Term: {loanDetails.loan_period} months</p>
        <p>Interest Rate: {loanDetails.interest_rate * 100}%</p>
        <p>Total Repayment: ${(loanDetails.loan_amount * (1 + loanDetails.interest_rate)).toFixed(2)}</p>
      </>
    );
  } else {
    loanDetailsContent = <div>No loan details available.</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Loan Details</h2>
            <Link to="/loanrule-edit" className="btn btn-success">Edit Rules</Link>
          </div>

          <div className="form-group">
            <label htmlFor="accountNumberInput">Enter Account Number:</label>
            <input
              type="text"
              className="form-control"
              id="accountNumberInput"
              value={accountNumber}
              onChange={handleAccountNumberChange}
            />
          </div>

          <button className="btn btn-primary" onClick={fetchLoanDetails}>
            Fetch Loan Details
          </button>

          {loanDetailsContent}
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
