import React from 'react';
import { connect } from 'react-redux';
import { fetchCuisines } from '../actions';
import { addIngredInput, addStepInput, addNoteInput, addChange, addArrayChange, saveRecipe } from '../actions';

//separation of concerns
import RecipeTitle from './form/RecipeTitle';
import Cuisine from './form/Cuisine';
import Dishtype from './form/Dishtype';
import Time from './form/Time';
import Ingredients from './form/Ingredients';
import Procedure from './form/Procedure';
import Notes from './form/Notes';

class AddRecipeForm extends React.Component {
  componentDidMount() {
    //console.log(this.props.cuisines);
    //console.log(Boolean(this.props.cuisines.length));
    //may have to change the conditional, especially if in the future, user can add more cuisines
    if (!this.props.cuisines.length) {
      this.props.fetchCuisines();
    }
  }

  //is it possible to write one function that takes care of all changes
  //need to change how reducers update the store.
  updateChange = (name, value) => {
    this.props.addChange(name, value);
  };

  updateChangeArr = (type, index, name, value) => {
    this.props.addArrayChange(type, index, name, value);
  };

  //figure out how to combing add___Input functions to make code DRY
  //the differences are the variables that create empty objects, maybe have them as parameters (event, newObj)
  addMoreIngredInput = () => {
    const ingredientsObjTemplate = { name: '', quantity: '', unit: '' }; //necessary? or better take from redux store
    this.props.addIngredInput(ingredientsObjTemplate);
  };

  addMoreStepsInput = () => {
    const stepNum = [ ...this.props.newRecipe.procedure ].length + 1;
    const procedureObjTemplate = { step: stepNum, description: '' };
    this.props.addStepInput(procedureObjTemplate);
  };

  addMoreNotesInput = () => {
    const noteID = [ ...this.props.newRecipe.notes ].length + 1; //temp id number based on index. May just have it generated in db in the end.
    const noteObjTemplate = { id: noteID, text: '' };
    this.props.addNoteInput(noteObjTemplate);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.saveRecipe(this.props.newRecipe, this.props.history);
  };

  render() {
    const { dishTypes, cuisines, newRecipe } = this.props;
    console.log('redux recipe state', newRecipe);

    return (
      <React.Fragment>
        <h1>Recipe Form</h1>
        <form id='newRecipe' onSubmit={this.handleSubmit}>
          <RecipeTitle title={newRecipe.title} updateChange={this.updateChange} />
          <Cuisine cuisine={newRecipe.cuisine} cuisineList={cuisines} updateChange={this.updateChange} />
          <Dishtype dish={newRecipe.dish} dishList={dishTypes} updateChange={this.updateChange} />
          <Time time={newRecipe.time} updateChange={this.updateChangeArr} />
          <Ingredients ingredients={newRecipe.ingredients} updateChange={this.updateChangeArr}>
            <input type='button' value='Add more ingredients' onClick={this.addMoreIngredInput} />
          </Ingredients>
          <Procedure procedure={newRecipe.procedure} updateChange={this.updateChangeArr}>
            <input type='button' value='Add more steps' onClick={this.addMoreStepsInput} />
          </Procedure>
          <Notes notes={newRecipe.notes} updateChange={this.updateChangeArr}>
            <input type='button' value='Add more notes' onClick={this.addMoreNotesInput} />
          </Notes>
          <button form='newRecipe' type='submit'>
            Save Recipe
          </button>
        </form>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    dishTypes: state.dishTypes.items,
    cuisines: state.cuisines.items,
    newRecipe: state.newRecipe.recipe,
  };
}

const mapDispatchToProps = {
  fetchCuisines,
  addIngredInput,
  addStepInput,
  addNoteInput,
  addChange,
  addArrayChange,
  saveRecipe,
};
//export default AddRecipeForm;
export default connect(mapStateToProps, mapDispatchToProps)(AddRecipeForm);
