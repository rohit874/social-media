import { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/nav.css';
import  { TwitterIcon, HomeIcon, ExploreIcon , NotificationIcon, MessageIcon, BookmarksIcon, ListsIcon, ProfileIcon, MoreIcon, CutIcon } from '../icons';
import { userContext } from '../userContext';

function Nav({ navStyle, setNavStyle, Logout }) {
  const { currentUser } = useContext(userContext);
  //switch b/w light & Dark theme
  let theme_dark = "--theme: #15202b; --text: white; --background:#383838; --shadow: #d6d6d671; --hover: #1d2935";
  let theme_light = "--theme: white; --text: black; --background:#ececec; --shadow: #00000033; --hover: #f7f7f7";
  const [themeDark, setThemeDark] = useState(false);
  //checking if dark theme already set 
  useEffect(()=>{
    if (!localStorage.hasOwnProperty("theme")) {
        localStorage.setItem('theme','light');
    }
    else{
      let theme = localStorage.getItem('theme');
      if (theme==="dark") {
      document.documentElement.style.cssText = theme_dark;
      document.getElementById('themeInput').checked = true;
      setThemeDark(true)
      }
    }
  },[theme_dark])

  const Changetheme = () => {
    if (!themeDark) {
      document.documentElement.style.cssText = theme_dark;
      localStorage.setItem('theme','dark');
    }
    else{
      document.documentElement.style.cssText = theme_light;
      localStorage.setItem('theme','light');
    }
    setThemeDark(!themeDark);
  }
  
    return (
        <nav style={{maxWidth:navStyle?"300px":""}}>
          <div className="navHeader">
            {
              navStyle?<CutIcon onClick={()=>setNavStyle(false)} className="cut_icon" />
              :<TwitterIcon className="twitter_icon" />
            }
          <div className="theme-switch">
            <span className="theme-icon">&#9728;</span>
            <label className="switch">
              <input id="themeInput" onChange={Changetheme} type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
          </div>
          <div onClick={()=>setNavStyle(false)} className="navlinks">
            <NavLink to='/' exact className="navlink"><HomeIcon className="nav_icon" /><h2>Home</h2></NavLink>
            <NavLink to='/explore' exact className="navlink"><ExploreIcon className="nav_icon" /><h2>Explore</h2></NavLink>
            <NavLink to='/notification' exact className="navlink"><NotificationIcon className="nav_icon" /><h2>Notification</h2></NavLink>
            <NavLink to='/messages' exact className="navlink"><MessageIcon className="nav_icon" /><h2>Messages</h2></NavLink>
            <NavLink to='/bookmarks' exact className="navlink"><BookmarksIcon className="nav_icon" /><h2>Bookmarks</h2></NavLink>
            <NavLink to='/lists' exact className="navlink"><ListsIcon className="nav_icon" /><h2>Lists</h2></NavLink>
            <NavLink to={`/${currentUser?.username}`} exact className="navlink"><ProfileIcon className="nav_icon" /><h2>Profile</h2></NavLink>
            <NavLink to='/more' onClick={(e)=>e.preventDefault()} exact className="navlink"><MoreIcon className="nav_icon" /><h2>More</h2></NavLink>
          </div>
         {/* <button className="tweet_btn">Tweet</button> */}
         { currentUser ?
         <div className="nav_profile">
         <NavLink to={`/${currentUser?.username}`} exact>
             <img src={currentUser?.profile_image} alt="" />
             <div>
               <h5>{currentUser?.name}</h5>
               <span>@{currentUser?.username}</span>
             </div>
             </NavLink>
           <button onClick={()=>Logout()} className="logout_btn">Logout</button>
         </div>
         : ""}
    </nav>
    )
}

export default Nav
