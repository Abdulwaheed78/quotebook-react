import React, { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";

export default function LikeButton({ quoteId, isLiked, onToggle }) {
  const [liked, setLiked] = useState(isLiked);
  const [loading, setLoading] = useState(false);

  const toggleLike = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const token = localStorage.getItem("quoteApiToken");
      await axios.post(
        `http://127.0.0.1:8000/api/quotes/${quoteId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newLiked = !liked;
      setLiked(newLiked);

      // ✅ notify parent only
      if (onToggle) onToggle(newLiked);

    } catch (err) {
      console.error("Error toggling like:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleLike}
      className="btn btn-sm border-0"
      style={{ fontSize: "1.3rem", minWidth: "2rem" }}
      disabled={loading}
    >
      {loading ? (
        <Spinner size="sm" />
      ) : (
        <i
          className={`bi ${liked ? "bi-heart-fill text-danger" : "bi-heart"}`}
        ></i>
      )}
    </button>
  );
}
