import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../service/apiServices';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import Language from './Language';
import { FaReact } from "react-icons/fa";
import { BsSuitHeartFill } from "react-icons/bs";
import { useState } from 'react';
import Profile from './Profile';

const Header = () => {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const account = useSelector(state => state.user.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isShowModalProfile, setIsShowModalProfile] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(account);

    const handleLogin = () => {
        navigate("/login");
    }

    const handleLogout = async () => {
        let res = await logout(account.email, account.refresh_token);
        console.log("check res login : ", res)
        if (res && res.EC === 0) {
            //clear data redux
            dispatch(doLogout());
            //navigate
            navigate('/login');
        }
        else {
            toast.error(res.EM);
        }
        // console.log("check res: ", res)
    }

    const handleShowProfile = () => {
        setIsShowModalProfile(true);
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <FaReact size={'2em'} color={'00bfff'} className='loader-icon' />
                    <NavLink to='/' className='navbar-brand'>Group 10</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to='/' className='nav-link'>Home</NavLink>
                            <NavLink to='/users' className='nav-link'>User</NavLink>
                            <NavLink to='/admins' className='nav-link'>Admin</NavLink>
                            {/* <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/users">Users</Nav.Link>
                        <Nav.Link href="/admins">Admin</Nav.Link> */}

                        </Nav>
                        <Nav>
                            {!isAuthenticated ?
                                <>
                                    <button className='btn-login' onClick={() => handleLogin()}>Login</button>
                                    <button className='btn-signup' onClick={() => { navigate('/signup') }}>Sign up</button>
                                </>
                                :
                                <NavDropdown title="Settings" id="basic-nav-dropdown">
                                    <NavDropdown.Item
                                        onClick={() => {
                                            handleShowProfile()
                                        }}
                                    >Profile</NavDropdown.Item>
                                    <NavDropdown.Item
                                        onClick={() => {
                                            // handleLogout()
                                            localStorage.clear();
                                            window.location.reload();
                                        }}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            }
                            <Language />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Profile
                show={isShowModalProfile}
                setShow={setIsShowModalProfile}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
        </>
    );
}

export default Header;