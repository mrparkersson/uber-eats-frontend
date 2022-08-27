import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <div className=" h-screen flex flex-col items-center justify-center">
      <Helmet>
        <title>Not Found | Uber Clone</title>
      </Helmet>
      <h2 className=" font-semibold text-xl mb-5">Page Not Found</h2>
      <h4 className=" font-medium text-base">
        The Page you are looking for does not exist
      </h4>
      <Link className=" hover:underline text-green-600" to="/">
        Go Back Home &rarr;
      </Link>
    </div>
  );
};

export default NotFound;
