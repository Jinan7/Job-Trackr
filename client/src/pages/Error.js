import {Link} from 'react-router-dom'

import Wrapper from '../assets/wrappers/ErrorPage'
const Error = () =>{
    return(<Wrapper className='full-page'>
        <div>
            
            <h3>Not Found</h3>
            <p>Unable to find the requested page</p>
            <Link to='/'>Home</Link>
        </div>
    </Wrapper>);
}

export default Error;