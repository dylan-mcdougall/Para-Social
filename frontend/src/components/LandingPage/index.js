import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { landingArray, landingText1, landingText2 } from './data';
import './LandingPage.css';
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage';
import Footer from '../Footer';
import OpenMenuButton from '../OpenMenuButton';
import { RxHamburgerMenu } from 'react-icons/rx';
import HamburgerMenu from './HamburgerMenu';

function LandingPage({ login, setLogin }) {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [indexAndUrl, setIndexAndUrl] = useState({ index: 0, url: landingArray[0], emphasis1: landingText1[0], emphasis2: landingText2[0] });

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndexAndUrl(prev => {
                const newIndex = (prev.index + 1) % landingArray.length;
                return { index: newIndex, url: landingArray[newIndex], emphasis1: landingText1[newIndex], emphasis2: landingText2[newIndex] };
            });
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    const { url, emphasis1, emphasis2 } = indexAndUrl;


    let landingRight;
    if (login) {
        landingRight = <LoginFormPage login={login} setLogin={setLogin} />
    } else {
        landingRight = <SignupFormPage login={login} setLogin={setLogin} />
    }

    if (sessionUser) {
        return <Redirect to='/home' />
    }

    const redirect = () => {
        history.push('/signup-mobile')
    }

    const handleRedirection = () => {
        redirect()
    }
    
    return (
        <>
            <div className='landing-page-wrapper desktop'>
                <div className='landing-page-left desktop'>
                    <div className='landing-left-header desktop'>
                        <img className='landing-left-logo desktop' src='https://aaprojectbucket.s3.us-west-1.amazonaws.com/FullLogo_Transparent_NoBuffer_resized.png' alt='Logo' />
                        <img className='landing-left-title desktop' src='https://aaprojectbucket.s3.us-west-1.amazonaws.com/FullLogo_Title.png' alt='Title' />
                    </div>
                    <div className='landing-left-flavor desktop'>
                        <img className='landing-left-image desktop' src={url} alt='Demographic Image' />
                        <div className='landing-left-flavor-text desktop'>
                            <div className='upper desktop'>
                                <h2 className='landing-text desktop'>Build your</h2>
                                <h2 className='emphasis desktop'> {emphasis1},</h2>
                            </div>
                            <div className='lower desktop'>
                                <h2 className='landing-text desktop'>Interact with your favorite </h2>
                                <h2 className='emphasis desktop'> {emphasis2}.</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='landing-page-right desktop'>
                    <div className='landing-right-flex desktop'>
                        {landingRight}
                    </div>
                </div>
            </div>
            <div className='landing-page-wrapper mobile'>
                <div className='landing-page-heading mobile'>
                    <div className='landing-logo-title mobile'>
                        <img className='landing-left-logo mobile' src='https://aaprojectbucket.s3.us-west-1.amazonaws.com/FullLogo_Transparent_NoBuffer_resized.png' alt='Logo' />
                        <img className='landing-left-title mobile' src='https://aaprojectbucket.s3.us-west-1.amazonaws.com/FullLogo_Title.png' alt='Title' />
                    </div>
                    <OpenMenuButton
                        buttonIcon={<RxHamburgerMenu style={{ backgroundColor: "black", color: '#dcdbcb'}} /> }
                        flipDirection={true}
                        menuComponent={() => <HamburgerMenu />} />
                </div>
                <div className='landing-content mobile'>
                    <img className='landing-image mobile' src={url} alt='Demographic Image' />
                    <div className='landing-flavor-text mobile'>
                        <div className='upper mobile'>
                            <h2 className='landing-text mobile'>Build your</h2>
                            <h2 className='emphasis mobile'> {emphasis1},</h2>
                        </div>
                        <div className='lower mobile'>
                            <h2 className='landing-text mobile'>Interact with your favorite </h2>
                            <h2 className='emphasis mobile'> {emphasis2}.</h2>
                        </div>
                    </div>
                </div>
                <div className='signup-button mobile'>
                    <button className='signup mobile' onClick={handleRedirection} >Sign Up</button>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default LandingPage;
