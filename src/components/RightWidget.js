import '../styles/right-widget.css'
import user5 from '../images/user5.jpg';
import user9 from '../images/user9.jpg';
import Search from './Search';

function RightWidget({hideSearch}) {
    return (
        <div className="right-widget">
            <div className="right_widget_search">
            { !hideSearch? <Search /> : "" }
            </div>
            <div className="whats_happening">
            <h2>What's Happening</h2>
            <div className="news">
                <div>
                    <span>IPL 2021</span>
                    <h5>RRvMI: A battle for the playoffs as Rajasthan Royals take on Mumbai Indians at Sharjah</h5>
                    <span>Trending with #RRvsMI</span>
                </div>
                <img src={user5} alt="" />
            </div>
            <div className="news">
                <div>
                    <span>IPL 2021</span>
                    <h5>Here's what exactly caused the six-hour Facebook outage last night</h5>
                    <span>Trending with #Facebook</span>
                </div>
                <img src={user9} alt="" />
            </div>
            </div>
        </div>
    )
}

export default RightWidget
