import  { ReactComponent as BackIcon } from '../icons/back_icon.svg';
import { useHistory } from 'react-router';

function Bookmarks() {
    let history = useHistory();

    return (

        <div className="another_container">
             <div className="main_header">
                <BackIcon onClick={()=>history.goBack()} className="main_header_back" />
                <div>
                <h4>Bookmarks</h4>
                </div>
            </div>
            <p className="not_have">You haven’t added any Tweets to your Bookmarks yet. When you do, they’ll show up here.</p>
        </div>
    )
}

export default Bookmarks
