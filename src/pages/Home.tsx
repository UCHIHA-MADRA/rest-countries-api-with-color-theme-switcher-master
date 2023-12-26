import { Fragment, useEffect, useState } from "react";
import httpClient from "../utils/http_client";
import { Country } from "../types/Country";
import Card from "../components/Card";

export default function Home() {
  const [data, setData] = useState<Country[]>([]);
  const [query, setQuery] = useState<string>("");
  const [region, setRegion] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegionSelect = (args: string) => setRegion(args);

  useEffect(() => {
    const getCountries = async () => {
      try {
        setLoading(true);
        const res = await httpClient.get("/all");
        const data = res.data;
        setData(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    getCountries();
  }, []);

  return loading ? (
    <Fragment>
      <div className="h-screen w-full flex items-center justify-center">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <main className="font-default text-center text-9xl font-bold bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400 text-transparent bg-clip-text">
        Hello world!
      </main>

      <div className="my-12 px-6 flex flex-col gap-3 md:flex-row md:gap-0 md:justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search..."
          className="input input-bordered w-full md:max-w-xs lg:max-w-md"
        />
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 ml-[calc(100%-133px-24px)] md:ml-0"
          >
            Filter By Region
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <span onClick={() => handleRegionSelect("all")}>All</span>
            </li>
            <li>
              <span onClick={() => handleRegionSelect("Africa")}>Africa</span>
            </li>
            <li>
              <span onClick={() => handleRegionSelect("America")}>America</span>
            </li>
            <li>
              <span onClick={() => handleRegionSelect("Asia")}>Asia</span>
            </li>
            <li>
              <span onClick={() => handleRegionSelect("Europe")}>Europe</span>
            </li>
            <li>
              <span onClick={() => handleRegionSelect("Oceania")}>Oceania</span>
            </li>
          </ul>
        </div>
      </div>

      {data && data.length <= 0 ? (
        <Fragment>No Data Available</Fragment>
      ) : (
        <div className="my-12 grid grid-cols-1 gap-6 px-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data
            .filter((item) =>
              item.name.official.toLowerCase().includes(query.toLowerCase())
            )
            .filter((item) =>
              region === "all" ? true : item.region === region
            )
            .map((country, idx) => {
              return <Card key={idx} country={country} />;
            })}
        </div>
      )}
    </Fragment>
  );
}
