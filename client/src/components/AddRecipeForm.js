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

  //is it possible to write one function that takes care of all changes?
  handleChange = (e) => {
    const { name, value } = e.target;
    this.props.addChange(name, value);
  };

  //handle changes to state where it's an array
  //figure out how to combing handle___Arr functions to make code DRY
  handleChangeArr = (e) => {
    const { name, value } = e.target;
    const { type, index } = e.target.dataset; //to call for data-* custom attributes
    this.props.addArrayChange(type, index, name, value);
  };

  //depending on how id is generated (if in DB), may be changing the structure of notes into a simple array. that's why it's a separate function.
  handleChangeNotesArr = (e) => {
    const { name, value } = e.target;
    const { type, index } = e.target.dataset;

    let newArr = JSON.parse(JSON.stringify(this.state[type]));
    newArr[index][name] = value;
    this.setState({
      [type]: newArr,
    });
  };

  //figure out how to combing add___Input functions to make code DRY
  //the differences are the variables that create empty objects, maybe have them as parameters (event, newObj)
  addMoreIngredInput = () => {
    // once this is clicked, add one more object with empty values into ingredients array state
    //generate html <ul> options to add to the rendering - ingredientsListTemplate

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

  //combined addMoreNotes and addMoreSteps functions into one - not yet changed for redux.
  addMoreInput = (e, type, template) => {
    const refNum = [ ...this.state[type] ].length + 1;
    const keys = Object.keys(template);
    template[keys[0]] = refNum;
    console.log(template);

    const newArr = JSON.parse(JSON.stringify(this.state[type]));
    newArr.push(template);
    console.log(newArr);

    this.setState({
      [type]: newArr,
    });
  };

  handeleSubmit = (e) => {
    e.preventDefault(); //not sure if this is necessary? keep it for now
    this.props.saveRecipe(this.props.newRecipe, this.props.history);
  };

  render() {
    const { dishTypes, cuisines, newRecipe } = this.props;
    console.log('redux recipe state', newRecipe);

    return (
      <React.Fragment>
        <h1>Recipe Form</h1>
        <form id="newRecipe">
          <RecipeTitle title={newRecipe.title} handleChange={this.handleChange} />
          <Cuisine cuisine={newRecipe.cuisine} handleChange={this.handleChange} cuisineList={cuisines} />
          <Dishtype dish={newRecipe.dish} handleChange={this.handleChange} dishList={dishTypes} />
          <Time time={newRecipe.time} handleChange={this.handleChangeArr} />
          <Ingredients ingredients={newRecipe.ingredients} handleChange={this.handleChangeArr}>
            <input type="button" value="Add more ingredients" onClick={this.addMoreIngredInput} />
          </Ingredients>
          <Procedure procedure={newRecipe.procedure} handleChange={this.handleChangeArr}>
            <input
              type="button"
              value="Add more steps"
              // onClick={(e) => this.addMoreInput(e, 'procedure', { step: undefined, description: '' })}
              onClick={this.addMoreStepsInput}
            />
          </Procedure>
          <Notes notes={newRecipe.notes} handleChange={this.handleChangeArr}>
            <input
              type="button"
              value="Add more notes"
              // onClick={(e) => this.addMoreInput(e, 'notes', { id: undefined, text: '' })}
              onClick={this.addMoreNotesInput}
            />
          </Notes>
          <button form="newRecipe" type="submit" onClick={this.handeleSubmit}>
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
