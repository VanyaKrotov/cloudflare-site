import { type MetaFunction } from "@remix-run/cloudflare";

function Landing() {
  return (
    <main>
      <h1>Landing</h1>
    </main>
  );
}

export default Landing;

export const meta: MetaFunction = () => {
  return [
    { title: "Welcome to Remix example" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
