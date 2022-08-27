import { gql, useApolloClient, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { meQuery } from '../../__generated__/meQuery';
import {
  verifyEmail,
  verifyEmailVariables,
} from '../../__generated__/verifyEmail';
import { Helmet } from 'react-helmet-async';

interface ConfirmEmailProps {
  thewholedata: meQuery;
}

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($verifyEmailInput: VerifyEmailInput!) {
    verifyEmail(input: $verifyEmailInput) {
      ok
      error
    }
  }
`;

const ConfirmEmail: React.FC<ConfirmEmailProps> = ({ thewholedata }) => {
  const client = useApolloClient();
  const navigate = useNavigate();
  const onCompleted = (data: verifyEmail) => {
    const {
      verifyEmail: { ok },
    } = data;
    if (ok && thewholedata.me.id) {
      //writing to the cache to change the data using ApolloClient
      client.writeFragment({
        id: `User:${thewholedata.me.id}`,
        fragment: gql`
          fragment VerifiedUser on User {
            verified
          }
        `,
        data: {
          verified: true,
        },
      });

      navigate('/');
    }
  };

  const [verifyEmail] = useMutation<verifyEmail, verifyEmailVariables>(
    VERIFY_EMAIL_MUTATION,
    { onCompleted }
  );
  useEffect(() => {
    const [__, code] = window.location.href.split('code=');
    verifyEmail({
      variables: {
        verifyEmailInput: {
          code,
        },
      },
    });
  });
  return (
    <div className=" mt-5 flex flex-col items-center ">
      <Helmet>
        <title>Verify Email | Uber Clone</title>
      </Helmet>
      <h2 className=" text-lg  font-medium">Confirming email...</h2>
      <h4 className=" text-gray-700 text-sm">
        Please wait, don't close this page...
      </h4>
    </div>
  );
};

export default ConfirmEmail;
