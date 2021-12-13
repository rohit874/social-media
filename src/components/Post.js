import '../styles/feed.css';
import  { CommentIcon, LikeIcon, ShareIcon, LikedIcon } from '../icons';
import { useState, useEffect, useContext } from 'react';
import { userContext } from '../userContext';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Post({postId,userid,userImg,userName,text,postImg,comments,likes,time}) {
    const [ like, setLike] = useState(false);
    const { currentUser } = useContext(userContext);
    const history = useHistory();
    const [findIndxs, setFindIndxs] = useState();
    const [ ShareAlert, setShareAlert] = useState(false);
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
    const SharePostHandling = (postid) =>{
        setShareAlert(true);
        const el = document.createElement('input');
        el.value = `https://social-media-6612b.web.app/post/${postid}`;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        setTimeout(() => {
            setShareAlert(false);
        }, 2000);
    }
    return (
        <div className="post">   
            <img src={userImg} onClick={(e)=>{e.preventDefault();history.push(`/${userid}`)}} alt="" />
            <div className="post_details">
                <div className="posted_by"><h4 onClick={(e)=>{e.preventDefault();history.push(`/${userid}`)}}>{userName}</h4>&nbsp;<span onClick={(e)=>{e.preventDefault()}}>@{userid} .&nbsp;</span><span>{time}</span></div>
                <p>{text}</p>
                {postImg!=="https://social-media-rk.herokuapp.com/" ? <img src={postImg} alt="" />:""}
                <div className="post_bottom">
                    <div><CommentIcon className="post-icons" /><span>{comments}</span></div>
                    {/* <div><RetweetIcon onClick={(e)=>e.preventDefault()} className="post-icons" /><span></span></div> */}
                    <div>{like?<LikedIcon onClick={likeHandler} className="liked_icon" />
                    :<LikeIcon onClick={likeHandler} className="post-icons" />}
                    <span>{likes.length}</span></div>
                    {ShareAlert && <p className="copy_alert">link copied on clipboard</p>}
                    <div><ShareIcon onClick={(e)=>{e.preventDefault();SharePostHandling(postId)}} className="post-icons" /><span></span></div>
                </div>
            </div>
        </div>
    )
}

export default Post
