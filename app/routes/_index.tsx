import type { MetaFunction } from "@remix-run/cloudflare";
// eslint-disable-next-line import/no-named-as-default
import styled from "styled-components";

export const meta: MetaFunction = () => {
  return [
    { title: "Welcome to Remix!" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const MainWrapper = styled.div`
  background-color: tomato;
`;

function Index() {
  return (
    <MainWrapper>
      <h1>Welcome to Remix</h1>
      test
    </MainWrapper>
  );
}

export default Index;
