import * as React from "react";
import Image from "next/image";
import SearchAlt from "~/svgs/search-alt";

function SearchBox() {
  return (
    <div className="bg-white flex p-4 m-3 rounded-lg justify-between shadow-md">
      <input
        className="flex align-middle bg-white w-full focus:outline-none"
        placeholder="Search your Pokémon"
        type="text"
      />
      <div className="bg-red-500 rounded p-1 shadow-lg shadow-red-500">
        <SearchAlt width={25} height={25} color="#FFFFFF" />
      </div>
    </div>
  );
}

export default SearchBox;
