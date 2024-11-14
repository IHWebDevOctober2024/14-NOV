import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Search2() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(value) {
    setSearchQuery(value);
    setSearchParams({ name: value });
  }

  return (
    <form>
      <input
        value={searchQuery}
        onChange={(e) => handleChange(e.target.value)}
        type="text"
        placeholder="search for a recipe"
      />
    </form>
  );
}

export default Search2;
