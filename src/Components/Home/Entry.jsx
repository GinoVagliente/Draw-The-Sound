import { useState } from "react";
import { HiOutlineMusicNote } from "react-icons/hi";
import { GoArrowRight } from "react-icons/go";
import { useSearchSong } from "../../hooks/useSearchSong";
import { useNavigate } from "react-router-dom";

const Entry = () => {
  const [songQuery, setSongQuery] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const { loading, searchSong } = useSearchSong();
  const navigate = useNavigate();

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleSubmit = async () => {
    if (!songQuery.trim()) {
      triggerShake();
      return;
    }

    const result = await searchSong(songQuery);
    if (!result) {
      triggerShake();
      return;
    }

    const selectedSong = Array.isArray(result) ? result[0] : result;
    navigate("/Canvas", { state: { song: selectedSong } });
  };

  return (
    <div className="flex flex-col items-center gap-4 px-4">
      <p className="text-[#7a4b2e] font-bold text-2xl [font-family:'Short_Stack',sans-serif] text-center">
        Search a Spotify song and draw how it makes you feel!
      </p>
      <div className="flex flex-row items-center gap-2 w-full max-w-md">
        <div className="relative flex-1">
          <HiOutlineMusicNote className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a4b2e] text-2xl opacity-50" />
          <input
            value={songQuery}
            onChange={(e) => setSongQuery(e.target.value)}
            className={`w-full border-8 border-[#7a4b2e] rounded-xl pl-12 pr-4 py-2 text-1xl md:text-2xl text-[#7a4b2e] outline-none placeholder-[#7a4b2e]/50 [font-family:'Short_Stack',sans-serif] focus:border-[#FFC19E] transition-all duration-200 ${isShaking ? "animate-shake border-red-400" : ""
              }`}
            placeholder="Type a song name"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#7a4b2e] text-[#FFC19E] p-3 rounded-xl hover:bg-[#FFC19E] hover:text-[#7a4b2e] transition-all duration-200 flex items-center justify-center disabled:opacity-50"
        >
          <GoArrowRight className="text-3xl" />
        </button>
      </div>
    </div>
  );
};

export default Entry;
