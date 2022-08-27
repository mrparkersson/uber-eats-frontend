import { gql, useApolloClient, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import Button from '../../components/button';
import { FormError } from '../../components/form-error';
import {
  editProfile,
  editProfileVariables,
} from '../../__generated__/editProfile';
import { meQuery } from '../../__generated__/meQuery';
import { Helmet } from 'react-helmet-async';

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface EditProfileProps {
  currentuser: meQuery;
}

interface EditProfileFormParams {
  email?: string;
  password?: string;
}

const EditProfile: React.FC<EditProfileProps> = ({ currentuser }) => {
  //getting data from cache
  const client = useApolloClient();
  const onCompleted = (data: editProfile) => {
    const {
      editProfile: { ok },
    } = data;
    if (ok && currentuser) {
      const {
        me: { email: previousEmail, id },
      } = currentuser;
      const { email: newEmail } = getValues();

      if (previousEmail !== newEmail) {
        //writing to the cache to change the data using ApolloClient

        //Or you can use refetch from the query to update all the data
        client.writeFragment({
          id: `User:${id}`,
          fragment: gql`
            fragment EditUserDetails on User {
              verified
              email
            }
          `,
          data: {
            email: newEmail,
            verified: false,
          },
        });
      }
    }
  };
  const [editProfile, { loading }] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE_MUTATION, { onCompleted });
  const {
    register,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
  } = useForm<EditProfileFormParams>({
    mode: 'onChange',
    defaultValues: {
      email: currentuser.me.email,
    },
  });

  const onSubmit = () => {
    const { email, password } = getValues();

    editProfile({
      variables: {
        input: {
          ...(email !== '' && { email }),
          ...(password !== '' && { password }),
        },
      },
    });
  };
  return (
    <div className=" mt-52 flex flex-col justify-center items-center">
      <Helmet>
        <title>Edit Profile | Uber Clone</title>
      </Helmet>
      <h4 className=" font-semibold text-2xl mb-3">Edit Profile</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" grid gap-3 mt-5 w-full mb-5 max-w-screen-sm"
      >
        <input
          className="bg-gray-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-600 py-3 px-5 rounded-lg"
          {...register('email', {
            pattern:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          type="email"
          name="email"
          placeholder="Email"
        />
        {errors.email?.message && (
          <FormError errorMessage={errors.email?.message} />
        )}
        <input
          className="bg-gray-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-600 py-3 px-5 rounded-lg"
          {...register('password')}
          type="password"
          name="password"
          placeholder="Password"
        />
        <Button
          loading={loading}
          actionText="Save Changes"
          canClick={isValid}
        />
      </form>
    </div>
  );
};

export default EditProfile;
