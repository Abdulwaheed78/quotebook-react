import React, { useState, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import Loading from "./Loading";
import ShareButton from "./ShareButton";
import CopyButton from "./CopyButton";
import { GEMINI_API_KEY } from "./gemini";
import Spinner from "./Spinner";

function AiQuote() {
  const [quote, setQuote] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
  });

  async function fetchQuote() {
    setSpinner(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Give me a random quote strictly as a JSON object in this format:{"id":1,"quote": "string","author": "string",  "category": "string"} Do not include extra text or explanation.`,
      });
      //console.log(JSON.parse(response.text.replace(/```json|```/g, "").trim()));
      setQuote(JSON.parse(response.text.replace(/```json|```/g, "").trim()));
    } catch (err) {
      console.error("Error fetching quote:", err);
    } finally {
      setSpinner(false); // stop spinner after success or error
    }
  }

  useEffect(() => {
    fetchQuote(); // runs once on mount
  }, []); // ✅ empty dependency array

  if (!quote) return <Loading></Loading>;
  return (
    <div
      className="container "
      style={{ marginTop: "80px", marginBottom: "80px" }}
    >
      <div className="text-center mb-4">
        <h4 className="fw-bold m-2">Today's Inspiration from AI</h4>
        <p className="text-muted">
          Fuel your day with wisdom and motivation — here’s a hand-picked quote
          to uplift your spirits and spark creativity.
        </p>
      </div>

      <div className="row justify-content-center alin-item-center">
        <div className="col-12 col-md-6">
          <div
            className="card w-md-50 w-100 bg-transparent "
            key={quote.id}
            style={{ border: "1px solid black" }}
          >
            <div className="card-body ">
              <div className="d-flex justify-content-end gap-3 align-items-center">
                <span className="badge p-2  text-muted">
                  {quote?.category || "No Category"}
                </span>
                <ShareButton quote={quote} />
                <CopyButton quote={quote.quote} quoteId={quote.id} />
              </div>

              <h5 className="mt-5 mb-5 text-center">" {quote.quote} "</h5>
              <div className="text-end">
                {/* <div className="d-flex align-items-center gap-2">
                  <LikeButton
                    quoteId={quote.id}
                    isLiked={!!quote.liked_by_user}
                    onToggle={(liked) => {
                      setquote((prev) => ({
                        ...prev,
                        likes_count: liked
                          ? prev.likes_count + 1
                          : prev.likes_count - 1,
                        liked_by_user: liked,
                      }));
                    }}
                  />
                  <span>{quote.likes_count} Likes</span>
                </div> */}

                <span className="badge text-bg-transparent text-muted">
                  ~By {quote.author || "Unknown"}
                </span>
              </div>
            </div>
          </div>
          <div className="text-center mt-3">
            <button
              className="btn btn-sm btn-outline-dark"
              onClick={() => fetchQuote()}
            >
              {spinner ? <Spinner size="sm" /> : "New Quote"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiQuote;
