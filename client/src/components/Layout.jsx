import React from 'react'
import { useNavigate } from 'react-router-dom'

import {toast} from 'react-toastify'

export const Layout = (props) => {
    const navigate=useNavigate()
    const userinfo=JSON.parse(localStorage.getItem('User'))
    const removelocal=()=>{
        localStorage.removeItem('User')
        toast.success("sucessfully logout")
        navigate("/login")
    }
    
  return (
    <>
        <div className="header">
            <div className="col">
                <a href="/" className="logo">Rent-A-Car</a>
            </div>
            <div className="col">
                <span className='name'>{userinfo&&userinfo.username}</span>
                {userinfo?<span   onClick={()=>removelocal()} className="logout">LOGOUT</span>:<a href="/login" className="login">login</a>}
               
            </div>
            
            
        </div>
        <div className="main">
            {props.children}
        </div>
        <div className="footer">
            <p>&#169; 2022. All rights reserved. Powered by Abhishek kumar.</p>
        </div>
    </>
  )
}
