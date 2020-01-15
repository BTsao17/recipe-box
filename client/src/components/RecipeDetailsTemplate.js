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

    axios.get(`http://localhost:8080/recipe/${recipeID}`).then((response) => {
      console.log(response.data);
      this.setState({
        recipe: response.data,
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <h2>Recipe Details placeholder: {this.state.recipe.title}</h2>
        <div>Cuisine:{this.state.recipe.cuisine}</div>
      </React.Fragment>
    );
  }
}

export default RecipeDetailsTemplate;
