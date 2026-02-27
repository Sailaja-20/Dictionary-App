import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import WordResult from "../components/WordResult";

function Home() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [wordData, setWordData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );
  const [showHistory, setShowHistory] = useState(false);

  const fetchWord = async (word) => {
    if (!word) {
      setWordData(null);
      setError("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setWordData(null);

      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );

      if (!response.ok) throw new Error("Word not found");

      const data = await response.json();
      setWordData(data[0]);

      const updatedHistory = [word, ...history.filter((h) => h !== word)];
      setHistory(updatedHistory);
      localStorage.setItem("history", JSON.stringify(updatedHistory));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setWordData(null);
    setError("");
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("history");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="home-container">
      
      <div className="navbar">
        <h2>Dictionary App</h2>
        <div>
          <span>Welcome, {currentUser.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <SearchBox onSearch={fetchWord} />

      <button
        className="history-btn"
        onClick={() => setShowHistory(!showHistory)}
      >
        {showHistory ? "Hide History" : "Show History"}
      </button>

      {showHistory && (
        <div className="history-box">
          {history.length > 0 ? (
            <>
              <div className="history-list">
                {history.map((item, index) => (
                  <button
                    key={index}
                    className="history-item"
                    onClick={() => fetchWord(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <button
                className="clear-history-btn"
                onClick={handleClearHistory}
              >
                Clear History
              </button>
            </>
          ) : (
            <p className="info-text">No search history yet.</p>
          )}
        </div>
      )}

      {loading && <p className="info-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      <WordResult data={wordData} />

      {wordData && (
        <button className="clear-search-btn" onClick={handleClearSearch}>
          Clear Search
        </button>
      )}
    </div>
  );
}

export default Home;