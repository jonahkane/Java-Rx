const db = require('../config/connection');
const { User, Drink } = require('../models');
const userSeeds = require('./userSeeds.json');
const drinkSeeds = require('./drinkSeeds.json');

db.once('open', async () => {
  try {
    await Drink.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < drinkSeeds.length; i++) {
      const { _id, drinkAuthor } = await Drink.create(drinkSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: drinkAuthor },
        {
          $addToSet: {
            drinks: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
