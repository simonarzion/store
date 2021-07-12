import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../redux/actions/CartAction";
import { removeSelectedProduct, setSelectedProduct } from "../redux/actions/ProductsAction";
import Header from "../components/Header";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  width: 90%;
`;

const ProductCardStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 50px;
  margin: auto;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProductImgContainer = styled.div`
  flex: 1;
`;

const ProductImgStyled = styled.img`
  width: 100%;
  height: 400px;
  object-fit: fill;
`;

const ProductContent = styled.div`
  flex: 1;
`;

const ProductTitle = styled.h3`
  font-size: 1.7rem;
`;

const AddToCartBtn = styled.button`
  padding: 10px 30px;
  background-color: #ef767a;
  border: none;
  color: #fff;
  text-transform: uppercase;
  margin-top: 10px;
  cursor: pointer;
  transition: background 0.3s ease;

  :hover {
    background-color: #f0595e;
  }
`;

const ProductPrice = styled.span`
  font-weight: 900;
  font-size: 1.5rem;
`;

const ProductDescription = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  padding: 20px 0;
`;

const ProductPage = () => {
  const productId = useParams();
  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();

  const fetchSelectedProduct = async () => {
    const res = await axios.get(`https://fakestoreapi.com/products/${productId.id}`);
    dispatch(setSelectedProduct(res.data));
  };

  useEffect(() => {
    fetchSelectedProduct();
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, []);

  return (
    <>
      <Header />
      <Container>
        {product ? (
          <ProductCardStyled>
            <ProductImgContainer>
              <ProductImgStyled src={product.image} alt={product.title} />
            </ProductImgContainer>

            <ProductContent>
              <ProductTitle>{product.title}</ProductTitle>
              <ProductDescription>{product.description}</ProductDescription>
              <div>
                <ProductPrice>${product.price}</ProductPrice>
              </div>
              <AddToCartBtn onClick={() => dispatch(addToCart(product))}>Add To Cart</AddToCartBtn>
            </ProductContent>
          </ProductCardStyled>
        ) : (
          <div>loading...</div>
        )}
      </Container>
    </>
  );
};

export default ProductPage;
