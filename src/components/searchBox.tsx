import * as React from "react";
import SearchAlt from "~/svgs/search-alt";

const SearchBox = ({ onChange }: { onChange: (arg0: string) => void }) => {

  return (
    <div className="bg-white flex p-4 m-3 rounded-lg justify-between shadow-md">
      <input
        className="flex align-middle bg-white w-full focus:outline-none"
        placeholder="Search your Pokémon"
        type="text"
        onChange={e =>
          onChange(e.target.value)}
      />
      <div className="bg-red-500 rounded p-1 shadow-lg shadow-red-500">
        <SearchAlt width={25} height={25} color="#FFFFFF" />
      </div>
    </div>
  );
}
export default SearchBox;