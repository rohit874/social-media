import { useEffect } from "react";
import { useHistory } from "react-router-dom";
const Protected = (props) =>{
    const history = useHistory();
    let Cmp = props.cmp;
    useEffect(() => {
        if (!localStorage.hasOwnProperty("authToken") && !props.isLogin) {
            history.push('/login');
        }
    })
    return(
        localStorage.hasOwnProperty("authToken") && Cmp       
    )
}

export default Protected;