import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_DRINK } from "../../utils/mutations";
import { QUERY_DRINKS, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

const DrinkForm = ({ setDrinksListCurrent }) => {
  const [drinkTitle, setDrinkTitle] = useState("");
  const [drinkIngredients, setDrinkIngredients] = useState("");
  const [drinkInstructions, setDrinkInstructions] = useState("");

  // const [characterCount, setCharacterCount] = useState(0);

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
      // const { me } = cache.readQuery({ query: QUERY_ME });
      // cache.writeQuery({
      //   query: QUERY_ME,
      //   data: { me: { ...me, drinks: [...me.drinks, addDrink] } },
      // });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addDrink({
        variables: {
          drinkTitle,
          drinkIngredients,
          drinkInstructions,
          drinkAuthor: Auth.getProfile().data.username,
        },
      });

      setDrinkTitle("");
      setDrinkIngredients("");
      setDrinkInstructions("");
      // window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "drinkTitle") {
      setDrinkTitle(value);
      // setCharacterCount(value.length);
    }
  };
  const handleIngredientsChange = (event) => {
    const { name, value } = event.target;

    if (name === "drinkIngredients") {
      setDrinkIngredients(value);
      // setCharacterCount(value.length);
    }
  };
  const handleInstructionsChange = (event) => {
    const { name, value } = event.target;

    if (name === "drinkInstructions") {
      setDrinkInstructions(value);
      // setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>What's your order?</h3>

      {Auth.loggedIn() ? (
        <>
          {/* <p
            className={`m-0 ${
              characterCount === 280 || error ? "text-danger" : ""
            }`}
          >
            Character Count: {characterCount}/280
          </p> */}
          <div className="flex-row justify-center justify-space-between-md align-center">
            <div className="col-12 col-lg-9">
              <textarea
                name="drinkTitle"
                placeholder="My favorite coffee drink is..."
                value={drinkTitle}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>

              <textarea
                name="drinkIngredients"
                placeholder="This ingredients of this drink are..."
                value={drinkIngredients}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleIngredientsChange}
              ></textarea>

              <textarea
                name="drinkInstructions"
                placeholder="To make this drink you need to..."
                value={drinkInstructions}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleInstructionsChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button
                onClick={handleFormSubmit}
                className="btn btn-primary btn-block py-3"
                type="submit"
              >
                Add drink
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </div>
        </>
      ) : (
        <p>
          
          Please <Link to="/login">login</Link> or{" "}
          <Link to="/signup">signup </Link>
          to share your favorite drink and leave a review!
        </p>
      )}
    </div>
  );
};

export default DrinkForm;

// Attempted to make slide show background

// (function() {

//   // Settings.
//     var settings = {

//       // Images (in the format of 'url': 'alignment').
//         images: {
//           'https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g': 'center',
//           'images/bg02.jpg': 'center',
//           'images/bg03.jpg': 'center'
//         },

//       // Delay.
//         delay: 6000

//     };

//   // Vars.
//     var	pos = 0, lastPos = 0,
//       $wrapper, $bgs = [], $bg,
//       k, v;

//   // Create BG wrapper, BGs.
//     $wrapper = document.createElement('div');
//       $wrapper.id = 'bg';
//        $body.appendChild($wrapper);

//     for (k in settings.images) {

//       // Create BG.
//         $bg = document.createElement('div');
//           $bg.style.backgroundImage = 'url("' + k + '")';
//           $bg.style.backgroundPosition = settings.images[k];
//           $wrapper.appendChild($bg);

//       // Add it to array.
//         $bgs.push($bg);

//     }

//   // Main loop.
//     $bgs[pos].classList.add('visible');
//     $bgs[pos].classList.add('top');

//     // Bail if we only have a single BG or the client doesn't support transitions.
//       if ($bgs.length == 1
//       ||	!canUse('transition'))
//        return;

//     window.setInterval(function() {

//       lastPos = pos;
//       pos++;

//       // Wrap to beginning if necessary.
//         if (pos >= $bgs.length)
//           pos = 0;

//       // Swap top images.
//         $bgs[lastPos].classList.remove('top');
//         $bgs[pos].classList.add('visible');
//         $bgs[pos].classList.add('top');

//       // Hide last image after a short delay.
//         window.setTimeout(function() {
//           $bgs[lastPos].classList.remove('visible');
//         }, settings.delay / 2);

//     }, settings.delay);

// })();
