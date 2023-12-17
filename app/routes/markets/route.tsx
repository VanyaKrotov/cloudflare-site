import { json } from "@remix-run/cloudflare";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { ASSETS_MOCK } from "~/constants/assets";

const Markets = () => {
  const [search, setSearch] = useSearchParams();
  const query = search.get("query") || "";
  const data = useLoaderData<typeof ASSETS_MOCK>();

  return (
    <main>
      <h1>Markets</h1>
      <div>
        <input
          placeholder="search"
          value={query}
          onChange={(event) => {
            setSearch(
              (p) => {
                p.set("query", event.target.value);

                return new URLSearchParams(p);
              },
              { replace: true }
            );
          }}
        />
      </div>
      <ul>
        {data
          .filter((asset) => !query || asset.name.toLowerCase().includes(query))
          .map(({ id, name }) => (
            <li key={id}>
              <Link to={`/market/${id}`}>{name}</Link>
            </li>
          ))}
      </ul>
    </main>
  );
};

export const loader = async () => {
  return json(ASSETS_MOCK);
};

export const meta = () => [{ title: "Markets" }];

export default Markets;
