import DrawingStation from "../Components/Canvas/DrawingStation";
import MediaPlayer from "../Components/Canvas/MediaPlayer";
import { useLocation } from "react-router-dom";
import DisclaimerModal from "../Components/Canvas/DisclaimerModal";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const Canvas = () => {
  const location = useLocation();
  const song = location.state?.song;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[rgb(250,219,197)] to-[rgb(255,147,123)] overflow-hidden">
      <Header />
      <main className="mt-15 md:mt-5 flex-1 flex flex-col items-center gap-4 overflow-visible z-10">
        <MediaPlayer song={song} />
        <DisclaimerModal />
        <div className="w-full flex justify-center">
          <DrawingStation />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Canvas;
