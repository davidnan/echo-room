import React, { useRef } from 'react';
import YouTube from 'react-youtube';

const YouTubeAudioPlayer = React.forwardRef(({ videoId, onPlayerEnd }, ref) => {
  const playerRef = useRef(null);

  // Expose play and pause methods to parent
  React.useImperativeHandle(ref, () => ({
    playVideo: () => {
      playerRef.current?.playVideo();
    },
    pauseVideo: () => {
      playerRef.current?.pauseVideo();
    }
  }));

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

  return (
    <div style={{ display: 'none' }}>
      <YouTube
        videoId={videoId}
        opts={playerOptions}
        onReady={onPlayerReady}
        onEnd={onPlayerEnd}
      />
    </div>
  );
});

YouTubeAudioPlayer.displayName = 'YouTubeAudioPlayer';

export default YouTubeAudioPlayer;
