import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import SearchBar from "./SearchBar";
import LikeButton from "./LikeButton";
import LoadMoreSpinner from "./LoadMoreSpinner";
import CopyButton from "./CopyButton";
import ShareButton from "./ShareButton";

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(12);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/quotes-all", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("quoteApiToken")}`,
      },
    })
      .then((res) => res.json()) // parse JSON
      .then((data) => {
        // console.log(data);
        setQuotes(data || []); // make sure it's always an array
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  // infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.offsetHeight
      ) {
        if (!isFetching && visible < filteredQuotes.length) {
          setIsFetching(true);
          setTimeout(() => {
            setVisible((prev) => prev + 9);
            setIsFetching(false);
          }, 800); // simulate loading
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visible, isFetching, quotes]);

  // filter for search
  const filteredQuotes = quotes.filter(
    (q) =>
      q.quote.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.user.name.toLowerCase().includes(searchTerm.toLowerCase())

    //add more when category comes
  );

  const myCards = filteredQuotes.slice(0, visible).map((quote) => (
    <div className="col-12 col-md-4 mb-4" key={quote.id}>
      <div
        className="card h-100 bg-transparent"
        style={{ border: "1px solid black" }}
      >
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-end gap-3 align-items-center">
            <span className="badge p-2  text-muted">
              {quote?.category?.name || "No Category"}
            </span>
            <ShareButton quote={quote} />
            <CopyButton quote={quote.quote} quoteId={quote.id} />
          </div>

          {/* Quote text */}
          <div className="text-center flex-grow-1 d-flex align-items-center justify-content-center">
            <h5 className="mt-3 mb-3">" {quote.quote} "</h5>
          </div>

          {/* Author */}
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
  ));

  if (isLoading) return <Loading />;

  return (
    <div className="container">
      <div className="text-center mb-4 mt-4">
        <h4 className="fw-bold">Inspirational Quotes</h4>
        <p className="text-muted">
          A collection of hand-picked quotes to keep you motivated and inspired.
        </p>
      </div>

      {/* search bar */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="row justify-content-start align-item-start mt-md-3 mt-3">
        {myCards}
      </div>

      {/* loader when fetching new data */}
      {isFetching && <LoadMoreSpinner></LoadMoreSpinner>}
    </div>
  );
}
