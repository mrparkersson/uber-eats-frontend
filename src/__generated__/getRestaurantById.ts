/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getRestaurantById
// ====================================================

export interface getRestaurantById_getRestaurantById_restaurant {
  __typename: "Restaurant";
  name: string;
  address: string;
  coverImage: string;
}

export interface getRestaurantById_getRestaurantById {
  __typename: "RestaurantOutput";
  ok: boolean;
  error: string | null;
  restaurant: getRestaurantById_getRestaurantById_restaurant | null;
}

export interface getRestaurantById {
  getRestaurantById: getRestaurantById_getRestaurantById;
}

export interface getRestaurantByIdVariables {
  input: RestaurantInput;
}
