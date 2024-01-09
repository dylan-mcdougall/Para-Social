import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LandingPage.css';
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage';
import Footer from '../Footer';
import OpenMenuButton from '../OpenMenuButton';
import { RxHamburgerMenu } from 'react-icons/rx';
import HamburgerMenu from './HamburgerMenu';

function LandingPage() {
    const sessionUser = useSelector(state => state.session.user);
    const [login, setLogin] = useState(true);

    useEffect(() => {

    }, [setLogin]);

    let landingRight;
    if (login) {
        landingRight = <LoginFormPage login={login} setLogin={setLogin} />
    } else {
        landingRight = <SignupFormPage login={login} setLogin={setLogin} />
    }

    if (sessionUser) {
        return <Redirect to='/home' />
    }
    
    return (
        <>
            <div className='landing-page-wrapper desktop'>
                <div className='landing-page-left desktop'>
                    <img className='landing-left-logo desktop' src='https://aaprojectbucket.s3.us-west-1.amazonaws.com/Para-Social-Logo.png' alt='Logo' />
                    {/* <img className='landing-left-image' src='https://aaprojectbucket.s3.us-west-1.amazonaws.com/influencers.jpg' alt='Demographic Image' /> */}
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
                        menuComponent={() => <HamburgerMenu />} />
                </div>
                
            </div>
            <Footer />
        </>
    )
}

export default LandingPage;
