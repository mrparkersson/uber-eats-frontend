import { gql, useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  searchRestaurantByName,
  searchRestaurantByNameVariables,
} from '../../__generated__/searchRestaurantByName';

const SEARCH_RESTAURANT = gql`
  query searchRestaurantByName($input: SearchRestaurantInput!) {
    searchRestaurantByName(input: $input) {
      ok
      totalPages
      totalResultsFound
      restaurants {
        id
        name
        coverImage
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [queryReadyToStart, { loading, data }] = useLazyQuery<
    searchRestaurantByName,
    searchRestaurantByNameVariables
  >(SEARCH_RESTAURANT);
  useEffect(() => {
    const [__, search] = location.search.split('?term=');
    if (!search) {
      navigate('/');
    }

    queryReadyToStart({
      variables: {
        input: {
          page: 1,
          search,
        },
      },
    });
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {data?.searchRestaurantByName.restaurants?.map((restaurant) => {
        return (
          <div
            key={restaurant.id}
            className=" flex flex-col justify-center items-center"
          >
            <h1>{restaurant.name}</h1>
            <img
              src={restaurant.coverImage}
              alt="restaurant"
              className=" w-64"
            />
          </div>
        );
      })}
    </div>
  );
};

export default Search;
