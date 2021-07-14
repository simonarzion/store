import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { filterCategory, sortProducts } from "../redux/actions/ProductsAction";

const SelectStyled = styled.select`
  padding: 5px;
`;

const OptionStyled = styled.option`
  text-transform: capitalize;
`;

const Filters = () => {
  const products = useSelector((state) => state.products.products);
  const productsFiltered = useSelector((state) => state.productsFiltered.products);
  const dispatch = useDispatch();

  const categorys = [...new Set(products.map((prod) => prod.category))];

  const handleChange = (e) => {
    const prodsFiltered = products.filter((prod) => {
      if (e.target.value === "all") {
        return prod;
      }
      return prod.category === e.target.value;
    });
    dispatch(filterCategory(prodsFiltered));
  };

  const handleSortProducts = (e) => {
    if ((e.target.value = "asc")) {
      const sortAscending = productsFiltered.sort((a, b) => a.price - b.price);
      return dispatch(sortProducts(sortAscending));
    } else {
      const sortDescending = productsFiltered.sort((a, b) => a.price - b.price).reverse();
      return dispatch(sortProducts(sortDescending));
    }
  };

  return (
    <>
      <SelectStyled onChange={handleChange}>
        <OptionStyled value="all">All</OptionStyled>
        {categorys.map((category, index) => {
          return (
            <OptionStyled key={index} value={category}>
              {category}
            </OptionStyled>
          );
        })}
      </SelectStyled>

      <SelectStyled onChange={handleSortProducts}>
        <OptionStyled value="asc">asc</OptionStyled>
        <OptionStyled value="desc">desc</OptionStyled>
      </SelectStyled>
    </>
  );
};

export default Filters;
