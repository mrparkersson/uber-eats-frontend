import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import RestaurantContainer from '../../components/restaurant-container';
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from '../../__generated__/restaurantsPageQuery';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

interface ISearchFormProps {
  searchTerm: string;
}

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
        category {
          name
        }
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
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });

  const { register, handleSubmit, getValues } = useForm<ISearchFormProps>();
  const navigate = useNavigate();
  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    navigate({
      pathname: '/search',
      search: `?term=${searchTerm}`,
    });
  };

  return (
    <div>
      <Helmet>
        <title>Home | Uber Clone</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSearchSubmit)}
        className=" bg-gray-800 w-full py-40 flex items-center justify-center"
      >
        <input
          {...register('searchTerm', { required: true, min: 3 })}
          className="bg-gray-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-600 py-3 px-5 w-3/4  rounded-md md:w-3/12 "
          type="Search"
          placeholder="Search restaurants..."
          name="searchTerm"
        />
      </form>
      {!loading && (
        <div className="max-w-screen-xl mx-auto pb-20 mt-8">
          {/* categories container */}
          <div className=" flex  justify-around max-w-xs mx-auto">
            {data?.getAllCategories.categories?.map((category) => (
              <Link to={`/category/${category.slug}`} key={category.id}>
                <div className=" flex flex-col items-center gap-x-5 gap-y-2 group  cursor-pointer">
                  <div
                    className=" w-14 h-14 bg-cover group-hover:bg-gray-100 rounded-full"
                    style={{ backgroundImage: `url(${category.coverImage})` }}
                  ></div>
                  <span className=" text-sm font-medium">{category.name}</span>
                </div>
              </Link>
            ))}
          </div>
          {/* Restaurants Container  */}
          <div className=" grid md:grid-cols-3 gap-7 mt-8 ">
            {data?.getAllRestaurants.restaurants?.map((restaurant) => (
              <RestaurantContainer
                id={restaurant.id + ''}
                key={restaurant.id}
                // categoryName={restaurant?.category.name}
                coverImage={restaurant.coverImage}
                name={restaurant.name}
              />
            ))}
          </div>
          {/* Restaurants Container */}
          <div className=" flex justify-center items-center mt-10">
            {page > 1 && (
              <button
                className=" font-medium text-2xl"
                onClick={() => {
                  setPage((page) => page - 1);
                }}
              >
                &larr;
              </button>
            )}

            <span className=" mx-5">
              Page {page} of {data?.getAllRestaurants.totalPages}
            </span>

            {page !== data?.getAllRestaurants.totalPages && (
              <button
                className=" focus-outline-none font-medium text-2xl"
                onClick={() => {
                  setPage((page) => page + 1);
                }}
              >
                &rarr;
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
