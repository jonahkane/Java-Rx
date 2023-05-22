import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../../components/CommentList';
import CommentForm from '../../components/CommentForm';

import { QUERY_SINGLE_DRINK } from '../../utils/queries';

const SingleDrink = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { drinkId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_DRINK, {
    // pass URL parameter
    variables: { drinkId: drinkId },
  });

  const drink = data?.drink || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {drink.drinkAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          had this thought on {drink.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {drink.drinkTitle}
        </blockquote>
      </div>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >

          {drink.drinkIngredients}
          </blockquote>
      </div>

          <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >

          {drink.drinkInstructions}
          </blockquote>
      </div>


      <div className="my-5">
        <CommentList comments={drink.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm drinkId={drink._id} />
      </div>
    </div>
  );
};

export default SingleDrink;
