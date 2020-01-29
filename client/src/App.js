import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import './App.css';
import { AddRecipeForm, RecipeTabTemplate, RecipeDetailsTemplate } from './components';

import { fetchDishTypes, fetchCuisines } from './actions';

//to connect component to redux at the bottom
function mapStateToProps(state) {
  return {
    dishTypes: state.dishTypes,
  };
}

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     recipeTitleIDList: [], //no longer sure if I need the recipe list here at all, unless to display favourties?
  //   };
  // }

  componentDidMount() {
    // Promise.all([axios.get('localhost:8080/cuisine'), axios.get('localhost:8080/dishTypes')])

    // axios
    //   .get('http://localhost:8080/dishTypes')
    //   .then((response) => {
    //     this.setState({
    //       dishTypes: response.data,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    this.props.dispatch(fetchDishTypes());

    //lists of cuisines
    // axios
    //   .get('http://localhost:8080/cuisines')
    //   .then((response) => {
    //     this.setState({
    //       cuisines: response.data,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    this.props.dispatch(fetchCuisines());

    //list of recipe titles - maybe favourites?
    axios.get('http://localhost:8080/recipeList').then((response) => {
      console.log('initial default recipes:', response.data);
      this.setState({
        recipeTitleIDList: response.data,
      });
    });
  }

  saveRecipe = (newRecipe) => {
    //need to temp provide an id # for recipe, til db is set up.
    const data = { ...newRecipe };
    data.id = Math.floor(Math.random() * 1000);

    //make sure all cuisine and dish data are in the correct case.
    data.dish = data.dish.toLowerCase(); //all lowercase
    data.cuisine = data.cuisine.charAt(0).toUpperCase() + data.cuisine.slice(1); //first letter is uppercase

    //API post req to server, response is only the new recipe
    axios
      .post('http://localhost:8080/recipe', data)
      .then((response) => {
        const newTitleID = response.data;
        const newList = [ ...this.state.recipeTitleIDList ].concat(newTitleID);
        this.setState({
          recipeTitleIDList: newList,
        });
        console.log(this.state.recipeTitleIDList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { dishTypes, cuisines, recipeTitleIDList } = this.props; //changed from this.state

    //future idea: allow a toggle to choose between dishType and Cuisine tabs sorting
    const navBarLinks = dishTypes.map((type) => {
      return (
        <li key={type}>
          <Link to={`/${type}`}>{type}</Link>
        </li>
      );
    });

    return (
      <React.Fragment>
        <header>
          <h1>Recipe Box</h1>
          {/* not sure if there's a need for the link back to homepage  - maybe down the line, can use it as a page to list favourites*/}
          <button>
            <Link to="/">Home</Link>
          </button>
        </header>

        <main>
          <nav>
            <ul>{navBarLinks}</ul>
          </nav>

          <button>
            {/*temp link - plan to use modal pop-up*/}
            <Link to="/newRecipe">Add New Recipe</Link>
          </button>

          <Switch>
            {/* Not using React Hooks */}
            <Route exact path="/" render={() => <HomeTab />} />

            <Route
              exact
              path="/newRecipe"
              render={() => <AddRecipeForm dishTypes={dishTypes} cuisines={cuisines} saveRecipe={this.saveRecipe} />}
            />

            {/* dynamic pages */}
            <Route
              exact
              path="/:type"
              render={(routeProps) => <RecipeTabTemplate dishTypes={dishTypes} {...routeProps} />}
            />

            <Route exact path="/:type/:id/:recipe" render={(routeProps) => <RecipeDetailsTemplate {...routeProps} />} />

            {/* catch all error page for random url inputs  */}
            <Route path="*" render={() => <Error />} />
          </Switch>
        </main>

        <footer>
          <p>There will be a footer here.</p>
        </footer>
      </React.Fragment>
    );
  }
}

//functional or dummy components
function HomeTab() {
  return <h2>Home</h2>;
}

function Error() {
  return (
    <React.Fragment>
      <h2>Error</h2>
      <p>The page you are looking for does not exist.</p>
    </React.Fragment>
  );
}

//export default App;
export default connect(mapStateToProps)(App);
