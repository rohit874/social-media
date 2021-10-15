import '../styles/feed.css';
import  { CommentIcon, RetweetIcon, LikeIcon, ShareIcon, LikedIcon } from '../icons';
import { useState, useEffect, useContext } from 'react';
import { userContext } from '../userContext';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Post({postId,userid,userImg,userName,text,postImg,comments,likes,time}) {
    const [ like, setLike] = useState(false);
    const { currentUser } = useContext(userContext);
    const history = useHistory();
    const [findIndxs, setFindIndxs] = useState();
    //checking if current user already liked post
    useEffect(()=>{
        let findIndx;
        if (likes.length) {
            findIndx = likes.indexOf(currentUser.username);
            findIndx>=0 ?  setLike(true) :  setLike(false);
            setFindIndxs(findIndx);
        }
    },[likes,currentUser])

    function likeHandler(e){
        e.preventDefault();
        like ? likes.splice(findIndxs, 1) : likes.push(currentUser.username);
        setLike(!like)
            const data = {
                username:currentUser.username,
                postid:postId
            }
            var config = {
                headers:{
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${window.localStorage.getItem('authToken')}`
              }};
          
              axios.post("https://social-media-rk.herokuapp.com/like",data, config)
              .then(res => {
          })
          .catch(err => {
              if (err.response) {
                  console.log(err.response.data.message);
              }
          })
    }
    return (
        <div className="post">   
            <img src={userImg} alt="" />
            <div className="post_details">
                <div className="posted_by"><h4>{userName}</h4>&nbsp;<span onClick={(e)=>{e.preventDefault();history.push(`/${userid}`)}}>@{userid} .&nbsp;</span><span>{time}</span></div>
                <p>{text}</p>
                {postImg!=="https://social-media-rk.herokuapp.com/" ? <img src={postImg} alt="" />:""}
                <div className="post_bottom">
                    <div><CommentIcon className="post-icons" /><span>{comments}</span></div>
                    <div><RetweetIcon onClick={(e)=>e.preventDefault()} className="post-icons" /><span></span></div>
                    <div>{like?<LikedIcon onClick={likeHandler} className="liked_icon" />
                    :<LikeIcon onClick={likeHandler} className="post-icons" />}
                    <span>{likes.length}</span></div>
                    <div><ShareIcon onClick={(e)=>e.preventDefault()} className="post-icons" /><span></span></div>
                </div>
            </div>
        </div>
    )
}

export default Post
