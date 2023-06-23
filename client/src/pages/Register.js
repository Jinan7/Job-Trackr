import {useState, useEffect} from 'react'
import {Logo, FormRow, Alert} from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext'
import {useNavigate}  from 'react-router-dom'

const initialState = {
    name: '',
    email: '',
    password:'',
    isMember: true,
    showAlert: true,
}

const Register = () => {
    const [values, setValues] = useState(initialState);
    const navigate = useNavigate()
    const {user, isLoading, showAlert, displayAlert, registerUser, loginUser, setupUser} = useAppContext()
    const toggleMember = () => {
        setValues({...values, isMember:!values.isMember})
    }
    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const {name, email, password, isMember} = values
        if(!email || !password || (!isMember && !name)){
            displayAlert()
            return
        }
        const currentUser = {name,email, password}
        if(isMember){
            setupUser({currentUser,endPoint:'login',alertText:'Login successful, redirecting...'})
            console.log('already a member')
        }else{
            setupUser({currentUser,endPoint:'register',alertText:'User created'})
            console.log('already a member')
        }
        console.log(values);
    }

    useEffect(()=>{
        if(user){
            setTimeout(()=>{
              navigate('/')  
            },3000)
            navigate('/')
        }
    }, [user, navigate])

    return (<Wrapper className='full-page'>
        <form className='form' onSubmit={onSubmit}>
            <Logo />
            <h3>{values.isMember ? "Login" : "Register"}</h3>
            {showAlert && <Alert/>}
            {!values.isMember && (<FormRow name='name' type='text' value={values.name} handleChange={handleChange}/>)}
            <FormRow name='email' type='email' value={values.email} handleChange={handleChange}/>
            <FormRow name='password' type='password' value={values.password} handleChange={handleChange}/>
            <button type='submit' className='btn btn-block' disabled={isLoading}>Submit</button>
            
            <p>{values.isMember ? 'Not a member yet?' : 'Already a member?'}<button type='button' className="member-btn" onClick={toggleMember}>{values.isMember ? 'Register' : 'Login'}</button></p>
        </form>
    </Wrapper>)
}

export default Register;