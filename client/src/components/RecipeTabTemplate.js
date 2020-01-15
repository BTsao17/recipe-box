import React from 'react';
import axios from 'axios';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import { RecipeDetailsTemplate } from '.';

// function component alternative
/*
function RecipeTabTemplate(props) {
  const { type } = props;
  return (
    <React.Fragment>
      <h2>{type}</h2>
      <p>This is the recipe page for {type.toLowerCase()}.</p>
    </React.Fragment>
  );
}
*/

class RecipeTabTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeList: [],
    };
  }

  componentDidMount() {
    this.getPageData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.type !== this.props.match.params.type) {
      this.getPageData();
    }
  }

  getPageData = () => {
    const { type } = this.props.match.params;
    console.log('dishtype info:', this.props.match);

    axios
      .get(`http://localhost:8080/${type}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          recipeList: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { match, dishTypes } = this.props;
    const dishType = match.params.type;

    const recipeLinks = this.state.recipeList.map((recipe) => {
      const recipeTitleDash = recipe.title.toLowerCase().split(' ').join('-');
      return (
        <li key={recipe.id}>
          <Link to={`${match.url}/${recipe.id}/${recipeTitleDash}`}>{recipe.title}</Link>
        </li>
      );
    });

    //conditional rendering - 404 error page
    if (!dishTypes.includes(dishType)) {
      return (
        <React.Fragment>
          <h2>404</h2>
          <p>The page you are looking for cannot be found.</p>
        </React.Fragment>
      );
    }
    else {
      return (
        <React.Fragment>
          <h2>{dishType}</h2>
          <p>This is the recipe page for {dishType.toLowerCase()}.</p>
          <p>Listing Links:</p>
          {/* conditional rendering of list, only has bullets if recipes list has items */}
          {this.state.recipeList.length !== 0 && <ul>{recipeLinks}</ul>}

          <Switch>
            <Route
              path={`${match.path}/:id/:recipe`}
              render={(routeProps) => <RecipeDetailsTemplate {...routeProps} />}
            />
          </Switch>
        </React.Fragment>
      );
    }
  }
}

export default RecipeTabTemplate;
