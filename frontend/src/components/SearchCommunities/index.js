import React, { useState } from 'react';
import { csrfFetch } from '../../store/csrf';
import { FaSearch } from 'react-icons/fa';
import "./SearchCommunities.css";

function SearchCommunities({ setResults, setFetchComplete, results, setSearchState }) {
    const [query, setQuery] = useState('');

    const fetchData = async (value) => {
        const properForm = {
            "query": value,
            "page": 0,
            "size": 4,
        }
        const response = await csrfFetch('/api/communities/search', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(properForm)
        });
        if (response.ok) {
            const communities = await response.json()
            setFetchComplete(true)
            return communities
        } else {
            console.error(response)
            return null;
        }
    }

    const handleChange = (value) => {
        if (value) {
            if (!results || !results.length) {
                setSearchState('pending');
            }
            setQuery(value)
            return fetchData(value)
        } else {
            setSearchState('inactive');
            setQuery(value)
            setFetchComplete(false)
            setResults([])
            return Promise.resolve()
        }
    }

    return (
        <div className='search-wrapper'>
            <div className='input-wrapper'>
                <input id='search-input' type='search' value={query} placeholder='Explore communities...'
                    onChange={(e) => handleChange(e.target.value)
                        .then((data) => {
                            console.log(data)
                            setResults(data)
                        })} />
                <FaSearch id="search-icon" />
            </div>
        </div>
    )
}

export default SearchCommunities;
