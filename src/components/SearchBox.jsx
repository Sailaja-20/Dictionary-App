import React, { useState } from "react";

function SearchBox({ onSearch }) {
  const [searchWord, setSearchWord] = useState("");

  const handleSearch = () => {
    if (!searchWord.trim()) return;

    onSearch(searchWord);

    setSearchWord("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-box-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search a word..."
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBox;