import { Input } from "antd";
import { useState } from "react";

const { Search } = Input;

function DynamicSearchBar({ onSearch }) {
  const [searchValue, setSearchValue] = useState("");

  function handleSearch(value) {
    setSearchValue(value);
    onSearch(value);
  }

  return (
    <Search
      placeholder="Search..."
      allowClear
      enterButton
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      onSearch={handleSearch}
      style={{ width: "30%" }}
    />
  );
}

export default DynamicSearchBar;
