import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';
import {
  loginMutation,
  loginMutationVariables,
} from '../__generated__/loginMutation';
import uberEatsLogo from '../images/logo.svg';

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginAccountInput: LoginAccountInput!) {
    login(input: $loginAccountInput) {
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

  const onCompleted = (data: loginMutation) => {
    const {
      login: { error, ok, token },
    } = data;
    if (ok) {
      console.log(token);
    }
  };

  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginAccountInput: {
            email,
            password,
          },
        },
      });
    }
  };

  return (
    <div className=" h-screen flex items-center flex-col mt-10 lg:mt-28">
      <div className=" w-full max-w-screen-sm flex flex-col items-center">
        <img
          src={uberEatsLogo}
          alt="logo for uber eats"
          className=" w-52 mb-5"
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 px-5 w-full"
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
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
