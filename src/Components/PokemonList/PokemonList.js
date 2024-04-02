import { useState, useEffect } from "react";
import { getDetails } from "../../services/utils";
import Pokemon from "../Pokemon/Pokemon";
import "./PokemonList.css";
import { baseURL, pokeAPILogo } from "../../constants";
import Pagination from "../Pagination/Pagination";

function PokemonList() {
  const [data, setData] = useState(null);

  const fetchDataFromAPI = async (url) => {
    try {
      const result = await getDetails(url);
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataFromAPI(`${baseURL}/pokemon`);
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [data]);

  return (
    <div>
      <h1 className="header sticky">
        <img src={pokeAPILogo} alt="pokeAPILogo" />
      </h1>
      {data ? (
        <>
          <div className="grid-container">
            {data.results.map((pokemon, index) => {
              return (
                <Pokemon key={index} name={pokemon.name} url={pokemon.url} />
              );
            })}
          </div>
          <Pagination
            prevPageLink={data.previous}
            nextPageLink={data.next}
            fetchDataFromAPI={fetchDataFromAPI}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PokemonList;
