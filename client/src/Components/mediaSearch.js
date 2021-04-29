import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core';
import SearchModal from './searchModal';

function MediaSearch(props) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = e => {
        props.handleChange(e);
    }

    return (
        <div className="media-search-bar">
            <input className="media-search-input" placeholder="Search" onChange={e => props.handleChange(e)}/>
            <SearchModal searchQuery={props.searchQuery} selectVideo={props.selectVideo}/>
            {/* <Button onClick={() => props.handleClick()} className="media-search-button"><SearchIcon /></Button> */}
        </div>
            
    );
  }
  
  export default MediaSearch;
  