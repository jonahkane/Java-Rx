import React from 'react';
import { useQuery } from '@apollo/client';

import DrinkList from '../../components/DrinkList';
import DrinkForm from '../../components/DrinkForm';

import { QUERY_DRINKS } from '../../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_DRINKS);
  const drinks = data?.drinks|| [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          
        >
          <DrinkForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <DrinkList
              drinks={drinks}
              title="Here are some of our user's favorite coffee drinks!"
            />
          )}
        </div>
      </div>
    </main>
    
  );
};

export default Home;
