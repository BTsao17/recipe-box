import React from 'react';
import axios from 'axios';
import { Route, Switch, Link, Redirect } from 'react-router-dom';

// function RecipeDetailsTemplate(props) {
//   console.log("recipe dets info",props.match);
//   return <h2>Recipe Details placeholder - {props.match.params.recipe}</h2>;
// }

class RecipeDetailsTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
    };
  }

  componentDidMount() {
    const { match } = this.props;
    console.log(match);
    const dishType = match.params.type; //only needed if the endpoint was /${dishType}/${recipeID}
    const recipeID = match.params.id; //a string, not number
    const recipeTitle = match.params.recipe;

    axios.get(`http://localhost:8080/recipe/${dishType}/${recipeID}/${recipeTitle}`).then((response) => {
      console.log(response.data);
      this.setState({
        recipe: response.data,
      });
    });
  }

  render() {
    const { type } = this.props.match.params;

    //checks for an empty object for rendering of 404 error.
    if (Object.keys(this.state.recipe).length === 0) {
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
        <h2>Recipe Details placeholder: {this.state.recipe.title}</h2>
        <div>Cuisine:{this.state.recipe.cuisine}</div>
        <button onClick={() => this.props.history.goBack()}>Back to {type}</button>
      </React.Fragment>
    );
  }
}
}

export default RecipeDetailsTemplate;
