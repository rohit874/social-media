import {React,useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/auth.css'
import { useHistory } from 'react-router';

function Signup(props) {
    //styling on form inputs
    const history = useHistory();
    const data = new FormData();
    const [label_class, setlabel_class] = useState({
        name_label:"formLabel",
        email_label:"formLabel",
        username_label:"formLabel",
        profile_image_lebel:"formLabel",
        cover_image_lebel:"formLabel",
        location_lebel:"formLabel",
        dob_lebel:"formLabel",
        password_label:"formLabel"
    })
    const inputClicked=(label)=>{
        setlabel_class({...label_class, [label] :"formLabel_focus"});
    }
    const [name,SetName] = useState("");
    const [email,SetEmail] = useState("");
    const [username,SetUsername] = useState("");
    const [profileImage,SetProfileImage] = useState(null);
    const [coverImage,SetCoverImage] = useState(null);
    const [location,SetLocation] = useState("");
    const [dob,SetDob] = useState("");
    const [password,SetPassword] = useState("");
    const [error, setError] = useState("");
    //register user
    const SignUpHandler = async (e) =>{
        e.preventDefault();
        data.append("name", name);
        data.append("email", email);
        data.append("username", username);
        data.append("profile_image", profileImage);
        data.append("cover_image", coverImage);
        data.append("location", location);
        data.append("dob", dob);
        data.append("password", password);

        const config = {
            header: {
              "Content-Type": "form-data"
            },
          };

      axios.post(
      "http://localhost:5000/register",
      data,
      config).then(res => {
        localStorage.setItem("authToken", res.data.access_token);
        props.setIsLogin(true);
        history.push('/');
})
.catch(err => {
    if (err.response) {
      setError(err.response.data.message);
      setTimeout(() => {
              setError("");
            }, 5000);
    }
})
  }
    return (
        <div className="signnup_div_parent">
        <div className="signnup_div">
            <div className="form_heading_div">
                <h2 className="form_heading">Sign up</h2>
                <button className="hide_form_btn" onClick={props.hidebtn}>&#x2715;</button>
            </div>

            <p className="error">{error}</p>
            <form onSubmit={(e)=>SignUpHandler(e)} encType="multipart/form-data">
            <div className="signInUp_input">
            <label className={label_class.name_label}>Full Name</label>
            <input type="text" onClick={()=>inputClicked("name_label")} onChange={(e)=>SetName(e.target.value)} value={name} name="name" placeholder="" autoComplete="on"/>
            </div>

            <div className="signInUp_input">
            <label className={label_class.email_label}>Email</label>
            <input type="email" onClick={()=>inputClicked("email_label")} onChange={(e)=>SetEmail(e.target.value)} value={email} name="Email" placeholder="" autoComplete="on"/>
            </div>

            <div className="signInUp_input">
            <label className={label_class.username_label}>Username</label>
            <input type="text" onClick={()=>inputClicked("username_label")} onChange={(e)=>SetUsername(e.target.value)} value={username} name="username" placeholder="" autoComplete="on"/>
            </div>

            <div className="signInUp_input">
            <label className={label_class.profile_image_lebel}>Profile Image</label>
            <input type="file" onClick={()=>inputClicked("profile_image_lebel")} onChange={(e)=>{SetProfileImage(e.target.files[0])}} name="profile_image" placeholder="" autoComplete="on"/>
            </div>

            <div className="signInUp_input">
            <label className={label_class.cover_image_lebel}>Cover Image</label>
            <input type="file" onClick={()=>inputClicked("cover_image_lebel")} onChange={(e)=>{SetCoverImage(e.target.files[0])}} name="cover_image" placeholder="" autoComplete="on"/>
            </div>

            <div className="signInUp_input">
            <label className={label_class.location_lebel}>Location</label>
            <input type="text" onClick={()=>inputClicked("location_lebel")} onChange={(e)=>SetLocation(e.target.value)} value={location} name="location" placeholder="" autoComplete="on"/>
            </div>

            <div className="signInUp_input">
            <label className={label_class.dob_lebel}>Date of birth</label>
            <input type="text" onClick={()=>inputClicked("dob_lebel")} onChange={(e)=>SetDob(e.target.value)} value={dob} name="dob" placeholder="" autoComplete="on"/>
            </div>

            <div className="signInUp_input">
            <label className={label_class.password_label}>Password</label>
            <input type="password" onClick={()=>inputClicked("password_label")} onChange={(e)=>SetPassword(e.target.value)} value={password} name="password" placeholder="" autoComplete="on"/>
            </div>
        
            <div className="signup_btn_div"><button className="signup_btn">Create Account</button></div>
            </form>
            <p className="signup_have">Already have an account? <Link to="/login">Log in</Link></p>
        </div>
        </div>
    )
}

export default Signup
