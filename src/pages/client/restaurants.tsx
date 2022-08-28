import { gql, useQuery } from '@apollo/client';
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from '../../__generated__/restaurantsPageQuery';

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: RestaurantsInput!) {
    getAllCategories {
      ok
      error
      categories {
        id
        name
        coverImage
        slug
        restaurantCount
      }
    }

    getAllRestaurants(input: $input) {
      ok
      error
      totalPages
      totalResultsFound
      restaurants {
        id
        name
        isPromoted
        address
        coverImage
      }
    }
  }
`;

const Restaurants = () => {
  const { data, loading, error } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });

  return (
    <div>
      <form className=" bg-gray-800 w-full py-40 flex items-center justify-center">
        <input
          className="bg-gray-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-600 py-3 px-5  rounded-md w-3/12 "
          type="search"
          placeholder="Search restaurants..."
        />
      </form>
      {!loading && (
        <div className="max-w-screen-xl mx-auto mt-8">
          {/* categories container */}
          <div className=" flex  justify-around max-w-xs mx-auto">
            {data?.getAllCategories.categories?.map((category) => (
              <div className=" flex flex-col items-center gap-2 group  cursor-pointer">
                <div
                  key={category.name}
                  className=" w-14 h-14 bg-cover group-hover:bg-gray-100 rounded-full"
                  style={{ backgroundImage: `url(${category.coverImage})` }}
                ></div>
                <span className=" text-sm font-medium">{category.name}</span>
              </div>
            ))}
          </div>
          {/* Restaurants Container  */}
          <div className=" grid grid-cols-3 gap-7 mt-8">
            {data?.getAllRestaurants.restaurants?.map((restaurant, index) => (
              <div key={index}>
                <div
                  style={{ backgroundImage: `url(${restaurant.coverImage})` }}
                  className=" py-32 bg-cover"
                ></div>
                <h3>{restaurant.name}</h3>
              </div>
            ))}
          </div>
          {/* Restaurants Container */}
        </div>
      )}
    </div>
  );
};

export default Restaurants;
