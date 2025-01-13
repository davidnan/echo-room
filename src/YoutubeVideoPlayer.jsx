import React, { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';

const YouTubeAudioPlayer = ( {videoId, onPlayerEnd}) => {
  const playerRef = useRef(null);

  // YouTube Player options
  const playerOptions = {
    height: '0', // Hide video
    width: '0',
    playerVars: {
      autoplay: 1,
    },
  };

  // Handle YouTube player readiness
  const onPlayerReady = (event) => {
    playerRef.current = event.target;
    event.target.setVolume(1);  // Set volume if needed
  };

  // Detect when the video ends
  // const onPlayerEnd = () => {
  //   // fetchNextVideo();  // Get and play the next video
  // };

  return (
    <div>
      <YouTube
        videoId={videoId}
        opts={playerOptions}
        onReady={onPlayerReady}
        onEnd={onPlayerEnd}
      />
      <button onClick={() => playerRef.current?.playVideo()}>Play</button>
      <button onClick={() => playerRef.current?.pauseVideo()}>Pause</button>
    </div>
  );
};

export default YouTubeAudioPlayer;