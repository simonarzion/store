import React from "react";
import { ImHome } from "react-icons/im";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Cart from "./Cart";

const HeaderStyled = styled.header`
  background-color: #ef767a;
  padding: 20px 0;
  box-shadow: 0px 0px 10px #00000086;
  z-index: 1000;
  width: 100%;
  margin-bottom: 20px;
`;

const HeaderInnerStyled = styled.div`
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
`;

const HeaderTitle = styled.h4`
  color: #000;
  text-decoration: none;
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const Header = () => {
  return (
    <HeaderStyled>
      <HeaderInnerStyled>
        <Link to="/" style={{ textDecoration: "none" }}>
          <HeaderTitle>
            <ImHome />
            Home
          </HeaderTitle>
        </Link>

        <Cart />
      </HeaderInnerStyled>
    </HeaderStyled>
  );
};

export default Header;
