import React from "react";
import { Country } from "../types/Country";
import { Link } from "react-router-dom";

type CardProps = {
  country: Country;
};

const Card: React.FC<CardProps> = (props): React.ReactElement => {
  const { country } = props;
  return (
    <div className="shadow-lg rounded-md w-full bg-white overflow-hidden">
      <div>
        <Link to={"/details?country=" + country.name.official}>
          <img src={country.flags.png} alt={country.flags.alt} width={"100%"} />
        </Link>
      </div>
      <div className="p-4">
        <h1 className="text-xl font-bold">{country.name.official}</h1>

        <div className="mt-6 flex flex-col">
          <span>
            <span className="font-bold">Population:</span>{" "}
            {new Intl.NumberFormat("en-IN", {}).format(country.population)}
          </span>
          <span>
            <span className="font-bold">Region:</span> {country.region}
          </span>
          <span>
            <span className="font-bold">Capital:</span> {country.capital}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
