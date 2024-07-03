import React, { useState } from 'react';
import axios from 'axios';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setQuery(query);

    if (query.length > 0) {
      const response = await axios.get(`/search?q=${query}`);
      setResults(response.data.items);
    } else {
      setResults([]);
    }
  };

  return (
    <div>
      <input type="text" value={query} onChange={handleSearch} placeholder="Search..." />
      <ul>
        {results?.map(result => (
          <li key={result.cacheId}>
            <a href={result.link} target="_blank" rel="noopener noreferrer">
              {result.title}
            </a>
            <p>{result.snippet}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
