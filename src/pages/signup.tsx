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

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

const SignUp = () => {
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ILoginForm>({
    mode: 'onChange',
  });

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT_MUTATION);

  const onSubmit = () => {};

  return (
    <div className=" h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>SignUp | Uber Clone</title>
      </Helmet>
      <div className=" w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img
          src={uberEatsLogo}
          alt="logo for uber eats"
          className=" w-52 mb-10"
        />
        <h4 className="w-full text-left text-2xl mb-5 font-medium">
          Let's get started
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full"
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
          <Button
            canClick={isValid}
            loading={false}
            actionText="Create account"
          />
        </form>
        <div className=" mt-4">
          Already have an account? {}
          <Link to="/" className=" text-green-500 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
