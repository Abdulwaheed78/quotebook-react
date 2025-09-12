import React, { useEffect, useState } from "react";
import axios from "axios";
import LikeButton from "../LikeButton";
import CopyButton from "../CopyButton";
import ShareButton from "../ShareButton";
import Loading from "../Loading";
import NoQuotes from "../NoQuotes";

export default function LikedQuotes() {
  const [likedQuoteIds, setLikedQuoteIds] = useState([]);
  const [likedQuotes, setLikedQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedQuotes = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("quoteApiToken");

        const res = await axios.get("http://127.0.0.1:8000/api/my-likes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // ✅ Now backend returns quotes directly, not wrapped in `like.quote`
        const quotesData = res.data;

        setLikedQuotes(quotesData); // store full quote objects
        setLikedQuoteIds(quotesData.map((q) => q.id)); // also store IDs for quick access
      } catch (err) {
        console.error(
          "Error fetching liked quotes:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLikedQuotes();
  }, []); // run only once when component mounts

  if (loading) return <Loading />;

  if (likedQuotes.length === 0)
    return <NoQuotes message="No Liked quotes Found." />;

  return (
    <div className="mt-4">
      <div className="row justify-content-start align-items-start">
        {likedQuotes.map((quote) => (
          <div key={quote.id} className="col-12 col-md-6 mb-4">
            <div
              className="card bg-transparent"
              style={{ border: "1px solid black" }}
            >
              <div className="card-body h-100">
                <div className="d-flex justify-content-end gap-3 align-items-center">
                  <span className="badge p-2 text-muted">
                    {quote?.category?.name || "No Category"}
                  </span>
                  <ShareButton quote={quote} />
                  <CopyButton quote={`${quote.id}`} quoteId={quote.id} />
                </div>

                <h5 className="m-auto text-center">" {quote.quote} "</h5>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-2">
                    {/* ✅ Corrected LikeButton state */}
                    <LikeButton
                      quoteId={quote.id}
                      isLiked={!!quote.liked_by_user}
                      onToggle={(liked) => {
                        if (!liked) {
                          // remove this card only in LikedQuotes page
                          setLikedQuotes((prev) =>
                            prev.filter((q) => q.id !== quote.id)
                          );
                        }
                      }}
                    />
                    <span>{quote.likes_count} Likes</span>
                  </div>

                  <span className="badge text-bg-transparent text-muted">
                    ~By {quote.user?.name || "Unknown"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
