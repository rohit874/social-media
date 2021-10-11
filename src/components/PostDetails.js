import { useState, useEffect, useContext, useRef } from 'react';
import { useHistory, useParams } from 'react-router';
import '../styles/tweet.css';
import  { BackIcon, CommentIcon, RetweetIcon, LikeIcon, ShareIcon, LoadingIcon, LikedIcon, InsertImgIcon } from '../icons';
import Comments from './Comments';
import axios from 'axios';
import { userContext } from '../userContext';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

function PostDetails() {
    const { currentUser } = useContext(userContext);
    let history = useHistory();
    const {postid} = useParams();
    const [ like, setLike] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [text, setText] = useState("");
    const [preview, setPreview] = useState();
    const [postDetails, setPostDetails] = useState({});
    const [commentsData, setCommentsData] = useState([]);
    let textAreaRef = useRef();
    const data = new FormData();
    const [findIndxs, setFindIndxs] = useState();
    //checking if already liked post
    useEffect(()=>{
        let findIndx;
        if (postDetails.likes?.length) {
            findIndx = postDetails.likes.indexOf(currentUser.username);
            findIndx>=0 ?  setLike(true) :  setLike(false);
            setFindIndxs(findIndx)
        }
    },[postDetails,currentUser])

    useEffect(()=>{
        const loadPostData = async () => {
            if (currentUser?.username) {
              var config = {
                  headers:{
                  'Content-Type': 'application/json',
                  'Authorization' : `Bearer ${window.localStorage.getItem('authToken')}`
                }};
            
                try {
                  const response = await axios.get(`http://localhost:5000/postdetails/${postid}`,config);
                setPostDetails(response.data.data);
                setCommentsData(response.data.data.comments);
                } catch (err) {
                  console.log(err);
                }
              }
            }
        loadPostData();
    },[currentUser, postid]);

    function likeHandler(e){
        e.preventDefault();
        like ? postDetails.likes.splice(findIndxs, 1) : postDetails.likes.push(currentUser.username);
        setLike(!like)
            const data = {
                username:currentUser.username,
                postid:postDetails._id
            }
            var config = {
                headers:{
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${window.localStorage.getItem('authToken')}`
              }};
          
              axios.post("http://localhost:5000/like",data, config)
              .then(res => {
          })
          .catch(err => {
              if (err.response) {
                  console.log(err.response.data.message);
              }
          })
    }

    //post comment
    const commentHandler = () =>{
        if (!selectedFile && text==="") {
            return;
        }
        data.append("postId", postid);
        data.append("username", currentUser.username);
        data.append("text", text);
        data.append("post_image", selectedFile);
        const config = {
            header: {
              "Content-Type": "form-data"
            },
          };
      axios.post(
      "http://localhost:5000/comment",
      data,
      config).then(res => {
        setSelectedFile(null);
        setPreview(undefined);
        setText("");
        textAreaRef.current.style.height = "50px";
        let appendComment = {...res.data.res, name:currentUser.name, user_image:currentUser.profile_image}
        setCommentsData([appendComment, ...commentsData]);
        })
        .catch(err => {
            if (err.response) {
                console.log(err.response.data.message);
            }
        })
    }

    //preview image when post
    function setPreviewImage(img){
        setSelectedFile(img);
    }
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }
        const createImage = URL.createObjectURL(selectedFile)
        setPreview(createImage)
    },[selectedFile])

    function adjustHeight(e){
        if (e.target.clientHeight < e.target.scrollHeight){
        e.target.style.height = `${e.target.scrollHeight+20}px`; 
        }
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
    function postDate(createdAt){
        let localDate = new Date(createdAt);
        return moment(localDate).format('h:mm A . MMM D, YYYY');
    }

    return (
        <div className="main_container">
            <div className="main_header">
                <BackIcon onClick={()=>history.goBack()} className="main_header_back" />
                <h3>Post</h3>
            </div>
            { postDetails._id ?<>
            <div className="post">   
            <div className="post_details">
                <div className="tweet_head">
                <img src={postDetails.user_image} alt="" />
                <div className="tweet_posted_by">
                <h4>{postDetails.name}</h4>
                <NavLink to={`/${postDetails.username}`}>@{postDetails.username}</NavLink>
                </div>
                </div>
                <p>{postDetails.text}</p>
                <img src={postDetails.post_image} alt="" />
                <div className="tweet_date_likes"><span>{postDate(postDetails.createdAt)}</span><p><span>{postDetails.likes.length}</span> Likes</p></div>
                <div className="post_bottom">
                    <div><CommentIcon className="post-icons" /><span>{commentsData.length}</span></div>
                    <div><RetweetIcon className="post-icons" /><span></span></div>
                    <div>{like?<LikedIcon onClick={likeHandler} className="liked_icon" />
                    :<LikeIcon onClick={likeHandler} className="post-icons" />}
                    <span>{postDetails.likes.length}</span></div>
                    <div><ShareIcon className="post-icons" /><span></span></div>
                </div>
            </div>
        </div>
        <p className="reply_h">Replying to <span>@{postDetails.username}</span></p>
        <div className="tweet_div">
                <img src={currentUser.profile_image} alt="" />
                <div className="tweet_post">
                    <textarea onChange={(e)=>setText(e.target.value)} onKeyUp={(e)=>adjustHeight(e)} ref={textAreaRef} value={text} placeholder="What's happening?"></textarea>
                    {selectedFile &&  <img className="preview_img" src={preview} alt="" /> }
                  <div className="post_btns">
                  <label>
                  <InsertImgIcon className="insert_img_icon" />
                    <input onChange={(e)=>setPreviewImage(e.target.files[0])} type='file' id='image' style={{display:"none"}} name='image' />
                  </label>
                       <button className="comment_btn" onClick={commentHandler}>Comment</button></div> 
                </div>
            </div>
            { commentsData.length ?
            <>
            {
                commentsData.map((data)=>{
                    let time = formatTime(data.createdAt);
            return(       
            <Comments 
               key={data._id}
               commentid={data._id}
               userid={data.username}
               userImg={data.user_image}
               userName={data.name}
               text={data.text}
               postImg={data.post_image}
               comments={data.comments}
               likes={data.likes}
               time={time}
            />)
        })}
             </> : <p className="no_comment">No comments yet</p> }
            </> :
            <div className="content_loading">
            <LoadingIcon className="content_loading_animation" />
            </div> }
        </div> 
    )
}

export default PostDetails
