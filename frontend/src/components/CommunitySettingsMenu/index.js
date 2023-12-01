import React from 'react';
import { useSelector } from 'react-redux';
import UpdateCommunityModal from '../UpdateCommunityModal';
import DeleteCommunityModal from '../DeleteCommunityModal';
import OpenModalButton from '../OpenModalButton';


function CommunitySettingsMenu({ community, setPromptRender }) {
    const sessionUser = useSelector(state => state.session.user);

    let validatedPermissions;
    if (community.creator_id === sessionUser.id) {
        validatedPermissions = (
            <div className='menu-shell'>
                <div className='menu-item'>
                    <OpenModalButton
                        buttonText={'Update Community'}
                        modalComponent={() => <UpdateCommunityModal community={community} setPromptRender={setPromptRender} />} />
                </div>
                <div className='menu-item'>
                    <OpenModalButton
                        buttonText={'Delete Community'}
                        modalComponent={() => <DeleteCommunityModal community={community} setPromptRender={setPromptRender} />} />
                </div>
                <div className='menu-upload'>
                    
                </div>
            </div>
        )
    } else {
        validatedPermissions = (
            <>
                {null}
            </>
        )
    }

    return (
        <div className='modal-shell'>
            {validatedPermissions}
        </div>
    )
}

export default CommunitySettingsMenu;
