import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCategory, setProducts } from "../redux/actions/ProductsAction";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/actions/CartAction";
import Header from "../components/Header";
import styled from "styled-components";
import { useState } from "react";
import Loading from "../components/Loading";
import Filters from "../components/Filters";

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
  margin: 20px 0;

  &.loading {
    grid-template-columns: 1fr;
  }
`;

const ProductCardStyled = styled.div`
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  :hover {
    transform: scale(1.01);
  }
`;

const ProductImgStyled = styled.img`
  width: 100%;
  height: 250px;
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
  const productsFiltered = useSelector((state) => state.productsFiltered.products);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("https://fakestoreapi.com/products").catch((err) => console.log(err));
      dispatch(setProducts(res.data));
      dispatch(filterCategory(res.data));
      setLoading(false);
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container>
        <Filters />
        <ProductContainerStyled className={loading ? "loading" : ""}>
          {!loading ? (
            productsFiltered.map((product) => {
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
            })
          ) : (
            <Loading />
          )}
        </ProductContainerStyled>
      </Container>
    </>
  );
};

export default HomePage;
