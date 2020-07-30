const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userController = require('./controllers/userController');
const recipeController = require('./controllers/recipeController');
const middlewares = require('./middlewares');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/admin', middlewares.auth(), userController.showUserData);
app.get('/login', userController.loginForm);
app.get('/logout', userController.logout);
app.post('/login', userController.login);
app.get('/register', userController.registerForm);
app.post('/register', userController.register);

app.get('/', middlewares.auth(false), recipeController.listRecipes);
app.get('/recipes/new', middlewares.auth(), recipeController.newRecipeForm);
app.post('/recipes', middlewares.auth(), recipeController.newRecipe);
app.get('/recipes/search', recipeController.searchRecipes);
app.get('/recipes/:id/edit', middlewares.auth(), recipeController.editRecipeForm);
app.get('/recipes/:id/delete', middlewares.auth(), recipeController.deleteRecipeForm);
app.post('/recipes/:id/delete', middlewares.auth(), recipeController.deleteRecipe);
app.get('/recipes/:id', middlewares.auth(false), recipeController.showRecipeDetails);
app.post('/recipes/:id', middlewares.auth(), recipeController.editRecipe);

app.listen(3000, () => console.log('Listening on 3000'));
