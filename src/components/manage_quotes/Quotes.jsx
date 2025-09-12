import React, { useEffect, useState } from "react";
import axios from "axios";
import ShareButton from "../ShareButton";
import CopyButton from "../CopyButton";
import LikeButton from "../LikeButton";
import Loading from "../Loading";
import NoQuotes from "../NoQuotes";
import Edit from "./Edit";

function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingQuoteId, setEditingQuoteId] = useState(null);

  // Fetch user quotes
  const fetchQuotes = async () => {
    try {
      const token = localStorage.getItem("quoteApiToken");
      const res = await axios.get("http://127.0.0.1:8000/api/my-quotes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuotes(res.data || []);
    } catch (err) {
      console.error("Error fetching quotes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  // Delete Quote
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this quote?")) return;
    try {
      const token = localStorage.getItem("quoteApiToken");
      await axios.delete(`http://127.0.0.1:8000/api/delete_quotes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuotes(quotes.filter((q) => q.id !== id));
    } catch (err) {
      console.error("Error deleting quote:", err);
    }
  };

  if (loading) return <Loading />;

  // If editing, show EditQuote component
  if (editingQuoteId) {
    return (
      <Edit
        quoteId={editingQuoteId}
        onCancel={() => setEditingQuoteId(null)}
        onUpdated={() => {
          setEditingQuoteId(null);
          fetchQuotes(); // refresh list after update
        }}
      />
    );
  }

  // Otherwise show list
  return (
    <div className="row justify-content-start mt-3">
      {quotes.length > 0 ? (
        quotes.map((quote) => (
          <div className="col-12 col-md-6 mb-4 d-flex" key={quote.id}>
            <div
              className="card w-100 h-100 bg-transparent shadow-sm d-flex flex-column"
              style={{ border: "1px solid black" }}
            >
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-end align-items-center gap-2">
                  <span className="badge p-2  text-muted">
                    {quote?.category?.name || "No Category"}
                  </span>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setEditingQuoteId(quote.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(quote.id)}
                  >
                    Delete
                  </button>
                  <CopyButton quote={quote.quote} quoteId={quote.id} />
                  <ShareButton quote={quote} />
                </div>

                <h5 className="mt-4 mb-4 text-center flex-grow-1">
                  " {quote.quote} "
                </h5>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-2">
                    <LikeButton
                      quoteId={quote.id}
                      isLiked={!!quote.liked_by_user}
                      onToggle={(liked) => {
                        // Just update the likes_count in this quote
                        setQuotes((prev) =>
                          prev.map((q) =>
                            q.id === quote.id
                              ? {
                                  ...q,
                                  likes_count: liked
                                    ? q.likes_count + 1
                                    : q.likes_count - 1,
                                }
                              : q
                          )
                        );
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
        ))
      ) : (
        <NoQuotes message="Not Created any Quote Yet. Create your first One!" />
      )}
    </div>
  );
}

export default Quotes;
