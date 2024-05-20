import { useState } from 'react';
import './Signup.scss';
import { useNavigate } from 'react-router-dom';
import { postSignup } from '../../service/apiServices';
import { toast } from 'react-toastify';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Language from '../Header/Language';


const Signup = (props) => {

    const [isShowPassword, setIsShowPassword] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const navigate = useNavigate();
    const handleClickHomePage = () => {
        navigate("/");
    }

    const handleSignup = async () => {
        //validate
        const isValidEmail = validateEmail(email);
        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };

        if (!isValidEmail) {
            toast.error('Invalid email')
            return;
        }

        if (!password) {
            toast.error('Invalid password')
            return;
        }

        //submit apis
        let data = await postSignup(email, password, username);
        console.log('>>>>check data: ', data)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            navigate("/login")
        }
        else if (data && +data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    return (
        <div className="signup-container">
            <div className='header'>
                <span>Already have an account?</span>
                <button
                    onClick={() => navigate('/login')}
                >
                    Login</button>
                <Language />

            </div>
            <div className='title col-4 mx-auto'>
                Group Ten
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello, who's this?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Username</label>
                    <input
                        type={"email"}
                        className='form-control'
                        value={username}
                        placeholder="Username"
                        onChange={(event) => { setUsername(event.target.value) }}
                    ></input>
                </div>
                <div className='form-group'>
                    <label>Email (*)</label>
                    <input
                        type={"email"}
                        className='form-control'
                        value={email}
                        placeholder="Email"
                        onChange={(event) => { setEmail(event.target.value) }}
                    />
                </div>
                <div className='form-group pass-group'>
                    <label>Password (*)</label>
                    <input
                        type={isShowPassword ? "text" : "password"}
                        className='form-control'
                        value={password}
                        placeholder="Password"
                        onChange={(event) => { setPassword(event.target.value) }}
                    />
                    {isShowPassword ?
                        <span className='icons-eye'
                            onClick={() => {
                                setIsShowPassword(!isShowPassword)

                            }}>
                            <VscEye />
                        </span>
                        :
                        <span className='icons-eye'
                            onClick={() => {
                                setIsShowPassword(!isShowPassword)
                            }}>
                            <VscEyeClosed />
                        </span>
                    }


                </div>
                <span className='forgot-password'>Forgot password ?</span>
                <div>
                    <button
                        className='btn-submit'
                        onClick={() => handleSignup()}
                    >Create my free account</button>
                </div>
                <div className='text-center'>
                    <span
                        className='back'
                        onClick={() => handleClickHomePage()}>&#60;&#60;Go to Homepage</span>
                </div>
            </div>
        </div>
    )
}

export default Signup;