import { NavLink } from 'react-router-dom';
import '../styles/search.css';
import { useState } from 'react';
import axios from 'axios';

function Search() {
    const [serachInput, setSerachInput] = useState('');
    const [result, setResult] = useState([]);
    const [searchBox, setSearchBox] = useState(false);

    const searchPeople = () =>{
        const data = {
            serachInput
        }  
        var config = {
            headers:{
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${window.localStorage.getItem('authToken')}`
          }};
      
          axios.post("https://social-media-rk.herokuapp.com/search",data, config)
          .then(res => {
              setResult(res.data.peoples);
      })
      .catch(err => {
          if (err.response) {
              console.log(err);
              console.log(err.response.data.message);
          }
      })
    }
    //handling search box
    const inputFocusOn = () =>{
        setSearchBox(true);
    }
    let timeOut;
    const inputFocusOff = () =>{
        timeOut = setTimeout(()=>{
                setSearchBox(false);
            },400)
    }
    const clearTimeOut = () =>{
        clearTimeout(timeOut);
    }
    return (
        <div className="search_container">
            <input type="text" onFocus={inputFocusOn} onBlur={inputFocusOff} value={serachInput} onChange={(e)=>{setSerachInput(e.target.value);searchPeople()}} placeholder="Search People" />
            <div onBlur={inputFocusOff} className="search_result" style={{display:searchBox?"block":"none"}}>
                { 
                result.length?
                result.map((data)=>{
                    return(
                    <NavLink onClick={clearTimeOut} to={`/${data.username}`} key={data.username}>
                        <img src={data.profile_image} alt="" />
                        <div>
                        <h5>{data.name}</h5>
                        <span>@{data.username}</span>
                        </div>
                </NavLink>
                    )
                }) : <p className="try_search">No result found</p>
                }
            </div>
        </div>
    )
}

export default Search
