import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_DRINK } from '../../utils/mutations';
import { QUERY_DRINKS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const DrinkForm = () => {
  const [drinkText, setDrinkText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addDrink, { error }] = useMutation(ADD_DRINK, {
    update(cache, { data: { addDrink } }) {
      try {
        const { drinks } = cache.readQuery({ query: QUERY_DRINKS });

        cache.writeQuery({
          query: QUERY_DRINKS,
          data: { drinks: [addDrink, ...drinks] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, drinks: [...me.drinks, addDrink] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addDrink({
        variables: {
          drinkText,
          drinkAuthor: Auth.getProfile().data.username,
        },
      });

      setDrinkText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'drinkText' && value.length <= 280) {
      setDrinkText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>What's on your favorite espresso drink?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="drinkText"
                placeholder="My favorite coffee drink is..."
                value={drinkText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add drink
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your favorite drinks and thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default DrinkForm;