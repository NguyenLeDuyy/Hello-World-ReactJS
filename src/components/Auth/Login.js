import { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../service/apiServices';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { TbFidgetSpinner } from "react-icons/tb";
import Language from '../Header/Language';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleClickHomePage = () => {
        navigate("/");
    }

    const handleLogin = async () => {
        //validate
        const isValidEmail = validateEmail(email);

        if (!isValidEmail) {
            toast.error('Invalid email')
            return;
        }

        if (!password) {
            toast.error('Invalid password')
            return;
        }
        setIsLoading(true);
        //submit apis
        let data = await postLogin(email, password);
        if (data && data.EC === 0) {
            dispatch(doLogin(data))
            toast.success(data.EM)
            setIsLoading(false)
            navigate("/")
        }
        else if (data && +data.EC !== 0) {
            toast.error(data.EM);
            setIsLoading(false);
        }
    }

    const handleKeyDown = (event) => {
        console.log("event key: ", event.key, event);
        if (event && event.key === 'Enter') {
            handleLogin();
        }
    }

    return (
        <div className="login-container">
            <div className='header'>
                <span>Don't have an account yet?</span>
                <button
                    onClick={() => { navigate('/signup') }}
                >Sign up</button>
                <Language />
            </div>
            <div className='title col-4 mx-auto'>
                Group 10
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello, who's this?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        type={"email"}
                        className='form-control'
                        value={email}
                        onChange={(event) => { setEmail(event.target.value) }}
                    ></input>
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input
                        type={"password"}
                        className='form-control'
                        value={password}
                        onChange={(event) => { setPassword(event.target.value) }}
                        onKeyDown={(event) => handleKeyDown(event)}
                    ></input>
                </div>
                <span className='forgot-password'>Forgot password ?</span>
                <div className='loader'>
                    <button
                        className='btn-submit'
                        onClick={() => { handleLogin() }}
                        disabled={isLoading}
                    >
                        {isLoading === true && <TbFidgetSpinner className='loader-icon' />}
                        <span> Login to Group 10</span>
                    </button>
                </div>
                <div className='text-center'>
                    <span
                        className='back'
                        onClick={() => handleClickHomePage()}>&#60;&#60;Go to Homepage</span>
                </div>
            </div>
        </div >
    )
}

export default Login;