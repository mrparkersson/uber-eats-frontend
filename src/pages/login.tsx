import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';

const LOGIN_MUTATION = gql`
  mutation PotatoMutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      ok
      token
      error
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginForm>();

  const [loginMutation] = useMutation(LOGIN_MUTATION);

  const onSubmit = () => {
    const { email, password } = getValues();
    loginMutation({
      variables: {
        email,
        password,
      },
    });
  };

  return (
    <div className=" h-screen flex items-center justify-center bg-gray-800">
      <div className=" bg-white w-full max-w-lg pt-10 pb-7 rounded-lg text-center">
        <h3 className=" text-3xl text-gray-800">Log In</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 px-5"
        >
          <input
            {...register('email', { required: true })}
            type="email"
            name="email"
            required
            placeholder="Email"
            className=" bg-gray-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-600 py-3 px-5 rounded-lg"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}

          <input
            {...register('password', { required: true })}
            type="password"
            name="password"
            required
            placeholder="Password"
            className=" bg-gray-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-600 py-3 px-5 rounded-lg"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === 'minLength' && (
            <FormError errorMessage="Password must be more than 10 characters" />
          )}
          <button className=" py-3 px-5 bg-gray-800 text-white mt-3 text-lg rounded-lg focus:outline-none hover:opacity-90">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
