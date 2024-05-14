import { useNavigate } from 'react-router-dom';
import videoHomepage from '../../assets/video/video-homepage.mp4'
import { useSelector } from 'react-redux';
const HomePage = (props) => {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    const navigate = useNavigate();


    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source
                    src={videoHomepage}
                    type='video/mp4'
                />
            </video>
            <div className='homepage-content'>
                <div className='title'>There's a better way to ask</div>
                <div className='desc'>You don't want to make a boring form. And your audience won't answer one. Create a typeform instead-and make everyone happy.</div>
                <div>
                    {!isAuthenticated ?
                        <button className='my-btn'
                            onClick={() => navigate('/login')}
                        >Get started - it's free</button>
                        :
                        <button
                            className='my-btn'
                            onClick={() => navigate('/users')}
                        >
                            Doing Quiz Now!
                        </button>
                    }

                </div>
            </div>
        </div>
    )
}

export default HomePage;