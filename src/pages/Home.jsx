import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import WordResult from "../components/WordResult";

function Home({ auth }) {
  const navigate = useNavigate();
  const { currentUser, logout } = auth;

  const [wordData, setWordData]     = useState(null);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory]       = useState(
    JSON.parse(localStorage.getItem("history") || "[]")
  );

  const fetchWord = async (word) => {
    if (!word) { setWordData(null); setError(""); return; }
    try {
      setLoading(true); setError(""); setWordData(null);
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!res.ok) throw new Error("Word not found");
      const data = await res.json();
      setWordData(data[0]);
      const updated = [word, ...history.filter(h => h !== word)].slice(0, 10);
      setHistory(updated);
      localStorage.setItem("history", JSON.stringify(updated));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();        // ✅ hook clears both localStorage and React state
    navigate("/");
  };

  return (
    <div className="home-container">
      <div className="navbar">
        <h2>Dictionary App</h2>
        <div>
          <span>Welcome, {currentUser?.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <SearchBox onSearch={fetchWord} />

      <button className="history-btn" onClick={() => setShowHistory(!showHistory)}>
        {showHistory ? "Hide History" : "Show History"}
      </button>

      {showHistory && (
        <div className="history-box">
          {history.length > 0 ? (
            <>
              <div className="history-list">
                {history.map((item, i) => (
                  <button key={i} className="history-item" onClick={() => fetchWord(item)}>{item}</button>
                ))}
              </div>
              <button className="clear-history-btn" onClick={() => { setHistory([]); localStorage.removeItem("history"); }}>
                Clear History
              </button>
            </>
          ) : (
            <p className="info-text">No search history yet.</p>
          )}
        </div>
      )}

      {loading && <p className="info-text">Loading...</p>}
      {error   && <p className="error-text">{error}</p>}

      <WordResult data={wordData} />

      {wordData && (
        <button className="clear-search-btn" onClick={() => { setWordData(null); setError(""); }}>
          Clear Search
        </button>
      )}
    </div>
  );
}

export default Home;