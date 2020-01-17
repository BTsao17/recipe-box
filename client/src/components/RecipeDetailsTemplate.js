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
    const { recipe } = this.state;

    //checks for an empty object for rendering of 404 error.
    if (Object.keys(recipe).length === 0) {
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
          <article>
            <h2>{recipe.title}</h2>
            <div>Type of cuisine: {recipe.cuisine}</div>
            <TimeInfo time={recipe.time} />
            <IngredInfo ingredients={recipe.ingredients} />
          </article>
          <button onClick={() => this.props.history.goBack()}>Back to {type}</button>
        </React.Fragment>
      );
    }
  }
}

//making smaller components to avoid errors for mapping through data
//that hasn't been fetched yet before the first render.
function TimeInfo(props) {
  // make sure the prep and cook time are strings rather and numbers. Right now, new recipes save them as strings. 
  const prepTime = props.time[0].prep.toString().concat(' ', props.time[0].unit);
  const cookTime = props.time[1].cook.toString().concat(' ', props.time[1].unit);
  return (
    <React.Fragment>
      <section>
        {props.time[0].prep !== "" && <div>Prep Time: {prepTime}</div>}
        {props.time[1].cook !== "" && <div>Cook Time: {cookTime}</div>}
      </section>
    </React.Fragment>
  );
}

function IngredInfo(props) {
  console.log(props.ingredients)
  return (
    <React.Fragment>
      <h3>Ingredients</h3>
    </React.Fragment>
  )
}

export default RecipeDetailsTemplate;
