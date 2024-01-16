import React from 'react'
import './add.css';
export default function Add() {
  return (
    <div className='container'>
         <h1>Enter Respective Details</h1>
    <form id="myForm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required/>
      </div>
      <div class="form-group">
        <label for="age">Age:</label>
        <input type="number" id="age" name="age" required/>
      </div>
      <div class="form-group">
        <label for="civil-score">Civil Score:</label>
        <input type="number" id="civil-score" name="civil-score" required/>
      </div>
      <div class="form-group">
        <label for="payment">Payment:</label>
        <input type="text" id="payment" name="payment" required/>
      </div>
      <div class="form-group">
        <label for="bank-min-balance">Bank Minimum Balance:</label>
        <input type="number" id="bank-min-balance" name="bank-min-balance" required/>
      </div>
      <div class="form-group">
        <label for="account-id">Account ID:</label>
        <input type="text" id="account-id" name="account-id" required/>
      </div>
      <div class="form-group">
        <label for="bank-name">Bank Name:</label>
        <input type="text" id="bank-name" name="bank-name" required/>
      </div>
      <button type="submit">Submit</button>
    </form>
    </div>
  )
}
