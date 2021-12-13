import { useEffect, useState } from 'react';
import Search from './Search';
import { LoadingIcon } from '../icons';
import axios from 'axios';
function Explore(props) {
    const [articles, setArticles] = useState([]);
    //Handling right widget search input
    useEffect(()=>{
        props.setHideSearch(true);
    },[props])
    
    useEffect(()=>()=>{
        props.updateHideSearch();
    },[props])

    useEffect(()=>{
        axios.get('https://saurav.tech/NewsAPI/top-headlines/category/entertainment/in.json')
        .then(response => setArticles(response.data.articles));
    },[])

    


    return (
        <div className="another_container">
             <div className="search_header">
                <div>
                <Search />
                </div>
            </div>

            {/* <div className="trending">
                <span>Trending in Music</span>
                <h4>#Tseries</h4>
                <span>20k tweet</span>
            </div> */}
            <div className="whats_happening">
            <h2>Trending in Entertainment</h2>
            {
            articles.length?
            articles.map((data,i)=>{
                if(i < 4){
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
            {/* <a href="https://www.thehindu.com/sport/cricket/ipl-2021-it-is-crunch-time-for-mumbai-indians-and-rajasthan-royals/article36830666.ece" className="news">
                <div>
                    <span>IPL 2021</span>
                    <h5>IPL 2021 | It is crunch time for Mumbai Indians and Rajasthan Royals</h5>
                    <span>Trending with #RRvsMI</span>
                </div>
                <img src={news1} alt="" />
            </a>
            <a href="https://www.hindustantimes.com/cricket/hardik-you-deserve-6-7-crore-now-pandya-recalls-interaction-with-couple-of-cricketers-in-2nd-year-of-ipl-101637036739074.html" className="news">
                <div>
                    <span>IPL 2021</span>
                    <h5>'Hardik, you deserve 6-7 crore now': Pandya recalls interaction with couple of cricketers in 2nd year of IPL</h5>
                    <span>Trending with #RRvsMI</span>
                </div>
                <img src={news2} alt="" />
            </a> */}
            </div>
        </div>
    )
}

export default Explore
