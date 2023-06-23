import { useAppContext } from "../context/appContext"
const Alert = () =>{
    const {alertType, alertText} = useAppContext()
    return (<div className={`alert alert-${alert}`}> 
        {alertText}
    </div>)
}

export default Alert