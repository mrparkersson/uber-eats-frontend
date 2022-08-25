interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

const Button: React.FC<IButtonProps> = ({ canClick, loading, actionText }) => {
  return (
    <button
      className={` py-3 px-5  text-white mt-3 text-lg rounded-lg focus:outline-none  transition-colors ${
        canClick
          ? 'hover:opacity-90 bg-gray-800'
          : ' bg-gray-300 pointer-events-none'
      } `}
    >
      {loading ? 'Loading...' : actionText}
    </button>
  );
};

export default Button;
