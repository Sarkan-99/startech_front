import React from "react";
import ReactPlayer from "react-player";

const MyVideo = () => {
  const videoUrl = "https://www.youtube.com/watch?v=BxaTgTtbnpE"; // Regular YouTube URL
  
  return (
    <div className=" mt-10 flex justify-center">
      <ReactPlayer url={videoUrl} 
       width="70%"  // Or any other percentage or pixel value
       height="500px"
       controls={true}  // Disables the YouTube controls
        playing={false}    // Optionally, start the video automatically
        config={{
          youtube: {
            playerVars: { modestbranding: 1, rel: 0, showinfo: 0 } // Hide related videos and branding
          }
        }}/>
    </div>
  );
};

export { MyVideo };
