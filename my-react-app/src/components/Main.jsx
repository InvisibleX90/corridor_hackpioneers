import { onAuthStateChanged,signOut } from 'firebase/auth';
import React from 'react'
import {FaPowerOff} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { firebaseAuth } from '../utlies/admin-config';
import './Main.css';

export default function Main() {
    const navigate = useNavigate();
    onAuthStateChanged(firebaseAuth,(currentAuth)=>{
        if(!currentAuth)navigate('/');
    });
  return (
    
    <div className='mainn'>
       <div class="container con">
       
       

        
        <input type="checkbox" id="check"/>
        <label for="check">
            <p id="btn">0</p>
            <p id="cancel">x</p>
        </label>
        <div class="sidebar">
            <header>my app</header>
            <ul>
                <li><a href="https://console.firebase.google.com/u/0/project/admin-coridor/authentication/users">UM</a></li>
                <li>
                    <div class="btn-group dropright">
                        <button type="button" class="btn" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <p class="gg">DE</p>
                        </button>
                        <div class="dropdown-menu dropit">
                            
                            <a class="dropdown-item" href="/add">ADD</a>
                            <a class="dropdown-item" href="#">Edit</a>
                            <a class="dropdown-item" href="#">Delete</a>
                        </div>
                    </div>
                </li>
                <li><a href="#">LOAN</a></li>
                <li><a href="/newUM" onClick={()=>signOut(firebaseAuth)}>New UM</a></li>
                <li><a href="#">New DM</a></li>
                
            </ul>
           
        </div>
        <div class="welcome-message">
          <div className="dd">
          <h2>Welcome to My Site</h2>
            <button onClick={()=>signOut(firebaseAuth)}>
            <FaPowerOff/>
          </button>
          </div>
            
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam fuga sed ducimus ab rerum quas porro, incidunt provident qui tempore reiciendis, aliquam modi commodi similique explicabo quisquam reprehenderit natus saepe quo quos quae soluta.</p>
        </div>

        
        <div class="btn-group dropright">
            
            <div class="dropdown-menu">
                
               
            </div>
        </div>
    </div>
       
    </div>
  )
}


