import React, { useState, useEffect } from 'react';
import { useModal } from '../../context/Modal/Modal';
import { csrfFetch } from '../../store/csrf';
import ExploreCommunities from '../ExploreCommunities';
import SearchCommunities from '../SearchCommunities';
import ExploreCommunitiesSkeleton from '../Skeletons/ExploreCommunitiesSkeleton';
import ExploreNotFound from '../404NotFounds/ExploreCommunities404';

function ExploreCommunitiesModal() {
    const { closeModal } = useModal();
    const [results, setResults] = useState([]);
    const [defaultResults, setDefaultResults] = useState([])
    const [searchState, setSearchState] = useState('inactive');
    const [fetchComplete, setFetchComplete] = useState(false);

    useEffect(() => {
        if (results && results.length) {
            setSearchState('active');
        } else if (results && !results.length && fetchComplete) {
            setSearchState('failed');
        }
    }, [fetchComplete, results]);

    useEffect(() => {
        const topCommunities = async () => {
            const response = await csrfFetch(`/api/communities`);
            if (response.ok) {
                const data = await response.json();
                setDefaultResults(data)
            } else {
                console.error("Error while fetching all community data: ", response)
            }
        }

        if (searchState === 'inactive') {
            topCommunities();
        }

        return () => {
            setDefaultResults([])
            setFetchComplete(false)
        }
    }, [searchState])

    const handleState = () => {
        switch(searchState) {
            case 'active':
                return <ExploreCommunities searchState={searchState} results={results} />
            case 'failed':
                return <ExploreNotFound />
            case 'pending':
                return <ExploreCommunitiesSkeleton />
            default:
                return <ExploreCommunities searchState={searchState} results={defaultResults} />
        }
    };

    return (
        <div className='modal-wrapper search'>
            <SearchCommunities setResults={setResults} setFetchComplete={setFetchComplete} results={results} setSearchState={setSearchState} />
            {handleState()}
        </div>
    )
}

export default ExploreCommunitiesModal;
