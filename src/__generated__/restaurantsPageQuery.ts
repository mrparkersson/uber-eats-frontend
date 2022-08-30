/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: restaurantsPageQuery
// ====================================================

export interface restaurantsPageQuery_getAllCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  coverImage: string | null;
  slug: string;
  restaurantCount: number;
}

export interface restaurantsPageQuery_getAllCategories {
  __typename: "AllCategoriesOutput";
  ok: boolean;
  error: string | null;
  categories: restaurantsPageQuery_getAllCategories_categories[] | null;
}

export interface restaurantsPageQuery_getAllRestaurants_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface restaurantsPageQuery_getAllRestaurants_restaurants {
  __typename: "Restaurant";
  category: restaurantsPageQuery_getAllRestaurants_restaurants_category | null;
  id: number;
  name: string;
  isPromoted: boolean;
  address: string;
  coverImage: string;
}

export interface restaurantsPageQuery_getAllRestaurants {
  __typename: "RestaurantsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResultsFound: number | null;
  restaurants: restaurantsPageQuery_getAllRestaurants_restaurants[] | null;
}

export interface restaurantsPageQuery {
  getAllCategories: restaurantsPageQuery_getAllCategories;
  getAllRestaurants: restaurantsPageQuery_getAllRestaurants;
}

export interface restaurantsPageQueryVariables {
  input: RestaurantsInput;
}
