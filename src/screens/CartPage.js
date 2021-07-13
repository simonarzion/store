import React from "react";
import { ImBin2, ImHome, ImPlus } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { addToCart, deleteFromCart } from "../redux/actions/CartAction";

// HEADER STYLES

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

// CARDS STYLES

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  width: 90%;
`;

const ProductCardStyled = styled.div`
  margin: 20px auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductCardInner = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  gap: 10px;
`;

const ProductImgStyled = styled.img`
  width: 35px;
  height: 70px;
`;

const ProductContent = styled.div`
  width: 100%;
`;

const ProductTitle = styled.h3``;

const ProductPrice = styled.div`
  font-weight: 300;
`;

const ProductQuantity = styled.div`
  font-weight: 300;
`;

const ProductActions = styled.div`
  text-align: right;
`;

const ActionIButton = styled.button`
  border: none;
  margin: 10px;
  cursor: pointer;
  background-color: transparent;
  font-size: 1rem;
`;

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const reducedCart = [...new Set(cart)];

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
            <ProductCardStyled>
              <Link to={`product/${id}`} key={id}>
                <ProductCardInner>
                  <ProductImgStyled style={{ width: "100px" }} src={image} alt={title} />

                  <ProductContent>
                    <ProductTitle>{title}</ProductTitle>
                    <ProductQuantity>Quantity: {qty.length}</ProductQuantity>
                    <ProductPrice>${price}</ProductPrice>
                  </ProductContent>
                </ProductCardInner>
              </Link>

              <ProductActions>
                <ActionIButton onClick={() => dispatch(addToCart(prod))}>
                  <ImPlus />
                </ActionIButton>

                <ActionIButton onClick={() => handleDeleteProduct(prod)}>
                  <ImBin2 />
                </ActionIButton>
              </ProductActions>
            </ProductCardStyled>
          );
        })}
        {cart.length > 0 ? <div>Total Price: ${totalPrice}</div> : ""}
      </Container>
    </>
  );
};

export default CartPage;
