import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSubmit(e) {
    e.preventDefault();
    setSearchParams({ name: searchQuery });
    setSearchQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        placeholder="search for a recipe"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default Search;
