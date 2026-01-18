import { useState, useEffect } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
const Rate = () => {
  const baseDrawings = [
    { id: 1, img: "/Drawing1.PNG", song: "Send It Up - Kanye West", defaultRating: 5 },
    { id: 2, img: "/Drawing2.PNG", song: "Runaway - Kanye West", defaultRating: 4.5 },
    { id: 3, img: "/Drawing3.PNG", song: "Family Business - Kanye West", defaultRating: 4 }
  ];

  const ONE_MINUTE = (1000 * 60) * 5;

  const [ratings, setRatings] = useState(() => {
    const saved = localStorage.getItem("ratings");
    const savedTime = localStorage.getItem("ratingsTime");
    const now = Date.now();

    if (saved && savedTime && now - savedTime < ONE_MINUTE) {
      return JSON.parse(saved);
    }

    const defaults = baseDrawings.reduce((acc, d) => {
      acc[d.id] = d.defaultRating;
      return acc;
    }, {});
    return defaults;
  });

  const [uploadedDrawings, setUploadedDrawings] = useState([]);

  useEffect(() => {
    localStorage.setItem("ratings", JSON.stringify(ratings));
    localStorage.setItem("ratingsTime", Date.now());
  }, [ratings]);

  useEffect(() => {
    const saved = localStorage.getItem("uploadedDrawings");
    const savedTime = localStorage.getItem("uploadedDrawingsTime");
    const now = Date.now();

    if (saved && savedTime) {
      if (now - savedTime < ONE_MINUTE) {
        setUploadedDrawings(JSON.parse(saved));
      } else {
        localStorage.removeItem("uploadedDrawings");
        localStorage.removeItem("uploadedDrawingsTime");
        setUploadedDrawings([]);
      }
    }
  }, []);

  const handleRating = (id, value) => {
    setRatings((prev) => ({ ...prev, [id]: value }));
  };

  const renderStar = (rating, starIndex) => {
    if (rating >= starIndex) return <FaStar className="text-yellow-400 text-2xl" />;
    if (rating >= starIndex - 0.5) return <FaStarHalfAlt className="text-yellow-400 text-2xl" />;
    return <FaRegStar className="text-gray-300 hover:text-yellow-400 text-2xl" />;
  };

  const handleClick = (e, drawingId, starIndex) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - left;
    const isHalf = clickX < width / 2;
    const value = isHalf ? starIndex - 0.5 : starIndex;
    handleRating(drawingId, value);
  };

  const calculateCommunityRating = (drawingId, defaultRating) => {
    return ratings[drawingId] ?? defaultRating;
  };

  const allDrawings = [
    ...baseDrawings,
    ...uploadedDrawings.map((d, i) => ({
      id: 1000 + i,
      img: d.img,
      song: "User Upload",
      defaultRating: 0,
    })),
  ];

  return (
    <div className="w-full min-h-screen flex flex-col justify-between bg-gradient-to-b from-[rgb(250,219,197)] to-[rgb(255,147,123)] overflow-hidden">
      <div className="flex-1 flex flex-col items-center px-5 pb-24">
        <Header />
        <div className="mb-14 relative inline-flex items-center justify-center mt-20">
          <div className="absolute top-2 right-2 w-full h-full rounded-full bg-[#7a4b2e] opacity-20 z-0"></div>
          <div className="relative px-10 py-5 rounded-full bg-gradient-to-b from-[rgb(255,198,150)] to-[rgb(255,160,120)] border-[4px] border-[#7a4b2e] z-10">
            <span className="absolute left-4 top-4 w-2 h-2 bg-white/70 rounded-full" />
            <span className="absolute left-7 top-7 w-1.5 h-1.5 bg-white/60 rounded-full" />
            <span className="absolute right-5 top-5 w-2 h-2 bg-white/70 rounded-full" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#FFC19E] [font-family:'Short_Stack',sans-serif] [-webkit-text-stroke:6px_#7a4b2e] [paint-order:stroke_fill] whitespace-nowrap">
              Rate Drawings by Others
            </h1>
          </div>
        </div>

        <ul className="w-full max-w-3xl flex flex-col gap-6">
          {allDrawings.map((drawing) => (
            <div key={drawing.id} className="relative group">
              <div className="absolute top-2 right-2 w-full h-full rounded-2xl bg-[#7a4b2e] opacity-20 z-0 transition-transform duration-300 group-hover:scale-[1.01] group-hover:opacity-50" />
              <li className="relative flex flex-col md:flex-row items-center gap-5 bg-gradient-to-b from-[rgb(255,233,214)] to-[rgb(255,204,183)] border-4 border-[#7a4b2e] rounded-2xl p-4 transition transform hover:scale-[1.01] z-10">
                <span className="absolute right-4.5 bottom-8 w-2 h-2 bg-white/45 rounded-full" />
                <span className="absolute right-2 bottom-6 w-2 h-2 bg-white/45 rounded-full" />
                <span className="absolute right-5 bottom-5 w-1.5 h-1.5 bg-white/45 rounded-full" />
                <span className="absolute right-1 bottom-1 w-4 h-4 bg-white/45 rounded-full" />

                <img
                  src={drawing.img}
                  alt={`Drawing ${drawing.id}`}
                  className="w-48 h-48 object-contain rounded-xl border-2 border-[#7a4b2e]/30 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => {
                    if (drawing.img.startsWith("data:")) {
                      const byteString = atob(drawing.img.split(',')[1]);
                      const mimeString = drawing.img.split(',')[0].split(':')[1].split(';')[0];
                      const ab = new ArrayBuffer(byteString.length);
                      const ia = new Uint8Array(ab);
                      for (let i = 0; i < byteString.length; i++) {
                        ia[i] = byteString.charCodeAt(i);
                      }
                      const blob = new Blob([ab], { type: mimeString });
                      const url = URL.createObjectURL(blob);

                      window.open(url, "_blank", "noopener,noreferrer");
                    } else {
                      window.open(drawing.img, "_blank", "noopener,noreferrer");
                    }
                  }}

                />

                <div className="flex flex-col items-center md:items-start flex-1">
                  <h2 className="text-xl [font-family:'Short_Stack',sans-serif] font-bold text-[#7a4b2e] text-center md:text-left mb-2">
                    {drawing.song}
                  </h2>

                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((starIndex) => (
                      <span
                        key={starIndex}
                        onClick={(e) => handleClick(e, drawing.id, starIndex)}
                        className="cursor-pointer text-3xl transition-transform hover:scale-110"
                      >
                        {renderStar(ratings[drawing.id] || 0, starIndex)}
                      </span>
                    ))}
                  </div>

                  <p className="text-[#7a4b2e] text-1xl mb-1 [font-family:'Short_Stack',sans-serif] font-bold">
                    {ratings[drawing.id]
                      ? `You rated ${ratings[drawing.id]} star${ratings[drawing.id] > 1 ? "s" : ""}`
                      : "No rating yet"}
                  </p>

                  <div className="flex items-center gap-1">
                    <span className="text-1xl text-[#7a4b2e] [font-family:'Short_Stack',sans-serif] font-bold">
                      Community Rated:
                    </span>
                    {[1, 2, 3, 4, 5].map((starIndex) => (
                      <span key={starIndex}>
                        {renderStar(
                          calculateCommunityRating(drawing.id, drawing.defaultRating),
                          starIndex
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>

      <div className="w-full">
        <Footer />
      </div>

    </div>
  );
};

export default Rate;
