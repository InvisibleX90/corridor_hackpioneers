import React from 'react'
import styled from 'styled-components'
import { useState } from 'react';
import { firebaseAuth } from "../utlies/admin-config";
import {signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function UserLogin() {
  const navigate = useNavigate();

  const [formvalues,setformvalues]=useState({
    email:"",
    password:"",
});
const handlesignin = async()=>{
  try {
      const {email,password}=formvalues;
      await signInWithEmailAndPassword(firebaseAuth,email,password);
  } catch (error) {
      console.log(error);
  }
};
onAuthStateChanged(firebaseAuth,(currentAuth)=>{
  if(currentAuth)navigate("/main2");
})
  return (
    <Container>
      <h2>Login</h2>
      <form>
        <label>
          Email:
          <input type="email" placeholder='Email' name='email' value={formvalues.email} onChange={(e)=>setformvalues({...formvalues,[e.target.name]:e.target.value,})} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" placeholder='password' name='password' value={formvalues.password} onChange={(e)=>setformvalues({...formvalues,[e.target.name]:e.target.value,})} />
        </label>
        <br />
        <button type="button" onClick={handlesignin}>
          Login
        </button>
      </form>
    </Container>
  )
}
const Container = styled.div``;
