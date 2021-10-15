import '../styles/Home.css';
import  { InsertImgIcon, LoadingIcon } from '../icons';
import { Link } from 'react-router-dom'
import { useState, useEffect, useContext, useRef } from 'react';
import { Post } from '../components';
import { userContext } from '../userContext';
import axios from 'axios';
import moment from 'moment';

function Home({setNavStyle}) {
    const { currentUser } = useContext(userContext);
    const [selectedFile, setSelectedFile] = useState();
    const [text, setText] = useState("");
    const [preview, setPreview] = useState();
    const [postData, setPostData] = useState([]);
    let textAreaRef = useRef();
    const data = new FormData();

    //save new post
    const postHandler = () =>{
        if (!selectedFile && text==="") {
            return;
        }
        data.append("username", currentUser.username);
        data.append("text", text);
        data.append("post_image", selectedFile);
        const config = {
            header: {
              "Content-Type": "form-data"
            },
          };
      axios.post(
      "https://social-media-rk.herokuapp.com/post",
      data,
      config).then(res => {
        setSelectedFile(null);
        setPreview(undefined);
        setText("");
        textAreaRef.current.style.height = "50px";
        let appendPost = {...res.data.res, name:currentUser.name, user_image:currentUser.profile_image}
        setPostData([appendPost, ...postData]);
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
    //loading feed data
    useEffect(()=>{
        const loadPostData = async () => {
            if (currentUser?.username) {
              var config = {
                  headers:{
                  'Content-Type': 'application/json',
                  'Authorization' : `Bearer ${window.localStorage.getItem('authToken')}`
                }};
            
                try {
                  const response = await axios.get(`https://social-media-rk.herokuapp.com/getpost`,config);
                  setPostData(response.data.res);
                } catch (err) {
                  console.log(err.response.data.message);
                }
              }
            }
        loadPostData();
    },[currentUser]);
    //formatting posts time
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

    return (
        <div className="main_container">
            <div className="main_header">
            <img onClick={()=>setNavStyle(true)} className="home_header_pic" src={currentUser?.profile_image} alt="" />
                <h3>Home</h3>
            </div>
            { currentUser ? <>
            <div className="tweet_div">
                <img src={currentUser?.profile_image} alt="" />
                <div className="tweet_post">
                    <textarea onChange={(e)=>setText(e.target.value)} onKeyUp={(e)=>adjustHeight(e)} ref={textAreaRef} value={text} placeholder="What's happening?"></textarea>
                    {selectedFile &&  <img className="preview_img" src={preview} alt="" /> }
                  <div className="post_btns">
                  <label>
                  <InsertImgIcon className="insert_img_icon" />
                    <input onChange={(e)=>setPreviewImage(e.target.files[0])} type='file' id='image' style={{display:"none"}} accept="image/png, image/jpeg" name='image' />
                  </label>
                       <button onClick={postHandler}>Post</button></div> 
                </div>
            </div>
            <div className="posts">
            {
                 postData.length?
                postData.map((data)=>{
                    let time = formatTime(data.createdAt);
                    return(
                    <Link to={`/post/${data._id}`} key={data._id}> 
                    <Post
                    postId={data._id}
                    userid={data.username}
                    userImg={data.user_image}
                    userName={data.name}
                    text={data.text}
                    postImg={data.post_image}
                    comments={data.comments.length}
                    likes={data.likes}
                    time={time}
                    />
                    </Link>
                    )
                }) :
                <div className="content_loading">
            <LoadingIcon className="content_loading_animation" />
            </div>
            }
            </div> </>:<div className="content_loading">
            <LoadingIcon className="content_loading_animation" />
            </div> }
        </div>
    )
}

export default Home
