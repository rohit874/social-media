import {React, useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/auth.css'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';


function Login({setIsLogin}) {
  const history = useHistory();
  useEffect(()=>{
    if (localStorage.hasOwnProperty('authToken')) {
      history.push('/');
    }
  },[history])

    //styling on form inputs
    const [label_class, setlabel_class] = useState({
        email_label:"formLabel",
        password_label:"formLabel"
    })
    const inputClicked=(label)=>{
        setlabel_class({...label_class, [label] :"formLabel_focus"});
    }
    let [email,SetEmail] = useState("");
    let [password,SetPassword] = useState("");
    const [error, setError] = useState("");

    function GuestLogin(e){
      e.preventDefault();
      email = "rk@gmail.com";
      password = "12345678";
       LoginHandler(e,true);
    }


    const LoginHandler = async (e) =>{
        e.preventDefault();
        if (!email || !password) {
          setError("please fill email and password");
          setTimeout(() => {
            setError("");
          }, 5000);
          return;
        }
        const config = {
            header: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            },
          };

          try {
            const res = await axios.post('https://social-media-rk.herokuapp.com/login', { email, password }, config);
            localStorage.setItem("authToken", res.data.access_token);
            setIsLogin(true);
            history.push('/');
          } catch (err) {
            console.log(err);
            if (err.response) {
                      setError(err.response.data.message);
                      setTimeout(() => {
                              setError("");
                            }, 5000);
                    }
          }
}

    return (
        <div className="signnup_div_parent">
        <div className="signnup_div">
            
        <div className="form_heading_div">
                <h2 className="form_heading">Login</h2>
                {/* <button className="hide_form_btn" onClick={props.hidebtn}>&#x2715;</button> */}
                <Link to="/" className="hide_form_btn">&#x2715;</Link>
            </div>
            <p className="error">{error}</p>
             <form>
            <div className="signInUp_input">
            <label className={label_class.email_label}>Email</label>
            <input type="email" onClick={()=>inputClicked("email_label")} onChange={(e)=>SetEmail(e.target.value)} value={email} name="Email" placeholder="" autoComplete="on"/>
            </div>

            <div className="signInUp_input">
            <label className={label_class.password_label}>Password</label>
            <input type="password" onClick={()=>inputClicked("password_label")} onChange={(e)=>SetPassword(e.target.value)} value={password} name="password" placeholder="" autoComplete="off"/>
            </div>
    
            <div className="signup_btn_div">
              <button onClick={(e)=>LoginHandler(e)} className="signup_btn">Login</button>
              <button onClick={(e)=>GuestLogin(e)} className="signup_btn">Login as Guest</button>
              </div>
            </form>
            <p className="signup_have">New to Hummingbird? <Link to="/signup">Create account</Link></p>
        </div>
        </div>
    )
}

export default Login
