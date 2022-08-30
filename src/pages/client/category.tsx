import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import {
  findCategoryBySlug,
  findCategoryBySlugVariables,
} from '../../__generated__/findCategoryBySlug';

const FIND_CATEGORY_BY_SLUG_MUTATION = gql`
  query findCategoryBySlug($input: CategoryInput!) {
    findCategoryBySlug(input: $input) {
      totalPages
      totalResultsFound
      category {
        name
        coverImage
        slug
        restaurants {
          name
        }
      }
    }
  }
`;

const CategoryContainer = () => {
  const params = useParams();
  const { data, loading, error } = useQuery<
    findCategoryBySlug,
    findCategoryBySlugVariables
  >(FIND_CATEGORY_BY_SLUG_MUTATION, {
    variables: {
      input: {
        page: 1,
        slug: params.slug + '',
      },
    },
  });

  return (
    <div>
      <div
        className="  bg-cover group-hover:bg-gray-100 "
        style={{
          backgroundImage: `url(${data?.findCategoryBySlug.category?.coverImage})`,
        }}
      ></div>
    </div>
  );
};

export default CategoryContainer;
