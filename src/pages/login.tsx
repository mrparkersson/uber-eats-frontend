import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';
import {
  loginMutation,
  loginMutationVariables,
} from '../__generated__/loginMutation';
import uberEatsLogo from '../images/logo.svg';
import Button from '../components/button';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { isLoggedInVar } from '..';

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
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ILoginForm>({
    mode: 'onChange',
  });

  const onCompleted = (data: loginMutation) => {
    const {
      login: { error, ok, token },
    } = data;
    if (ok) {
      console.log(token);
      isLoggedInVar(true);
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
      <Helmet>
        <title>Login | Uber Clone</title>
      </Helmet>
      <div className=" w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img
          src={uberEatsLogo}
          alt="logo for uber eats"
          className=" w-52 mb-10"
        />
        <h4 className="w-full text-left text-2xl mb-5 font-medium">
          Welcome back
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full"
        >
          <input
            {...register('email', {
              required: true,
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            type="email"
            name="email"
            required
            placeholder="Email"
            className=" bg-gray-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-600 py-3 px-5 rounded-lg"
          />
          {errors.email?.type === 'pattern' && (
            <FormError errorMessage={'Please enter a valid email'} />
          )}

          <input
            {...register('password', { required: true, minLength: 8 })}
            type="password"
            name="password"
            required
            placeholder="Password"
            className=" bg-gray-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-600 py-3 px-5 rounded-lg"
          />
          {errors.password?.type === 'minLength' && (
            <FormError errorMessage="Password is required" />
          )}
          <Button canClick={isValid} loading={loading} actionText="Log In" />

          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        <div className=" mt-4">
          New User? {}
          <Link to="/sign-up" className=" text-green-500 hover:underline">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
