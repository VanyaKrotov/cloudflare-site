import { LoaderFunction, MetaFunction, json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { ASSETS_MOCK } from "~/constants/assets";

const Contacts = () => {
  const data = useLoaderData<{ name: string; id: number } | null>();

  console.log(data);

  if (!data) {
    return <main>not found asset</main>;
  }

  return (
    <main>
      <h1>{data.name}</h1>
      <p>Description</p>
      <button onClick={() => console.log("click")}>
        button text <a href="/">link to landing</a>
      </button>
    </main>
  );
};

export const loader: LoaderFunction = ({ params: { id } }) => {
  const assetId = Number(id);

  const asset = ASSETS_MOCK.find((asset) => asset.id === assetId);

  return asset ? json(asset) : null;
};

export const meta: MetaFunction<{ name: string; id: number } | null> = ({
  data,
}) => {
  return [{ title: data?.name || "Not found asset" }];
};

export default Contacts;
