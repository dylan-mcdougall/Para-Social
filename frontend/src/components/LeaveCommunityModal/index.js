import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal/Modal';
import { deleteMembership, loadCommunity } from '../../store/community';

function LeaveCommunityModal({ displayCommunity, setDisplayCommunity, setPromptRender, community }) {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {
        setPromptRender(true);
        dispatch(deleteMembership(sessionUser.id, community.id));
        if (displayCommunity === community.id) {
            setDisplayCommunity(sessionUser.Communities[0].id)
            dispatch(loadCommunity(sessionUser.Communities[0].id))
            closeModal();
        } else {
            setDisplayCommunity(displayCommunity)
            dispatch(loadCommunity(displayCommunity))
            closeModal();
        }
    }

    return (
        <div className='delete-modal'>
            <h3>
                Are you sure you want to leave this community?
            </h3>
            <div className='delete-buttons'>
                <button className='yes' onClick={() => handleDelete()}>Leave Community</button>
                <button className='no' onClick={() => closeModal()}>No</button>
            </div>
        </div>
    )
}

export default LeaveCommunityModal;
