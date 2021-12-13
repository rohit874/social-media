import { useHistory } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { userContext } from '../userContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { LoadingIcon, BackIcon, BookmarksIcon } from '../icons';
import moment from 'moment';
import { Post } from '../components';


function Bookmarks() {
    let history = useHistory();
    const { currentUser } = useContext(userContext);
    const [postData, setPostData] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(()=>{
        if(!currentUser?.bookmarks){
            return;
        }
        var config = {
            headers:{
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${window.localStorage.getItem('authToken')}`
          }};
        const loadBookmarks = () =>{
            axios.post("https://social-media-rk.herokuapp.com/getbookmarks",{bookmarksId:currentUser?.bookmarks}, config)
            .then(res => {
                setLoading(false);
                setPostData(res.data.res);
        })
        .catch(err => {
            if (err.response) {
                console.log(err.response.data.message);
            }
        })
        }
        loadBookmarks();
    },[currentUser?.bookmarks])

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
    function BookmarkHandler(id){
        if(!currentUser?.bookmarks){
            return;
        }
        currentUser.bookmarks = currentUser.bookmarks.filter((data)=>data!==id);
        let FilteredBookmarks = postData.filter((data)=>data._id!==id);
        setPostData(FilteredBookmarks);
        var config = {
            headers:{
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${window.localStorage.getItem('authToken')}`
          }};
      
          axios.post("https://social-media-rk.herokuapp.com/bookmarks",{bookmarksId:id, userid:currentUser._id}, config)
          .then(res => {
      })
      .catch(err => {
          if (err.response) {
              console.log(err.response.data.message);
          }
      })
    }
    
    return (

        <div className="another_container">
             <div className="main_header">
                <BackIcon onClick={()=>history.goBack()} className="main_header_back" />
                <div>
                <h4>Bookmarks</h4>
                </div>
            </div>
            <div className="posts">
            {
                postData.length?
                postData.map((data)=>{
                    let time = formatTime(data.createdAt);
                    return(
                    <div key={data._id} className="bookmarks">
                    <BookmarksIcon onClick={()=>BookmarkHandler(data._id)} className="post-icons" />
                    <Link to={`/post/${data._id}`}> 
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
                    </div>
                    )
                }) :
                loading ? <div className="content_loading">
            <LoadingIcon className="content_loading_animation" />
            </div> : <p className="not_have">You haven’t added any Post to your Bookmarks. When you do, they’ll show up here.</p>
            }
            </div>
            

        </div>
    )
}

export default Bookmarks
