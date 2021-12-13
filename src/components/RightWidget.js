import '../styles/right-widget.css';
import { useEffect, useState } from 'react';
import { LoadingIcon } from '../icons';
import Search from './Search';
import axios from 'axios';
function RightWidget({hideSearch}) {
    const [articles, setArticles] = useState([]);
    useEffect(()=>{
        axios.get('https://saurav.tech/NewsAPI/top-headlines/category/entertainment/in.json')
        .then(response => setArticles(response.data.articles));
    },[])
    return (
        <div className="right-widget">
            <div className="right_widget_search">
            { !hideSearch? <Search /> : "" }
            </div>
            <div className="whats_happening">
            <h2>What's Happening</h2>
            {
            articles.length?
            articles.map((data,i)=>{
                if(i < 3){
                return(
                <a key={i} href={data.url} className="news">
                <div>
                    <h5>{data.title}</h5>
                    <span>Source : {data.source.name}</span>
                </div>
                <img src={data.urlToImage} alt="" />
                </a>
                )
                }
                else{return null;}
            })
            :
            <div className="content_loading">
            <LoadingIcon className="content_loading_animation" />
            </div>
            }
            </div>
        </div>
    )
}

export default RightWidget
