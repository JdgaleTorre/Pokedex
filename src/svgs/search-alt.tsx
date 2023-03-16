const SearchAlt = ({
  width = 25,
  height = 25,
  color = "white",
}: {
  width: number;
  height: number;
  color: string;
}) => {
  return (
    <svg
      width={`${width}px`}
      height={`${height}px`}
      viewBox={`0 0 ${width} ${height}`}
      fillOpacity="0"
    >
      <path
        d="M17 17L21 21"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
};

export default SearchAlt;
