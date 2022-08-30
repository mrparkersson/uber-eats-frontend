/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategoryInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: findCategoryBySlug
// ====================================================

export interface findCategoryBySlug_findCategoryBySlug_category_restaurants {
  __typename: "Restaurant";
  name: string;
}

export interface findCategoryBySlug_findCategoryBySlug_category {
  __typename: "Category";
  name: string;
  coverImage: string | null;
  slug: string;
  restaurants: findCategoryBySlug_findCategoryBySlug_category_restaurants[];
}

export interface findCategoryBySlug_findCategoryBySlug {
  __typename: "CategoryOutPut";
  totalPages: number | null;
  totalResultsFound: number | null;
  category: findCategoryBySlug_findCategoryBySlug_category | null;
}

export interface findCategoryBySlug {
  findCategoryBySlug: findCategoryBySlug_findCategoryBySlug;
}

export interface findCategoryBySlugVariables {
  input: CategoryInput;
}
