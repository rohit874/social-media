import  { ReactComponent as BackIcon } from '../icons/back_icon.svg';
import { useHistory } from 'react-router';

function Lists() {
    let history = useHistory();
    return (
        <div className="another_container">
             <div className="main_header">
                <BackIcon onClick={()=>history.goBack()} className="main_header_back" />
                <div>
                <h4>Lists</h4>
                </div>
            </div>
            <p className="not_have">You haven't created or followed any Lists. When you do, they'll show up here.</p>
        </div>
    )
}

export default Lists
