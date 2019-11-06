import React from 'react';
import axios from 'axios';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import './App.css';
import { AddRecipeForm } from './components';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dishTypes: [],
    };
  }

  componentDidMount() {
    // Promise.all([axios.get('localhost:8080/cuisine'), axios.get('localhost:8080/dishTypes')])

    axios.get('http://localhost:8080/dishTypes').then((response) => {
      console.log(response);
      this.setState({
        dishTypes: response.data,
      });
    });
  }

  render() {
    const { dishTypes } = this.state;

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
        </header>

        <main>
          <nav>
            <ul>{navBarItems}</ul>
          </nav>

          <button>
            {/*temp link - plan to use modal pop-up*/}
            <Link to="/newRecipe">Add New Recipe</Link>
          </button>

          <Switch>
            <Route exact path="/">
              <HomeTab />
            </Route>
            {routePaths}

            {/* temporary route - plan to use a modal pop-up*/}
            <Route path="/newRecipe">
              <AddRecipeForm />
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

function RecipeTab(props) {
  const { type } = props;
  return (
    <React.Fragment>
      <h2>{type}</h2>
      <p>This is the recipe page for {type.toLowerCase()}.</p>
    </React.Fragment>
  );
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
