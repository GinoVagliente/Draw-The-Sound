import { useState, useEffect } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

//This are the mocks
const Rate = () => {
    const drawings = [
        { id: 1, img: "/Drawing1.PNG", song: "Lost in Japan - Shawn Mendes", defaultRating: 4.5 },
        { id: 2, img: "/Drawing2.PNG", song: "Save Your Tears - The Weeknd", defaultRating: 3.5 },
        { id: 3, img: "/Drawing3.PNG", song: "As It Was - Harry Styles", defaultRating: 5 },
        { id: 4, img: "/Drawing4.PNG", song: "Night Changes - One Direction", defaultRating: 4 },
    ];

    const FIVE_MINUTES = 1000 * 60 * 5;

    const [ratings, setRatings] = useState(() => {
        const saved = localStorage.getItem("ratings");
        const savedTime = localStorage.getItem("ratingsTime");
        const now = Date.now();

        if (saved && savedTime && now - savedTime < FIVE_MINUTES) {
            return JSON.parse(saved);
        }

        const defaults = drawings.reduce((acc, d) => {
            acc[d.id] = d.defaultRating;
            return acc;
        }, {});
        return defaults;
    });

    useEffect(() => {
        localStorage.setItem("ratings", JSON.stringify(ratings));
        localStorage.setItem("ratingsTime", Date.now());
    }, [ratings]);

    const handleRating = (id, value) => {
        setRatings((prev) => ({ ...prev, [id]: value }));
    };

    const renderStar = (rating, starIndex) => {
        if (rating >= starIndex) return <FaStar className="text-yellow-400" />;
        if (rating >= starIndex - 0.5) return <FaStarHalfAlt className="text-yellow-400" />;
        return <FaRegStar className="text-gray-300 hover:text-yellow-400" />;
    };

    const handleClick = (e, drawingId, starIndex) => {
        const { left, width } = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - left;
        const isHalf = clickX < width / 2;
        const value = isHalf ? starIndex - 0.5 : starIndex;
        handleRating(drawingId, value);
    };

    const calculateCommunityRating = (drawingId) => {
        const rating = ratings[drawingId] ?? drawings.find(d => d.id === drawingId).defaultRating;
        return rating;
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-[rgb(255,213,183)] to-[rgb(255,147,123)] flex flex-col items-center py-20 px-5">
            <h1 className="text-3xl md:text-4xl font-bold text-[#7a4b2e] mb-10">
                Rate Drawings by Others
            </h1>

            <ul className="w-full max-w-3xl flex flex-col gap-6">
                {drawings.map((drawing) => (
                    <li
                        key={drawing.id}
                        className="flex flex-col md:flex-row items-center gap-5 bg-white/70 backdrop-blur-md border-4 border-[#7a4b2e] rounded-2xl shadow-md p-4 transition hover:scale-[1.01]"
                    >
                        <img
                            src={drawing.img}
                            alt={`Drawing ${drawing.id}`}
                            className="w-48 h-48 object-contain rounded-xl border border-[#7a4b2e]/30"
                        />
                        <div className="flex flex-col items-center md:items-start flex-1">
                            <h2 className="text-lg font-semibold text-[#7a4b2e] text-center md:text-left mb-2">
                                {drawing.song}
                            </h2>

                            <div className="flex gap-1 mb-2">
                                {[1, 2, 3, 4, 5].map((starIndex) => (
                                    <span
                                        key={starIndex}
                                        onClick={(e) => handleClick(e, drawing.id, starIndex)}
                                        className="cursor-pointer text-2xl transition-transform hover:scale-110"
                                    >
                                        {renderStar(ratings[drawing.id] || 0, starIndex)}
                                    </span>
                                ))}
                            </div>

                            <p className="text-[#7a4b2e] text-sm font-medium mb-1">
                                {ratings[drawing.id]
                                    ? `You rated ${ratings[drawing.id]} star${ratings[drawing.id] > 1 ? "s" : ""}`
                                    : "No rating yet"}
                            </p>

                            <div className="flex items-center gap-1">
                                <span className="text-sm font-medium text-[#7a4b2e]">Community Rated:</span>
                                {[1, 2, 3, 4, 5].map((starIndex) => (
                                    <span key={starIndex}>
                                        {renderStar(calculateCommunityRating(drawing.id), starIndex)}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Rate;
