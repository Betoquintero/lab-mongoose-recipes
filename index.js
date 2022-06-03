const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  //Iteration 2

  .then(() => {
    return Recipe.create({title: 'arepa', level: 'Easy Peasy', ingredients: ['corn flour', 'salt', 'water', ], cuisine: 'Venezuelan', dishType: 'main_course', duration: 30, creator: 'Unknown' })    
  })

  .then((arepa) => {
    console.log('Created:', arepa.title)
  })

  //Iteration 3

    .then(() => {
    return Recipe.create(data)
  })

  .then((allRecipes) => {
    for (let i= 0; i < allRecipes.length; i++){
      console.log ("Recipe:", allRecipes[i].title)
    }
  })

  //Iteration 4

  .then(() => {
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration:100});
  })

  .then((rigatoni) => {
   console.log('updated duration:', rigatoni )
  })

  //Iteration 5

    .then(() => {
    return Recipe.deleteOne({title: 'Carrot Cake'});
  })

  .then((carrotCake) => {
   console.log('deletion succesfull:', carrotCake )
  })

  //Iteration 6

  .finally(() => {
    mongoose.connection.close()
   })  


  .catch(error => {
    console.error('Error connecting to the database', error);
  });
