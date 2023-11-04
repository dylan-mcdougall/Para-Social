import React from 'react';
import { useSelector } from 'react-redux';
import UpdateCommunityModal from '../UpdateCommunityModal';
import DeleteCommunityModal from '../DeleteCommunityModal';
import OpenModalButton from '../OpenModalButton';
import { FaPenSquare } from 'react-icons/fa';


function CommunitySettingsMenu({ community, setPromptRender }) {
    const sessionUser = useSelector(state => state.session.user);

    let validatedPermissions;
    if (community.creator_id === sessionUser.id) {
        validatedPermissions = (
            <>
                <OpenModalButton
                    buttonText={<FaPenSquare />}
                    modalComponent={() => <UpdateCommunityModal community={community} setPromptRender={setPromptRender} />} />
                <OpenModalButton
                    buttonText={'X'}
                    modalComponent={() => <DeleteCommunityModal community={community} setPromptRender={setPromptRender} />} />
            </>
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
