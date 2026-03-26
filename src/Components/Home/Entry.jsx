import { useState } from "react";
import { HiOutlineMusicNote } from "react-icons/hi";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const Entry = () => {
  const [songQuery, setSongQuery] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const navigate = useNavigate();

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const extractVideoId = (url) => {
    const regExp =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const handleSubmit = () => {
    if (!songQuery.trim()) {
      triggerShake();
      return;
    }

    const videoId = extractVideoId(songQuery);

    if (!videoId) {
      triggerShake();
      return;
    }

    navigate("/Canvas", {
      state: { videoId }
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 px-4 relative mt-2">
      <p className="text-[#7a4b2e] font-bold text-2xl [font-family:'Short_Stack',sans-serif] text-center">
        Paste a YouTube link and draw how it makes you feel!
      </p>

      <div className="relative w-full">
        <div className="absolute top-2 right-1 w-full h-full rounded-full bg-[#7a4b2e] opacity-20 z-0" />

        <div className="flex flex-row items-center gap-2 rounded-full bg-gradient-to-b from-[rgb(255,198,150)] to-[rgb(255,160,120)] border-[3px] border-[#7a4b2e] relative z-10">
          <div className="relative flex-1">
            <HiOutlineMusicNote className="absolute left-7 top-1/2 -translate-y-1/2 text-[#7a4b2e] text-2xl opacity-50" />

            <input
              value={songQuery}
              onChange={(e) => setSongQuery(e.target.value)}
              className={`w-full border-2 border-[#7a4b2e44] rounded-2xl pl-12 pr-4 py-2 m-5 text-1xl md:text-2xl text-[#7a4b2e] outline-none placeholder-[#7a4b2e]/50 [font-family:'Short_Stack',sans-serif] focus:border-[#FFC19E] transition-all duration-200 ${
                isShaking ? "animate-shake border-red-400" : ""
              }`}
              placeholder="Paste YouTube link"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="cursor-pointer bg-[#7a4b2e] text-[#FFC19E] p-2 md:p-3 mx-5 rounded-xl hover:bg-[#FFC19E] hover:text-[#7a4b2e] transition-all duration-200 flex items-center justify-center"
          >
            <GoArrowRight className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Entry;