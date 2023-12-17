import { Link } from "@remix-run/react";
import styled from "styled-components";

const Wrapper = styled.header`
  height: 60px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 32px;
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const StyledLink = styled(Link)`
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
`;

const Header = () => {
  return (
    <Wrapper>
      <StyledLink to="/">logo</StyledLink>
      <Links>
        <StyledLink to="/markets">markets</StyledLink>
        <StyledLink to="/buy-crypto">buy crypto</StyledLink>
      </Links>
    </Wrapper>
  );
};

export default Header;
