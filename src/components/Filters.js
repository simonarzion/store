import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { filterCategory, sortProducts } from "../redux/actions/ProductsAction";

const SelectStyled = styled.select`
  text-transform: capitalize;
  padding: 5px;
`;

const OptionStyled = styled.option`
  text-transform: capitalize;
`;

const ButtonStyled = styled.button`
  text-transform: capitalize;
  padding: 5px;
`;
const Filters = () => {
  const products = useSelector((state) => state.products.products);
  const productsFiltered = useSelector((state) => state.productsFiltered.products);
  const dispatch = useDispatch();
  const [sortOrder, setSortOrder] = useState(null);

  const categorys = [...new Set(products.map((prod) => prod.category))];

  const handleChange = (e) => {
    if (e.target.value === "") return;
    const prodsFiltered = products.filter((prod) => {
      if (e.target.value === "all") {
        return prod;
      }

      return prod.category === e.target.value;
    });
    dispatch(filterCategory(prodsFiltered));
    setSortOrder(null);
  };

  const handleSortProducts = (e) => {
    setSortOrder(!sortOrder);

    if (sortOrder) {
      const sortAscending = productsFiltered.sort((a, b) => a.price - b.price);
      dispatch(sortProducts([...sortAscending]));
    } else {
      const sortDescending = productsFiltered.sort((a, b) => b.price - a.price);
      dispatch(sortProducts([...sortDescending]));
    }
  };

  return (
    <>
      <SelectStyled onChange={handleChange}>
        <OptionStyled value="">-- Filter by --</OptionStyled>
        <OptionStyled value="all">All</OptionStyled>
        {categorys.map((category, index) => {
          return (
            <OptionStyled key={index} value={category}>
              {category}
            </OptionStyled>
          );
        })}
      </SelectStyled>

      {/* <SelectStyled onChange={handleSortProducts}>
        <OptionStyled value="">-- Sort by --</OptionStyled>

        <OptionStyled value="asc">Ascending</OptionStyled>
        <OptionStyled value="desc">Descending</OptionStyled>
      </SelectStyled> */}

      <ButtonStyled onClick={handleSortProducts}>Sort by: {sortOrder ? "asc" : "desc"}</ButtonStyled>
      {/* <button onClick={sortAsc}>sortAsc</button>
      <button onClick={sortDesc}>sortDesc</button> */}
    </>
  );
};

export default Filters;
