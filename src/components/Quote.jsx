import { useState } from "react";
import { useEffect } from "react";
import Loading from "./Loading";
import LikeButton from "./LikeButton";
import CopyButton from "./CopyButton";
import ShareButton from "./ShareButton";

function Quote() {
  const [data, setData] = useState([]);

  function fetchRandom() {
    fetch("http://127.0.0.1:8000/api/random-quote", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("quoteApiToken")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch random quote");
        return res.json();
      })
      .then((data) => {
        setData(data);
        //console.log("Random quote:", data);
      })
      .catch((err) => console.error("Error fetching random quote:", err));
  }

  useEffect(() => {
    fetchRandom();
  }, []);

  if (!data) return <Loading></Loading>;
  return (
    <div
      className="container "
      style={{ marginTop: "80px", marginBottom: "80px" }}
    >
      <div className="text-center mb-4">
        <h4 className="fw-bold m-2">Quote Of The Day</h4>
        <p className="text-muted">
          A single thought can spark a better day — here’s today’s inspiration
          just for you.
        </p>
      </div>

      <div className="row justify-content-center alin-item-center">
        <div className="col-12 col-md-6">
          <div
            className="card w-md-50 w-100 bg-transparent "
            key={data.id}
            style={{ border: "1px solid black" }}
          >
            <div className="card-body ">
              <div className="d-flex justify-content-end gap-3 align-items-center">
                <span className="badge p-2  text-muted">
                  {data?.category?.name || "No Category"}
                </span>
                <ShareButton quote={data} />
                <CopyButton quote={data.quote} quoteId={data.id} />
              </div>

              <h5 className="mt-5 mb-5 text-center">" {data.quote} "</h5>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <LikeButton
                    quoteId={data.id}
                    isLiked={!!data.liked_by_user}
                    onToggle={(liked) => {
                      setData((prev) => ({
                        ...prev,
                        likes_count: liked
                          ? prev.likes_count + 1
                          : prev.likes_count - 1,
                        liked_by_user: liked,
                      }));
                    }}
                  />
                  <span>{data.likes_count} Likes</span>
                </div>

                <span className="badge text-bg-transparent text-muted">
                  ~By {data.user?.name || "Unknown"}
                </span>
              </div>
            </div>
          </div>
          <div className="text-center mt-3">
            <button
              className="btn btn-sm btn-outline-dark"
              onClick={() => fetchRandom()}
            >
              New Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quote;
