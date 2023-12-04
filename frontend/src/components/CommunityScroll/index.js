import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateCommunityModal from '../CreateCommunityModal';
import OpenModalButton from '../OpenModalButton';
import './CommunityScroll.css'
import { removeRoom } from '../../store/rooms';
import OpenMenuButton from '../OpenMenuButton';
import CommunitySettingsMenu from '../CommunitySettingsMenu';
import { GoPlus } from 'react-icons/go';
import ProfileButton from '../Navigation/ProfileButton';
import { FaPeopleGroup } from "react-icons/fa6";
import { FaEllipsisH } from "react-icons/fa";


function CommunityScrollBar({ isLoaded, dataLoaded, setPromptRender, displayCommunity, setDisplayCommunity }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [selected, setSelected] = useState(sessionUser?.Communities[0]?.id);

    const handleClick = async (communityId) => {
        if (displayCommunity !== communityId) {
            dispatch(removeRoom())
            setDisplayCommunity(communityId)
            setSelected(communityId)
        } else {
            setDisplayCommunity(communityId)
            return setSelected(communityId)
        }
    }
    
    return (
        <div className='community-bar-wrapper'>
            <ul className='community-bar-ul'>
            {dataLoaded && (
                    sessionUser?.Communities?.map((community) => {
                        let communityClass;
                        communityClass = 'community-item' + (selected === community.id ? ' selected' : '');
                        return (
                            <div className='community-item-wrapper' key={community.id}>
                                <li className={communityClass}>
                                    <div className='item-content' onClick={() => handleClick(community.id)}>
                                        {community?.CommunityImage?.url ? (<img className='image-item' src={community.CommunityImage.url} />)
                                            : <FaPeopleGroup style={{ backgroundColor: "lightblue", color: "black" }} className='image-item' />}
                                        <span className='community-tooltip'>
                                            {community.name}
                                        </span>
                                    </div>
                                    <div className='community-actions'>
                                        <OpenMenuButton
                                            buttonIcon={<FaEllipsisH style={{ color: 'white' }} />}
                                            menuComponent={() => <CommunitySettingsMenu displayCommunity={displayCommunity} setDisplayCommunity={setDisplayCommunity} community={community} setPromptRender={setPromptRender} />} />
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
                        modalComponent={() => <CreateCommunityModal setDisplayCommunity={setDisplayCommunity} setPromptRender={setPromptRender} />} />
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
