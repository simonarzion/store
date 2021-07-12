import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ImCart } from "react-icons/im";

const CartStyled = styled.div`
  position: relative;
  color: #fff;

  svg {
    font-size: 1.3rem;
  }
`;

const CartItemsStyled = styled.span`
  position: absolute;
  top: -10px;
  padding: 0 6px;
  right: -15px;
  background-color: #fff;
  border-radius: 50%;
  font-weight: 700;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <Link to="/cart" style={{ textDecoration: "none" }}>
      <CartStyled>
        <ImCart />
        <CartItemsStyled>{cart.length}</CartItemsStyled>
      </CartStyled>
    </Link>
  );
};

export default Cart;
