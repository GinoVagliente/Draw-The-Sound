import { useState } from "react";
import axios from "axios";

export const useSearchSong = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchSong = async (songName) => {
    if (!songName) return null;

    setLoading(true);
    setError(null);
    //need to change this when the backend is finally uploaded
    try {
      const res = await axios.get(
        `http://localhost:3000/song/search/${encodeURIComponent(songName)}`
      );
      return res.data;
    } catch (err) {
      console.error("Error fetching song:", err);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, searchSong };
};
