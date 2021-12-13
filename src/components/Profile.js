import '../styles/profile.css';
import { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router';
import  { LocationIcon, BirthdayIcon, CalenderIcon, VerifiedIcon, BackIcon, LoadingIcon } from '../icons';
import Post from './Post';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { userContext } from '../userContext';

function Profile() {
    const { currentUser } = useContext(userContext);
    let history = useHistory();
    const {username} = useParams();
    const [ user, setUser] = useState();
    const [postData, setPostData] = useState([]);
    const [followers,setFollowers] = useState([]);
    const [follow,setFollow] = useState(false);

    useEffect(()=>{
          const loadProfile = async () => {
              if (!currentUser) {
                  return;
              }
                var config = {
                    headers:{
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${window.localStorage.getItem('authToken')}`
                  }};
              
                  try {
                    const response = await axios.get(`https://social-media-rk.herokuapp.com/profile/${username}`,config);
                    setFollowers(response.data.user.followers);
                    setUser(response.data.user);
                    setPostData(response.data.userPost);
                  } catch (err) {
                    console.log(err);
                  }
              }
              loadProfile();
      },[username,currentUser]);

      //handling follow / unfollow
      useEffect(()=>{
        let findUser;
        if (currentUser?.following.length && user) {
            findUser = currentUser.following.indexOf(user.username);
            findUser>=0 ?  setFollow(true) :  setFollow(false);
        }
      },[currentUser?.following,user])

      const followHandler = () =>{
        follow ?
         currentUser.following = currentUser.following.filter((uname)=>uname!==user.username)
          : currentUser.following = [...currentUser.following, user.username];
        setFollow(!follow)
        const data = {
            username:user.username,
            currentusername:currentUser.username
        }  
        var config = {
            headers:{
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${window.localStorage.getItem('authToken')}`
          }};
      
          axios.post("https://social-media-rk.herokuapp.com/follow",data, config)
          .then(res => {
      })
      .catch(err => {
          if (err.response) {
              console.log(err);
              console.log(err.response.data.message);
          }
      })
      }

      function formatTime(createdAt){
        let localDate = new Date(createdAt);
        let dbTime = moment(localDate).format('h:mm A');
        let dbDate = moment(localDate).format('MMM D');
        let dbYear = moment(localDate).format('MMM D, YYYY');
        let dbY = moment(localDate).format('YYYY')
        let currentdate = moment().format('MMM D, YYYY');
        let currentY = moment().format('YYYY');
        if (currentdate===dbYear) {
            return dbTime;
        }
        else if (dbY===currentY) {
            return dbDate;
        }
        else{
            return dbYear;
        }
    }
    function getJoinedDate(createdAt){
        let localDate = new Date(createdAt);
       return moment(localDate).format('MMMM, YYYY');
    }

    return (
        <div className="main_container">
            <div className="main_header">
                <BackIcon onClick={()=>history.goBack()} className="main_header_back" />
                <div>
                <h4>{user?.name}</h4>
                <span>{postData?.length} Post</span>
                </div>
            </div>
            { user? <>
            <div className="profile_info">
            <img className="profile_cover" src={user.cover_image} alt="" />
            <div className="profile_title">
                <div className="profile_text">
                <div className="profile_img_div">
                <img className="profile_pic" src={user.profile_image} alt="" />
                {currentUser.username!==user.username?<button onClick={followHandler}>{follow?"Following":"Follow"}</button>:""}
                </div>
                <div className="profile_name"><h4>{user.name}</h4><VerifiedIcon className="verified" /></div>
                <span>@{user.username}</span>
                <div className="profile_more_info">
                    {user.location?<span><LocationIcon className="svg" />{user.location}</span>:""}
                    {user.dob?<span><BirthdayIcon className="svg" /> {user.dob} </span>:""}
                    <span> <CalenderIcon className="svg" />Joined {getJoinedDate(user.createdAt)}</span>
                    <span> <span>{user.following.length}</span> Following</span>
                    <span> <span>{followers.length}</span> Followers</span>
                </div>
                </div>
            </div>
            </div>
            <div className="profile_tweets">
            <div className="profile_tweet_header"><h4>Posts</h4></div>
            {
                postData.length?
                postData.map((data)=>{
                    let time = formatTime(data.createdAt);
                    return(
                    <Link to={`/post/${data._id}`} key={data._id}> 
                    <Post
                    postId={data._id}
                    userid={user.username}
                    userImg={user.profile_image}
                    userName={user.name}
                    text={data.text}
                    postImg={data.post_image}
                    comments={data.comments.length}
                    likes={data.likes}
                    time={time}
                    />
                    </Link>
                    )
                }) : <p className="no_comment">No Post yet</p>
            }
            </div></> :
            <div className="content_loading">
            <LoadingIcon className="content_loading_animation" />
            </div> }

        </div>
    )
}

export default Profile
