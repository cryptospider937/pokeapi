import React, {useState, useEffect} from "react";
import { getParameterByName } from "../../services/utils";
import "./Pagination.css";

const Pagination = ({ prevPageLink, nextPageLink, fetchDataFromAPI }) => {
  const [pageNumber, setpageNumber] = useState(1);

  const handleClick = (url) => {
    if (url) fetchDataFromAPI(url);
  };

  useEffect(() => {
    const url = nextPageLink ? nextPageLink : prevPageLink
    const offset = getParameterByName('offset', url);
    setpageNumber(offset/20);
  },[nextPageLink, prevPageLink]);

  return (
    <div className="pagination">
      <button
        className={prevPageLink ? "active" : "disabled"}
        onClick={() => handleClick(prevPageLink)}
      >
        Prev
      </button>
      <div className="pageNumber">{pageNumber}</div>
      <button
        className={nextPageLink ? "active" : "disabled"}
        onClick={() => handleClick(nextPageLink)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
