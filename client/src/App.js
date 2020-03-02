import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Route, Switch, Link } from 'react-router-dom';
import './App.css';
import { AddRecipeForm, RecipeTabTemplate, RecipeDetailsTemplate } from './components';
import { fetchDishTypes } from './actions';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchDishTypes();

    //list of recipe titles - maybe favourites?
    axios.get('http://localhost:8080/recipeList').then((response) => {
      console.log('initial default recipes:', response.data);
      this.setState({
        recipeTitleIDList: response.data,
      });
    });
  }

  render() {
    const { dishTypes } = this.props; //changed from this.state

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
            {/* Not using React Hooks, so use render rather than child */}
            <Route exact path="/" render={() => <HomeTab />} />
            <Route exact path="/newRecipe" render={(routeProps) => <AddRecipeForm {...routeProps}/>} />
            {/* dynamic pages */}
            <Route exact path="/:type" render={(routeProps) => <RecipeTabTemplate {...routeProps} />} />
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

//to connect component to redux
const mapStateToProps = (state) => {
  return {
    dishTypes: state.dishTypes.items,
  };
};

//keys become prop names, and rather than having to call this.props.dispatch(action()), can ust use this.props.action()
const mapDispatchToProps = {
  fetchDishTypes,
};

//export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);
