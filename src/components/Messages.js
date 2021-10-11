import  { ReactComponent as BackIcon } from '../icons/back_icon.svg';
import { useHistory } from 'react-router';

function Messages() {
    let history = useHistory();

    return (
        <div className="main_container">
             <div className="main_header">
                <BackIcon onClick={()=>history.goBack()} className="main_header_back" />
                <div>
                <h4>Messages</h4>
                </div>
            </div>
            <p className="not_have">You haven't created any conversation or chat with anyone. When you do, they'll show up here.</p>
        </div>
    )
}

export default Messages
