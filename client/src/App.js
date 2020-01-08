import React from 'react';
import axios from 'axios';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import './App.css';
import { AddRecipeForm, RecipeTab } from './components';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dishTypes: [],
      cuisines: [],
      recipeTitleIDList: [],
    };
  }

  componentDidMount() {
    // Promise.all([axios.get('localhost:8080/cuisine'), axios.get('localhost:8080/dishTypes')])

    axios.get('http://localhost:8080/dishTypes').then((response) => {
      this.setState({
        dishTypes: response.data,
      });
    });

    //lists of cuisines
    axios.get('http://localhost:8080/cuisines').then((response) => {
      this.setState({
        cuisines: response.data,
      });
    });
  }

  saveRecipe = (newRecipe) => {
    //need to temp provide an id # for recipe, til db is set up.
    const data = { ...newRecipe };
    data.id = Math.floor(Math.random() * 1000);

    //API post req to server, response and then setState for a new arr of recipes
    axios
      .post('http://localhost:8080/recipes', data)
      .then((response) => {
        const newTitleID = response.data;
        const newList = [...this.state.recipeTitleIDList].concat(newTitleID);
        this.setState({
          recipeTitleIDList: newList
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { dishTypes, cuisines } = this.state;

    //future idea: allow a toggle to choose between dishType and Cuisine tabs sorting
    const navBarItems = dishTypes.map((type) => {
      return (
        <li key={type}>
          <Link to={type.toLowerCase()}>{type}</Link>
        </li>
      );
    });

    const routePaths = dishTypes.map((type) => {
      return (
        <Route path={'/' + type.toLowerCase()} key={type}>
          <RecipeTab type={type} />
        </Route>
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
            <ul>{navBarItems}</ul>
          </nav>

          <button>
            {/*temp link - plan to use modal pop-up*/}
            <Link to="/newRecipe">
              Add New Recipe
            </Link>
          </button>

          <Switch>
            <Route exact path="/">
              <HomeTab />
            </Route>
            {routePaths}

            {/* temporary route - plan to use a modal pop-up*/}
            <Route path="/newRecipe">
              <AddRecipeForm dishTypes={dishTypes} cuisines={cuisines} saveRecipe={this.saveRecipe} />
            </Route>

            <Route path="*">
              <ErrorPage />
            </Route>
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

function ErrorPage() {
  return (
    <React.Fragment>
      <h2>404</h2>
      <p>The page you are looking for cannot be found.</p>
    </React.Fragment>
  );
}

export default App;
