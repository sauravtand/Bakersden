import { Input } from "antd";
import { useState } from "react";

const { Search } = Input;

function DynamicSearchBar({ onSearch, onClear }) {
  const [searchValue, setSearchValue] = useState("");

  function handleSearch(value) {
    setSearchValue(value);
    onSearch(value);
  }

  function handleClear() {
    setSearchValue("");
    onClear();
  }

  return (
    <Search
      placeholder="Search..."
      allowClear
      enterButton
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      onSearch={handleSearch}
      onClear={handleClear}
      style={{ width: "30%" }}
    />
  );
}

export default DynamicSearchBar;
