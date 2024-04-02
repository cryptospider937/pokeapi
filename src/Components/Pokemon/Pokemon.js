import { useState, useEffect } from "react";
import { getDetails } from "../../services/utils";
import { typeColor } from "../../constants";
import "./Pokemon.css";

const Pokemon = ({ name, url }) => {
  const [details, setDetails] = useState(null);
  const pokeName = name[0].toUpperCase() + name.slice(1);

  useEffect(() => {
    const fetchDataFromAPI = async (url) => {
      try {
        const result = await getDetails(url);
        setDetails(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromAPI(url);
  }, [url]);

  return details ? (
    <div
      className="card"
      style={{
        background: `radial-gradient(
      circle at 50% 0%, ${
        typeColor[details.types[0].type.name]
      } 36%, #efffff 36%)`,
      }}
    >
      <div className="row">
        <p className="rank">
          <span>Rank</span> {details.order}
        </p>
        <p className="hp">
          <span>HP</span> {details.stats[0].base_stat}
        </p>
      </div>
      <img
        src={details.sprites.other.dream_world.front_default}
        alt={pokeName}
      />
      <h2 className="poke-name">{pokeName}</h2>
      <div className="types">
        {details.types.map((item, index) => (
          <span
            key={index}
            style={{ background: `${typeColor[details.types[0].type.name]}` }}
          >
            {item.type.name}
          </span>
        ))}
      </div>
      <div className="stats">
        <div>
          <h3>{details.stats[1].base_stat}</h3>
          <p>Attack</p>
        </div>

        <div>
          <h3>{details.stats[2].base_stat}</h3>
          <p>Defense</p>
        </div>

        <div>
          <h3>{details.stats[5].base_stat}</h3>
          <p>Speed</p>
        </div>
      </div>
    </div>
  ) : null;
};

export default Pokemon;
