import { Link } from 'react-router-dom';

interface RestaurantProps {
  coverImage: string;
  name: string;
  categoryName?: string;
  id: string;
}

const RestaurantContainer: React.FC<RestaurantProps> = ({
  coverImage,
  name,
  categoryName,
  id,
}) => {
  return (
    <Link to={`/restaurant/${id}`}>
      <div>
        <div
          style={{ backgroundImage: `url(${coverImage})` }}
          className=" py-28 bg-cover mb-3 "
        ></div>
        <h3 className=" text-lg ">{name}</h3>
        <span className=" border-t mt-3 py-2 text-xs opacity-50 border-gray-400">
          {categoryName}
        </span>
      </div>
    </Link>
  );
};

export default RestaurantContainer;
