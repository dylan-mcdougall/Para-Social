import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './LandingPage.css';
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage';

function LandingPage() {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    
    
    const [login, setLogin] = useState(true);

    useEffect(() => {

    }, [setLogin]);

    let landingRight;
    if (login) {
        landingRight = <LoginFormPage login={login} setLogin={setLogin} />
    } else {
        landingRight = <SignupFormPage login={login} setLogin={setLogin} />
    }

    // if (sessionUser) {
    //     history.push('/home');
    //     return null
    // }
    
    return (
        <div className='landing-page-wrapper'>
            <div className='landing-page-left'>
                <img className='landing-left-image' src='https://aaprojectbucket.s3.us-west-1.amazonaws.com/influencers.jpg' alt='Demographic Image' />
            </div>
            <div className='landing-page-right'>
                <div className='landing-right-flex'>
                    {landingRight}
                </div>
            </div>
        </div>
    )
}

export default LandingPage;
