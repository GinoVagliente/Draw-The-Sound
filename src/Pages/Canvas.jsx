import DrawingStation from "../Components/Canvas/DrawingStation";
import MediaPlayer from "../Components/Canvas/MediaPlayer";
import { useLocation } from "react-router-dom";
import DisclaimerModal from "../Components/Canvas/DisclaimerModal"
const Canvas = () => {
  const location = useLocation();
  const song = location.state?.song;

  return (
    <div className="bg-gradient-to-b from-[rgb(250,219,197)] to-[rgb(255,147,123)] w-full min-h-screen flex flex-col items-center">
      <div className="mt-5">
        <MediaPlayer song={song} />
      </div>
      <DisclaimerModal />
      <div className="w-full flex items-center justify-center mt-5">
        <DrawingStation />
      </div>
    </div>
  );
};

export default Canvas;
