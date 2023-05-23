import React from "react";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";

const DrinkList = ({
  drinks,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!drinks?.length) {
    return <h3>No Drinks Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {drinks &&
        drinks.map((drink) => (
          <div key={drink._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${drink.drinkAuthor}`}
                >
                  {drink.drinkAuthor} <br />
                  <span style={{ fontSize: "1rem" }}>
                    shared this drink on {drink.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: "1rem" }}>
                    You shared this drink on {drink.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{drink.drinkTitle}</p>
              <p>{drink.drinkIngredients}</p>
              <p>{drink.drinkInstructions}</p>
              <img src={drink.drinkImageURL} alt="coffee"></img>

              <Image
                style={{ width: 200 }}
                cloudName="dtrmeorgv"
                publicId="https://res.cloudinary.com/dtrmeorgv/image/upload/v1684729237/Cappuccino_bz4gia.jpg"
              />
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/drinks/${drink._id}`}
            >
              Share your thoughts on this drink.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default DrinkList;