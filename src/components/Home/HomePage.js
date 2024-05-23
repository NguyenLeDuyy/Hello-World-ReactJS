import { useNavigate } from 'react-router-dom';
import videoHomepage from '../../assets/video/video-homepage.mp4'
import { useSelector } from 'react-redux';
import { useTranslation, Trans } from 'react-i18next';
const HomePage = (props) => {
    const { t } = useTranslation();

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
                <div className='title'>
                    {t('homepage.title1')}
                </div>
                <div className='desc'>
                    {t('homepage.title2')}
                </div>
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