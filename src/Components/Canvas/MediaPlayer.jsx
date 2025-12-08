import { useEffect, useRef } from "react";

const MediaPlayer = ({ song }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!song?.trackid) return;
    const element = iframeRef.current;
    if (!element) return;

    const loadPlayer = (IFrameAPI) => {
      element.innerHTML = "";

      const isMobile = window.innerWidth <= 768;
      const options = {
        uri: `spotify:track:${song.trackid}`,
        width: isMobile ? "350" : "400",
        height: isMobile ? "80" : "152",
      };

      IFrameAPI.createController(element, options, () => {});
    };

    const initSpotify = () => {
      if (window.SpotifyIframeAPI) {
        loadPlayer(window.SpotifyIframeAPI);
      } else {
        window.onSpotifyIframeApiReady = (IFrameAPI) => {
          window.SpotifyIframeAPI = IFrameAPI;
          loadPlayer(IFrameAPI);
        };

        if (!document.querySelector('script[src="https://open.spotify.com/embed/iframe-api/v1"]')) {
          const script = document.createElement("script");
          script.src = "https://open.spotify.com/embed/iframe-api/v1";
          script.async = true;
          document.body.appendChild(script);
        }
      }
    };

    initSpotify();

    const handleResize = () => {
      loadPlayer(window.SpotifyIframeAPI);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);

  }, [song]);

  if (!song) return <p className="text-[#7a4b2e]">No song selected.</p>;

  return (
      <div ref={iframeRef}></div>
  );
};

export default MediaPlayer;
