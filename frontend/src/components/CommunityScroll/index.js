import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateCommunityModal from '../CreateCommunityModal';
import OpenModalButton from '../OpenModalButton';
import './CommunityScroll.css'
import UpdateCommunityModal from '../UpdateCommunityModal';
import { FaPenSquare } from 'react-icons/fa';
import DeleteCommunityModal from '../DeleteCommunityModal';
import Navigation from '../Navigation';
import { removeRoom } from '../../store/rooms';

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
                <h3>
                    Communities
                </h3>
            {dataLoaded && (
                    sessionUser?.Communities?.map((community) => {
                        let validatedPermissions = null;
                        if (sessionUser.id === community.creator_id) {
                            validatedPermissions = (
                                <div className='community-actions'>
                                    <OpenModalButton
                                        buttonText={<FaPenSquare />}
                                        modalComponent={() => <UpdateCommunityModal community={community} setPromptRender={setPromptRender} />} />
                                    <OpenModalButton
                                        buttonText={'X'}
                                        modalComponent={() => <DeleteCommunityModal community={community} setPromptRender={setPromptRender} />} />
                                </div>
                            )
                        }
                        return (
                            <div className='community-item-wrapper'>
                                <li className='community-item' onClick={() => handleClick(community.id)} key={community.id}>
                                    {community.name}
                                    {validatedPermissions}
                                </li>
                            </div>
                        )
                    })
                )}
            </ul>
            <div className='new-community-button'>
                <OpenModalButton
                    buttonText={'+ Add a Community'}
                    modalComponent={() => <CreateCommunityModal setPromptRender={setPromptRender} />} />
            </div>
        </div>
    )
}

export default CommunityScrollBar;
