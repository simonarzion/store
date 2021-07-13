import React from "react";
import { useEffect } from "react";
import { ImBin2, ImHome, ImPlus, ImShare } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { addToCart, deleteFromCart } from "../redux/actions/CartAction";

// HEADER STYLES

const HeaderStyled = styled.header`
  background-color: #ef767a;
  padding: 20px 0;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
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

// CARDS STYLES

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  width: 90%;
`;

const ProductCardStyled = styled.div`
  margin: 20px auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductCardInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-left: 20px;

  @media screen and (max-width: 768px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const ProductImgContainer = styled.div`
  flex: 1;
`;

const ProductImgStyled = styled.img`
  width: 70px;
  height: 70px;
`;

const ProductContent = styled.div``;

const ProductTitle = styled.h3``;

const ProductPrice = styled.div`
  font-weight: 300;
`;

const ProductQuantity = styled.div`
  font-weight: 300;
`;

const ProductActions = styled.div`
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;

const ActionIButton = styled.button`
  border: none;
  margin: 10px;
  margin-left: 0;
  cursor: pointer;
  background-color: transparent;
  font-size: 1rem;

  @media screen and (max-width: 768px) {
    width: 100%;
    background-color: #ef767a;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0;

    svg {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  // taken from https://javascript.plainenglish.io/the-easy-way-to-create-a-unique-array-of-json-objects-in-javascript-5634254b17aa
  const str = [...new Set(cart.map(JSON.stringify))];
  const reducedCart = str.map(JSON.parse);

  let totalPrice;

  const calculatePrices = () => {
    const prices = [];
    cart.forEach((item) => {
      prices.push(item.price);
    });

    if (prices.length > 0) {
      totalPrice = parseInt(prices.reduce((a, b) => a + b));
    }
  };

  calculatePrices();

  const handleDeleteProduct = (prod) => {
    const newProducts = cart.filter((product) => prod.title !== product.title);

    dispatch(deleteFromCart(newProducts));
  };

  return (
    <>
      <HeaderStyled>
        <HeaderInnerStyled>
          <Link to="/">
            <HeaderTitle>
              <ImHome />
              Home
            </HeaderTitle>
          </Link>
        </HeaderInnerStyled>
      </HeaderStyled>

      <Container>
        {reducedCart.map((prod, index) => {
          const { id, title, price, image } = prod;
          const qty = cart.filter((c) => {
            return c.id === id;
          });

          return (
            <ProductCardStyled key={id}>
              <ProductImgContainer>
                <ProductImgStyled src={image} alt={title} />
              </ProductImgContainer>

              <ProductCardInner>
                <ProductContent>
                  <ProductTitle>{title}</ProductTitle>
                  <ProductQuantity>Quantity: {qty.length}</ProductQuantity>
                  <ProductPrice>${price}</ProductPrice>
                </ProductContent>

                <ProductActions>
                  <ActionIButton onClick={() => dispatch(addToCart(prod))}>
                    <ImPlus />
                  </ActionIButton>

                  <ActionIButton>
                    <Link to={`product/${id}`}>
                      <ImShare />
                    </Link>
                  </ActionIButton>

                  <ActionIButton onClick={() => handleDeleteProduct(prod)}>
                    <ImBin2 />
                  </ActionIButton>
                </ProductActions>
              </ProductCardInner>
            </ProductCardStyled>
          );
        })}
        {cart.length > 0 ? <div>Total Price: ${totalPrice}</div> : ""}
      </Container>
    </>
  );
};

export default CartPage;
