import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPeopleGroup } from "react-icons/fa6";
import { csrfFetch } from '../../store/csrf';
import { joinCommunity } from '../../store/community';
import { useModal } from '../../context/Modal/Modal';
import "./ExploreCommunities.css";

function ExploreCommunities({ results }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const sessionUser = useSelector(state => state.session.user);

    const handleClick = async (e, id) => {
        e.stopPropagation();
        try {
            await dispatch(joinCommunity(sessionUser.id, id))
            closeModal();
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='explore-wrapper'>
            <ul className='community-list-ul'>
                {results && results.length ? (
                    results?.map((community) => {
                        return (
                            <li key={community.id} className='community-list-item'>
                                <div className='explore-community-item'>
                                    <div className='explore-community-header'>
                                        {community?.CommunityImage?.url ? <img className='image-item explore-community' src={community?.CommunityImage?.url} alt='Thumbnail' /> : <FaPeopleGroup style={{ backgroundColor: "lightblue", color: "black" }} className='image-item' />}
                                        <h4 className='explore-community-h4'>{community?.name}</h4>
                                    </div>
                                    <div className='explore-community-details'>
                                        <div className='explore-community-description'>
                                            {community?.description}
                                        </div>
                                        <div className='explore-community-bottom'>
                                            Community Members: {community?.Members?.length}
                                            <button onClick={(e) => handleClick(e, community.id)} className='join-community'>
                                                Join
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                ) : (
                    <>
                        <p>Loading Communities...</p>
                    </>
                )}
            </ul>
        </div>
    )
}

export default ExploreCommunities;
