import { useEffect } from 'react';
import Search from './Search';
function Explore(props) {
    //Handling right widget search input
    useEffect(()=>{
        props.setHideSearch(true);
    },[props])
    
    useEffect(()=>()=>{
        props.updateHideSearch();
    },[props])

    return (
        <div className="another_container">
             <div className="search_header">
                <div>
                <Search />
                </div>
            </div>

            <div className="trending">
                <span>Trending in Entertainment</span>
                <h4>#BBKiVine</h4>
                <span>20k tweet</span>
            </div>
            <div className="trending">
                <span>Trending in Entertainment</span>
                <h4>#AnushkaSharma</h4>
                <span>20k tweet</span>
            </div>
            <div className="trending">
                <span>Trending in Politics</span>
                <h4>#YogiAdityaNath</h4>
                <span>20k tweet</span>
            </div>
            <div className="trending">
                <span>Trending in Cricket</span>
                <h4>#MIvsRR</h4>
                <span>20k tweet</span>
            </div>
            <div className="trending">
                <span>Trending in Music</span>
                <h4>#Tseries</h4>
                <span>20k tweet</span>
            </div>
            <div className="trending">
                <span>Trending</span>
                <h4>#IndianArmy</h4>
                <span>20k tweet</span>
            </div>
        </div>
    )
}

export default Explore
