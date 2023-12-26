import { useState, useEffect, Fragment } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Country } from "../types/Country";
import httpClient from "../utils/http_client";

const Details = () => {
  const foo = useSearchParams();
  const navigate = useNavigate();
  const countryName = foo[0].get("country");

  const [data, setData] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const country = data?.[0];

  const handleBack = () => navigate("/");

  useEffect(() => {
    const getCountry = async () => {
      try {
        setLoading(true);
        const res = await httpClient.get(`/name/${countryName}?fullText=true`);
        const data = res.data;
        setData(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    getCountry();
  }, []);

  return (
    <Fragment>
      {!countryName ? (
        <>Country Name not Available</>
      ) : loading ? (
        <div className="h-screen w-full flex items-center justify-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : data && data.length > 0 ? (
        <main className="p-6">
          <div className="mb-12">
            <button onClick={handleBack} className="btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                />
              </svg>
              Back
            </button>
          </div>
          <div>
            <div>
              <div className="max-w-md">
                <img
                  src={country.flags.png}
                  alt={country.flags.alt}
                  width={"100%"}
                />
              </div>
            </div>
            <div className="p-4">
              <h1 className="text-xl font-bold">{country.name.official}</h1>

              <div className="mt-6 flex flex-col">
                <span>
                  <span className="font-bold">Population:</span>{" "}
                  {new Intl.NumberFormat("en-IN", {}).format(
                    country.population
                  )}
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
        </main>
      ) : (
        <>Data not found</>
      )}
    </Fragment>
  );
};

export default Details;
