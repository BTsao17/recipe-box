import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import { fetchRecipeDetails } from '../actions';

// function RecipeDetailsTemplate(props) {
//   console.log("recipe dets info",props.match);
//   return <h2>Recipe Details placeholder - {props.match.params.recipe}</h2>;
// }

class RecipeDetailsTemplate extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     recipe: {},
  //   };
  // }

  componentDidMount() {
    const { match } = this.props;
    console.log(match);
    const dishType = match.params.type; //only needed if the endpoint was /${dishType}/${recipeID}
    const recipeID = match.params.id; //a string, not number
    const recipeTitle = match.params.recipe;

    // axios.get(`http://localhost:8080/recipe/${dishType}/${recipeID}/${recipeTitle}`).then((response) => {
    //   console.log(response.data);
    //   this.setState({
    //     recipe: response.data,
    //   });
    // });

    //check if empty object, or if same recipe details
    const { recipe } = this.props;
    const { id } = this.props.match.params;
    if (Object.keys(recipe).length === 0 || !(recipe.id === Number(id))) {
      this.props.fetchRecipeDetails(dishType, recipeID, recipeTitle);
    }
  }

  render() {
    const { type } = this.props.match.params;
    const { recipe } = this.props;

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
            <Procedure procedure={recipe.procedure} />
            <Notes notes={recipe.notes} />
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
  const prepTime = props.time[0].prep.concat(' ', props.time[0].unit);
  const cookTime = props.time[1].cook.concat(' ', props.time[1].unit);
  return (
    <React.Fragment>
      <section>
        {props.time[0].prep && <div>Prep Time: {prepTime}</div>}
        {props.time[1].cook && <div>Cook Time: {cookTime}</div>}
      </section>
    </React.Fragment>
  );
}

function IngredInfo(props) {
  const ingredList = props.ingredients.map(({ name, quantity, unit }, i) => {
    let ingred;
    if (unit === '') {
      ingred = quantity.concat(' ', name);
    }
    else {
      ingred = quantity.concat(' ', unit, ' ', name);
    }
    return <li key={i}>{ingred}</li>;
  });
  return (
    <section>
      <h3>Ingredients</h3>
      <ul>{ingredList}</ul>
    </section>
  );
}

function Procedure(props) {
  const steps = props.procedure.map(({ description, step }) => {
    return <li key={step}>{description}</li>;
  });
  return (
    <section>
      <h3>Procedure</h3>
      <ol>{steps}</ol>
    </section>
  );
}

function Notes(props) {
  const notesX = props.notes.map(({ text, id }) => {
    return <li key={id}>{text}</li>;
  });
  return (
    <React.Fragment>
      {props.notes[0].text && (
        <section>
          <h3>Additional Notes</h3>
          <ul>{notesX}</ul>
        </section>
      )}
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    recipe: state.recipeDetails.details,
  };
}
const mapDispatchToProps = {
  fetchRecipeDetails,
};

//export default RecipeDetailsTemplate;
export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetailsTemplate);
