import  { ReactComponent as BackIcon } from '../icons/back_icon.svg';
import { useHistory } from 'react-router';

function Notification() {
    let history = useHistory();
    return (
        <div className="main_container">
             <div className="main_header">
                <BackIcon onClick={()=>history.goBack()} className="main_header_back" />
                <div>
                <h4>Notification</h4>
                </div>
            </div>
            <p className="not_have">You didn't have any notification yet.</p>
        </div>
    )
}

export default Notification
