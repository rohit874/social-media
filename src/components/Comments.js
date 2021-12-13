import '../styles/feed.css';
import  { LikeIcon, LikedIcon } from '../icons';
import { useState, useEffect, useContext } from 'react';
import { userContext } from '../userContext';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Comments({commentid,userid,userImg,userName,text,postImg,likes,time}) {
    const [ like, setLike] = useState(false);
    const { currentUser } = useContext(userContext);
    const [findIndxs, setFindIndxs] = useState();
    const history = useHistory();

    useEffect(()=>{
    let findIndx;
        if (likes.length) {
            findIndx = likes.indexOf(currentUser.username);
            findIndx>=0 ?  setLike(true) :  setLike(false);
            setFindIndxs(findIndx)
        }
    },[likes,currentUser.username ])

    function likeHandler(e){
        e.preventDefault();
        like ? likes.splice(findIndxs, 1) : likes.push(currentUser.username);
        setLike(!like)
            const data = {
                username:currentUser.username,
                commentid:commentid
            }
            var config = {
                headers:{
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${window.localStorage.getItem('authToken')}`
              }};
          
              axios.post("https://social-media-rk.herokuapp.com/comment-like",data, config)
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
                <div className="posted_by"><h4 onClick={(e)=>{e.preventDefault();history.push(`/${userid}`)}}>{userName}</h4>&nbsp;<span>@{userid} .&nbsp;</span><span>{time}</span></div>
                <p>{text}</p>
                {postImg!=="https://social-media-rk.herokuapp.com/"?<img src={postImg} alt="" />:""}
                <div className="post_bottom comment_bottom">
                    {/* <div><CommentIcon className="post-icons" /><span>{comments}</span></div>
                    <div><RetweetIcon className="post-icons" /><span></span></div> */}
                    <div>{like?<LikedIcon onClick={likeHandler} className="liked_icon" />
                    :<LikeIcon onClick={likeHandler} className="post-icons" />}
                    <span>{likes.length}</span></div>
                    {/* <div><ShareIcon className="post-icons" /><span></span></div> */}
                </div>
            </div>
        </div>
    )
}

export default Comments
