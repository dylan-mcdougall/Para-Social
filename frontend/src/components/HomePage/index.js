import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();

    if (!sessionUser) {
        history.push('/');
        return null
    }

    return (
        <>
        </>
    )
}
