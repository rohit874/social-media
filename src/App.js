import './styles/App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router , NavLink, Route, Switch } from 'react-router-dom';
import { Login, Signup, Home, Nav, RightWidget, Profile, PostDetails, Notification, Explore, Messages, Bookmarks, Lists, Protected } from './components';
import { HomeIcon, SearchIcon, ProfileIcon } from './icons';
import axios from 'axios';
import { userContext } from './userContext';

function App() {
  const [navStyle, setNavStyle] = useState(false);  
  const [ currentUser , setCurrentUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const[hideSearch, setHideSearch] = useState(false);
  const[loadUser, setLoadUser] = useState(false);
  //handling right widget search input
  const updateHideSearch=()=>{
    setHideSearch(false);
  }
  // fetching the current user data
  useEffect(()=>{
    if (localStorage.hasOwnProperty("authToken")) {
      const loadUserData = async () => {
        var config = {
          headers:{
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${window.localStorage.getItem('authToken')}`
        }};
    
        try {
          const response = await axios.get('https://social-media-rk.herokuapp.com/getuser',config);
          setCurrentUser(response.data.user);
          setIsLogin(true);
        } catch (err) {
          console.log(err.response);
          if (err.response.status===401) {
          Logout(); 
          }
        }
      }
      loadUserData();
    }
  },[loadUser]);

  const Logout = () => {
    localStorage.removeItem('authToken');
    window.location.reload(false);
}


return (
    <>
    <Router>
      <Route path="/login">
        <Login setLoadUser={setLoadUser} />
      </Route>
      <Route path="/signup">
        <Signup setLoadUser={setLoadUser} />
      </Route>
    <userContext.Provider value={{ currentUser }}>
      <div className="app">
      <Nav navStyle={navStyle} Logout={Logout} setNavStyle={setNavStyle} />
      <div className="main">
    <Switch>
      <Route path="/" exact>
      <Protected isLogin={isLogin}  cmp={<Home setNavStyle={setNavStyle} />} />
      </Route>
      <Route path="/explore">
      <Protected isLogin={isLogin}  cmp={<Explore updateHideSearch={updateHideSearch} setHideSearch={setHideSearch} />} />
      </Route>
      <Route path="/notification">
      <Protected isLogin={isLogin}  cmp={<Notification />} />
      </Route>
      <Route path="/messages">
      <Protected isLogin={isLogin}  cmp={<Messages />} />
      </Route>
      <Route path="/bookmarks">
      <Protected isLogin={isLogin}  cmp={<Bookmarks />} />
      </Route>
      <Route path="/lists">
      <Protected isLogin={isLogin}  cmp={<Lists />} />
      </Route>
      <Route path="/post/:postid">
      <Protected isLogin={isLogin}  cmp={<PostDetails />} />
      </Route>
      <Route path="/:username">
      <Protected isLogin={isLogin}  cmp={<Profile />} />
      </Route>
    </Switch>
    <div className="mobile_nav_bottom">
      <NavLink to="/" exact> <HomeIcon className="m_nav_icon" /></NavLink>
      <NavLink to="/explore" exact><SearchIcon className="m_nav_icon" /></NavLink>
      <NavLink to={`/${currentUser?.username}`} exact><ProfileIcon className="m_nav_icon" /></NavLink>
      {/* <NavLink to="/messages" exact><MessageIcon className="m_nav_icon" /></NavLink> */}
    </div>
    </div>
    <RightWidget hideSearch={hideSearch} />   
    </div>
    </userContext.Provider>
    </Router>


    </>
  );
}

export default App;
