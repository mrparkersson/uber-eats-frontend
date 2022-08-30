import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getRestaurantById,
  getRestaurantByIdVariables,
} from '../../__generated__/getRestaurantById';

interface RestaurantId {
  id: number;
}

const GET_RESTAURANT_BY_NAME = gql`
  query getRestaurantById($input: RestaurantInput!) {
    getRestaurantById(input: $input) {
      ok
      error
      restaurant {
        name
        address
        coverImage
      }
    }
  }
`;

const RestaurantContainer = () => {
  const params = useParams();

  const { data } = useQuery<getRestaurantById, getRestaurantByIdVariables>(
    GET_RESTAURANT_BY_NAME,
    {
      variables: {
        input: {
          restaurantId: Number(params.id),
        },
      },
    }
  );

  console.log(data);

  return (
    <div className=" flex flex-col justify-center items-center">
      <h1>{data?.getRestaurantById.restaurant?.name}</h1>
      <img
        src={data?.getRestaurantById.restaurant?.coverImage}
        alt="restaurant"
        className=" w-64"
      />
    </div>
  );
};

export default RestaurantContainer;
