import React from 'react';
import { useSelector } from 'react-redux';
import UpdateCommunityModal from '../UpdateCommunityModal';
import DeleteCommunityModal from '../DeleteCommunityModal';
import LeaveCommunityModal from '../LeaveCommunityModal';
import ImageUpload from '../ImageUpload';
import OpenModalButton from '../OpenModalButton';
import { useMenu } from '../../context/ContextMenu/ContextMenu';

function CommunitySettingsMenu({ community, setPromptRender }) {
    const sessionUser = useSelector(state => state.session.user);
    const { closeMenu } = useMenu();

    let validatedPermissions;
    if (community.creator_id === sessionUser.id) {
        validatedPermissions = (
            <div className='menu-shell'>
                <div className='menu-item'>
                    <OpenModalButton
                        buttonText={'Update Community'}
                        onButtonClick={closeMenu}
                        propagateClick={true}
                        modalComponent={() => <UpdateCommunityModal community={community} setPromptRender={setPromptRender} />} />
                </div>
                <div className='menu-item'>
                    <OpenModalButton
                        buttonText={'Upload Image'}
                        onButtonClick={closeMenu}
                        propagateClick={true}
                        modalComponent={() => <ImageUpload community={community} setPromptRender={setPromptRender} /> } />
                </div>
                <div className='menu-item delete-community'>
                    <OpenModalButton
                        buttonText={'Delete Community'}
                        onButtonClick={closeMenu}
                        propagateClick={true}
                        modalComponent={() => <DeleteCommunityModal community={community} setPromptRender={setPromptRender} />} />
                </div>
            </div>
        )
    } else {
        validatedPermissions = (
            <div className='menu-shell'>
                <div className='menu-item'>
                    <OpenModalButton
                        buttonText={'Leave Community'}
                        onButtonClick={closeMenu}
                        propagateClick={true}
                        modalComponent={() => <LeaveCommunityModal community={community} setPromptRender={setPromptRender} />} />
                </div>
            </div>
        )
    }

    return (
        <div className='modal-shell'>
            {validatedPermissions}
        </div>
    )
}

export default CommunitySettingsMenu;
