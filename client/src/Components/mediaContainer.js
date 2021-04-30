import React, { useState, useEffect } from 'react';
import MediaSearch from './mediaSearch';
import YouTube2 from 'react-youtube';
import socket from '../socket';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

var player;

function MediaContainer() {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentVideoId, setCurrentVideoId] = useState('');

    const handleChange = e => {
        setSearchQuery(e.target.value);
    }

    const selectVideo = (videoId, title) => {
        const media = {id: videoId, title: title};
        socket.emit('newMedia', media);
    }

    const handlePlayerChange = e => {
        // 1 = Play
        // 2 = Pause
        if (e.data == 1) {
            socket.emit('playMedia');
        } 
        else if (e.data == 2) {
            socket.emit('pauseMedia');
        }
        else if (e.data == 0) {
            socket.emit('mediaEnd');
        }
    }

    const opts = {
        width: '100% !important',
        height: '100% !important',
        playerVars: {
          autoplay: 1,
          /* controls: 0, */
          disablekb: 0,
          enablejsapi: 1,
          modestbranding: 1,
        },
      };

      const _onReady = (event) => {
        player = event.target;
      }

      useEffect(() => {
        socket.on('newMedia', newMedia => {
            setCurrentVideoId(newMedia);
        })
        socket.on('playMedia', () => {
            player.playVideo();
        })
        socket.on('pauseMedia', () => {
            player.pauseVideo();
        })
      }, []);
      

  return (
        <div className="media-container">
            <div className="media-nav">
                <MediaSearch searchQuery={searchQuery} handleChange={handleChange} selectVideo={selectVideo}/>
            </div>
            <div className="media-display">
                {(currentVideoId.length == 0 
                ? <div style={{color:'#909090'}}><ArrowUpwardIcon style={{fontSize:'15em'}}/><h2>Hey, nothing is playing! Hurry up and play something!</h2></div>
                :<YouTube2
                opts={opts}
                videoId={currentVideoId}
                onStateChange={e => handlePlayerChange(e)}
                onReady={_onReady}
                />
                )}
            </div>
        </div>
  );
}

export default MediaContainer;
