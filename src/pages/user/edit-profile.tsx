import { useForm } from 'react-hook-form';
import Button from '../../components/button';
import { meQuery } from '../../__generated__/meQuery';

interface EditProfileProps {
  currentuser: meQuery;
}

interface EditProfileFormParams {
  email?: string;
  password?: string;
}

const EditProfile: React.FC<EditProfileProps> = ({ currentuser }) => {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm<EditProfileFormParams>();
  return (
    <div className=" mt-52 flex flex-col justify-center items-center">
      <h4 className=" font-semibold text-2xl mb-3">Edit Profile</h4>
      <form className=" grid gap-3 mt-5 w-full mb-5 max-w-screen-sm">
        <input
          className="bg-gray-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-600 py-3 px-5 rounded-lg"
          type="email"
          placeholder="Email"
        />
        <input
          className="bg-gray-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-600 py-3 px-5 rounded-lg"
          type="password"
          placeholder="Password"
        />
        <Button loading={false} actionText="Save Changes" canClick={true} />
      </form>
    </div>
  );
};

export default EditProfile;
