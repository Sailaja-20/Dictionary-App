import React from "react";

function WordResult({ data }) {
  if (!data) return null;

  return (
    <div className="result-box">
      <h2>{data.word}</h2>

      {data.phonetics?.[0]?.text && (
        <p>Pronunciation: {data.phonetics[0].text}</p>
      )}

      {data.meanings?.map((meaning, index) => (
        <div key={index}>
          <h4>{meaning.partOfSpeech}</h4>

          {meaning.definitions?.map((def, i) => (
            <p key={i}>
              {def.definition}

              {def.example && (
                <span className="example">
                  {" "}— {def.example}
                </span>
              )}
            </p>
          ))}

          {meaning.synonyms?.length > 0 && (
            <p>
              <strong>Synonyms:</strong>{" "}
              {meaning.synonyms.join(", ")}
            </p>
          )}

          {meaning.antonyms?.length > 0 && (
            <p>
              <strong>Antonyms:</strong>{" "}
              {meaning.antonyms.join(", ")}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default WordResult;