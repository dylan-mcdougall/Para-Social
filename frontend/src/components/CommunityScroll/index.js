import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateCommunityModal from '../CreateCommunityModal';
import OpenModalButton from '../OpenModalButton';
import './CommunityScroll.css'
import { removeRoom } from '../../store/rooms';
import OpenMenuButton from '../OpenMenuButton';
import CommunitySettingsMenu from '../CommunitySettingsMenu';
import { FiSettings } from 'react-icons/fi';
import { GoPlus } from 'react-icons/go';
import ProfileButton from '../Navigation/ProfileButton';

function CommunityScrollBar({ isLoaded, dataLoaded, setPromptRender, displayCommunity, setDisplayCommunity }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const handleClick = async (communityId) => {
        if (displayCommunity !== communityId) {
            dispatch(removeRoom())
            setDisplayCommunity(communityId)
        } else return setDisplayCommunity(communityId)
    }
    
    return (
        <div className='community-bar-wrapper'>
            <ul className='community-bar-ul'>
            {dataLoaded && (
                    sessionUser?.Communities?.map((community) => {
                        return (
                            <div className='community-item-wrapper'>
                                <li className='community-item' onClick={() => handleClick(community.id)} key={community.id}>
                                    <div className='item-content'>
                                        <p className='community-name'>{community?.name}</p>
                                        <OpenMenuButton
                                        buttonIcon={<FiSettings />}
                                        menuComponent={() => <CommunitySettingsMenu community={community} setPromptRender={setPromptRender} />} />
                                    </div>
                                </li>
                            </div>
                        )
                    })
                )}
            </ul>
            <div className='navigation'>
                <div className='new-community-button'>
                    <OpenModalButton
                        buttonText={<GoPlus />}
                        modalComponent={() => <CreateCommunityModal setPromptRender={setPromptRender} />} />
                </div>
                {sessionUser ? (
                    <div className='profile-button'>
                        <ProfileButton user={sessionUser} />
                    </div>
                ) : <div className='loading'>
                    Loading
                </div>}
            </div>
        </div>
    )
}

export default CommunityScrollBar;
