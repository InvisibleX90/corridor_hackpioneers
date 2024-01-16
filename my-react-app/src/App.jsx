import React, {useState, useEffect} from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom";
import UserLogin from './pages/UserLogin';
import AdminLogin from './pages/AdminLogin';
import LoanRuleEdit from './components/LoanRuleEdit';
import Loan from './pages/Loan'
import Main from './components/Main';
import Main2 from './components/Main2';
import Add from './pages/Add';
import NewUm from './pages/NewUm';

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<UserLogin/>}/>
      <Route exact path="/admin" element={<AdminLogin/>}/>
      <Route exact path="/main" element={<Main/>}/>
      <Route exact path="/main2" element={<Main2/>}/>
      <Route exact path="/add" element={<Add/>}/>
      <Route exact path="/newUM" element={<NewUm/>}/>
      <Route exact path="/loan" element={<Loan/>}/>
      <Route exact path="/loanrule-edit" element={<LoanRuleEdit/>}/>
    </Routes>
    </BrowserRouter>
  )
}
