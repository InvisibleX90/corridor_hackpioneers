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




// LoanDetails.js (React component)

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const LoanDetails = () => {
  const [loanDetails, setLoanDetails] = useState(null);

  useEffect(() => {
    fetchLoanDetails();
  }, []);

  const fetchLoanDetails = () => {
    fetch('/api/loan')
      .then(response => response.json())
      .then(data => setLoanDetails(data))
      .catch(error => console.error('Error fetching loan details:', error));
  };

  if (!loanDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Loan Details</h2>
            <Link to="/loanrule-edit" className="btn btn-success">Edit Rules</Link>
          </div>
          <p>Loan Amount: ${loanDetails.loan_amount}</p>
          <p>Loan Term: {loanDetails.loan_period} months</p>
          <p>Interest Rate: {loanDetails.interest_rate * 100}%</p>
          <p>Total Repayment: ${(loanDetails.loan_amount * (1 + loanDetails.interest_rate)).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
