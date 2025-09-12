function About() {
  return (
    <div className="container mt-5">
      <div className="container text-center my-5">
        <h3 className="text-dark mb-3">About Us</h3>
        <p className="text-muted text-center fs-5">
          Welcome to <strong>QuoteBook</strong> — a place where words inspire,
          motivate, and bring positivity to your everyday life. Our mission is
          to share timeless wisdom through meaningful quotes, making your day
          brighter and your mind stronger. 🌿
        </p>
      </div>

      <div className="accordion" id="accordionExample">
        {/* 1. About the Project */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              About the Project
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong>
                This project is a simple React + Bootstrap application
              </strong>{" "}
              <br />
              In this project users can explore inspirational and motivational
              quotes. The main goal is to make quotes easily accessible,
              interactive, and visually appealing. Bootstrap components like
              Accordion make the UI clean and structured.
            </div>
          </div>
        </div>

        {/* 2. Quotes of the Day */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Quotes of the Day
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong>The “Quote of the Day” feature</strong> <br />
              highlights a single inspiring quote every day. This ensures that
              users have fresh content whenever they open the app. It can be
              randomized or scheduled based on date/time. A motivational boost
              right at your fingertips!
            </div>
          </div>
        </div>

        {/* 3. All Quotes Section */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              All Quotes Collection
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong>The “All Quotes” section</strong> <br /> provides a full
              list of quotes that users can browse anytime. Along with viewing,
              <em> each quote has a "Copy" button </em> so users can instantly
              copy and share quotes with friends, on social media, or keep them
              for personal notes.
            </div>
          </div>
        </div>

        {/* 4. Features & Enhancements */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              Features & Enhancements
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              {/* ✅ Features Already Added */}
              <strong>Features already added:</strong>
              <ul>
                <li>Dark & Light mode toggle for better readability.</li>
                <li>Responsive navigation with offcanvas menu on mobile.</li>
                <li>
                  Dedicated pages for Quote of the Day, Quotes, and About Us.
                </li>
                <li>
                  Clean About Us section with centered layout and description.
                </li>
              </ul>
              <hr />
              {/* 🚀 Future Enhancements */}
              <strong>Planned improvements coming soon:</strong>
              <ul>
                <li>Allowing users to add their own quotes.</li>
                <li>
                  Adding categories like Motivation, Life, Success, Love, etc.
                </li>
                <li>Enabling users to like and save favorite quotes.</li>
                <li>Integrating an API to fetch famous quotes dynamically.</li>
              </ul>
              These will make the app even more interactive and engaging over
              time.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
