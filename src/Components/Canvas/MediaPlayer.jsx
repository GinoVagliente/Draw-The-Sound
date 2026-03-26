import { useLocation } from "react-router-dom";

const MediaPlayer = () => {
  const location = useLocation();
  const videoId = location.state?.videoId;

  if (!videoId) {
    return <p className="text-[#7a4b2e]">No video selected.</p>;
  }

  return (
    <div className="flex justify-center">
      <iframe
        width="400"
        height="200"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube player"
        allow="autoplay; encrypted-media"
        allowFullScreen
        className="rounded-xl border-2 border-[#7a4b2e]"
      />
    </div>
  );
};

export default MediaPlayer;