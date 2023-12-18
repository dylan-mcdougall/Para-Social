import React, { useState, useEffect } from 'react';
import { useModal } from '../../context/Modal/Modal';
import ExploreCommunities from '../ExploreCommunities';
import SearchCommunities from '../SearchCommunities';

function ExploreCommunitiesModal() {
    const { closeModal } = useModal();
    const [results, setResults] = useState([]);
    const [searchState, setSearchState] = useState('inactive');

    useEffect(() => {
        if (results && results.length) {
            setSearchState('active')
        } else if (results && !results.length) {
            setSearchState('failed')
        }
    }, [results])

    return (
        <div className='modal-wrapper'>
            <SearchCommunities setResults={setResults} setSearchState={setSearchState} />
            <ExploreCommunities results={results} searchState={searchState} />
        </div>
    )
}

export default ExploreCommunitiesModal;
