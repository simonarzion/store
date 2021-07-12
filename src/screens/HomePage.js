import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions/ProductsAction";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/actions/CartAction";
import Header from "../components/Header";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  width: 90%;
`;

const ProductContainerStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: auto;
  grid-gap: 20px;
`;

const ProductCardStyled = styled.div`
  box-shadow: 0 0 10px #00000029;
  transition: all 0.3s ease;

  :hover {
    transform: scale(1.01);
  }
`;

const ProductImgStyled = styled.img`
  width: 100%;
  height: 250px;
  object-fit: fill;
`;

const ProductContent = styled.div`
  padding: 10px;
`;

const ProductTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductTitle = styled.h3`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const ProductPrice = styled.span`
  color: #ef767a;
`;

const ProductCategory = styled.h5`
  text-transform: capitalize;
  font-weight: 100;
  padding: 10px 0;
`;

const AddToCartBtn = styled.button`
  padding: 10px 30px;
  background-color: #ef767a;
  border: none;
  color: #fff;
  text-transform: uppercase;
  margin: 10px;
  cursor: pointer;
  transition: background 0.3s ease;

  :hover {
    background-color: #f0595e;
  }
`;

const HomePage = () => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const res = await axios.get("https://fakestoreapi.com/products");
    dispatch(setProducts(res.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <ProductContainerStyled>
          {products.map((product) => {
            const { id, title, price, image, category } = product;

            return (
              <ProductCardStyled key={id}>
                <Link to={`product/${id}`}>
                  <ProductImgStyled src={image} alt={title} />

                  <ProductContent>
                    <ProductCategory>{category}</ProductCategory>
                    <ProductTitleContainer>
                      <ProductTitle>{title}</ProductTitle>
                      <ProductPrice>${price}</ProductPrice>
                    </ProductTitleContainer>
                  </ProductContent>
                </Link>

                <AddToCartBtn onClick={() => dispatch(addToCart(product))}>Add To Cart</AddToCartBtn>
              </ProductCardStyled>
            );
          })}
        </ProductContainerStyled>
      </Container>
    </>
  );
};

export default HomePage;
