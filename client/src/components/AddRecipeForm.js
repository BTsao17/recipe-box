import React from 'react';

class AddRecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      cuisine: '',
      dish: '',
      time: [
        {
          prep: '',
          unit: 'minutes',
        },
        {
          cook: '',
          unit: 'minutes',
        },
      ],
      ingredients: [
        {
          name: '',
          quantity: '',
          unit: '',
        },
        {
          name: '',
          quantity: '',
          unit: '',
        },
      ],
      procedure: [
        {
          step: 1,
          description: '',
        },
        {
          step: 2,
          description: '',
        },
      ],
      notes: [
        {
          id: 1, //arbitrary num for now. Might change once DB is set up. 
          text: '',
        },
      ],
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //handle changes to state where it's an array
  //figure out how to combing handle___Arr functions to make code DRY
  handleChangeArr = (e) => {
    const { name, value } = e.target;
    const { type, index } = e.target.dataset; //to call for data-* custom attributes
    //console.log(type, index, name, value);

    let copyArr = [ ...this.state[type] ]; //problem is that this isn't a deep copy.

    //alt: json parse and stringify....an ugly solution, and doesn't copy methods, so will probably be an issue.  Look into immutability-helper
    let newArr = JSON.parse(JSON.stringify(this.state[type]));
    newArr[index][name] = value;

    // console.log(this.state[type]);
    // console.log(newArr2);

    //number in the state will be a string - need to figure out how to word conditional to change to number data type.
    this.setState({
      [type]: newArr,
    });
  };

  //depending on how id is generated (if in DB), may be changing the structure of notes into a simple array.
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
  addMoreIngredInput = (e) => {
    // once this is clicked, add one more object with empty values into ingredients array state
    //generate html <ul> options to add to the rendering - ingredientsListTemplate
    const ingredientsObjTemplate = { name: '', quantity: '', unit: '' };
    let newArr = JSON.parse(JSON.stringify(this.state.ingredients)); // let or const?
    newArr.push(ingredientsObjTemplate);
    console.log(newArr);

    this.setState({
      ingredients: newArr,
    });
  };

  addMoreStepsInput = (e) => {
    const stepNum = [ ...this.state.procedure ].length + 1;
    const procedureObjTemplate = { step: stepNum, description: '' };
    let newArr = JSON.parse(JSON.stringify(this.state.procedure));
    newArr.push(procedureObjTemplate);
    console.log(newArr);

    this.setState({
      procedure: newArr,
    });
  };

  addMoreNotesInput = (e) => {
    const noteID = [ ...this.state.notes ].length +1; //temp id number based on index. May just have it generated in db in the end.
    const noteObjTemplate = { id: noteID, text: '' };
    let newArr = JSON.parse(JSON.stringify(this.state.notes));
    newArr.push(noteObjTemplate);
    console.log(newArr);

    this.setState({
      notes: newArr,
    });
  };
  
  //combined addMoreNotes and addMoreProcedure functions into one. 
  addMoreInput = (e, type, template) => {
    const refNum = [...this.state[type]].length +1;
    const keys = Object.keys(template);
    template[keys[0]] = refNum;
    console.log(template);

    const newArr = JSON.parse(JSON.stringify(this.state[type]));
    newArr.push(template);
    console.log(newArr)

    this.setState({
      [type]: newArr
    })

  }

  //datalist option is supported only in some browsers
  //default key is set with index - may need to change once database is set
  generateListOptions = (listType) => {
    return listType.map((type) => {
      return <option key={type} value={type} />;
    });
  };

  render() {
    const { dishTypes, cuisines } = this.props;

    const cuisineOptions = this.generateListOptions(cuisines);
    const dishTypeOptions = this.generateListOptions(dishTypes);

    //default key is set with index - may need to change once database is set
    const ingredientsListTemplate = this.state.ingredients.map((ingredient, index) => {
      return (
        <li key={index}>
          <input
            data-type="ingredients"
            data-index={index}
            name="quantity"
            type="text"
            placeholder="quantity"
            onChange={this.handleChangeArr}
            value={ingredient.quantity}
          />
          <input
            data-type="ingredients"
            data-index={index}
            name="unit"
            type="text"
            placeholder="unit of measurement"
            onChange={this.handleChangeArr}
            value={ingredient.unit}
          />
          {/* may want a datalist of measurements to choose from */}
          <input
            data-type="ingredients"
            data-index={index}
            name="name"
            type="text"
            placeholder="Ingredient"
            value={ingredient.name}
            onChange={this.handleChangeArr}
          />
        </li>
      );
    });

    //default key is set with index - may need to change once database is set, key will be primary key
    const procedureTemplate = this.state.procedure.map((step, index) => {
      return (
        <li key={index}>
          <textarea
            data-type="procedure"
            data-index={index}
            name="description"
            value={step.description}
            onChange={this.handleChangeArr}
          />
        </li>
      );
    });

    //default key is set with index - may need to change once database is set, key will be primary key
    const noteTemplate = this.state.notes.map((note, index) => {
      return (
        <li key={index}>
          <textarea
            data-type="notes"
            data-index={index}
            name="text"
            value={note.text}
            onChange={this.handleChangeNotesArr}
          />
        </li>
      );
    });

    return (
      <React.Fragment>
        <h1>Recipe Form</h1>
        <form>
          Title:
          <input
            name="title"
            type="text"
            placeholder="Recipe Title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <br />
          Cuisine:
          <input
            name="cuisine"
            list="cuisines"
            type="text"
            placeholder="Cuisine"
            value={this.state.cuisine}
            onChange={this.handleChange}
          />
          <datalist id="cuisines">{cuisineOptions}</datalist>
          <br />
          Dish Type:
          <input
            name="dish"
            list="dishTypes"
            type="text"
            placeholder="Dish Type"
            value={this.state.dish}
            onChange={this.handleChange}
          />
          <datalist id="dishTypes">{dishTypeOptions}</datalist>
          <br />
          Prep Time:
          <input
            data-type="time"
            data-index="0"
            name="prep"
            type="number"
            min="0"
            value={this.state.time[0].prep}
            onChange={this.handleChangeArr}
          />
          <select
            data-type="time"
            data-index="0"
            name="unit"
            value={this.state.time[0].unit}
            onChange={this.handleChangeArr}
          >
            <option value="minutes">minutes</option>
            <option value="hours">hours</option>
          </select>
          <br />
          Cook Time:
          <input
            data-type="time"
            data-index="1"
            name="cook"
            type="number"
            min="0"
            value={this.state.time[1].cook}
            onChange={this.handleChangeArr}
          />
          <select
            data-type="time"
            data-index="1"
            name="unit"
            value={this.state.time[1].unit}
            onChange={this.handleChangeArr}
          >
            <option value="minutes">minutes</option>
            <option value="hours">hours</option>
          </select>
          <br />
          Ingredients:
          <br />
          <ul>{ingredientsListTemplate}</ul>
          <input type="button" value="Add more ingredients" onClick={this.addMoreIngredInput} />
          <br />
          Procedure:
          <br />
          <ol>{procedureTemplate}</ol>
          <input type="button" value="Add more steps" onClick={(e) => this.addMoreInput(e, 'procedure', {step:undefined, description:''})} />
          <br />
          Notes:
          <br />
          <ul>
            {noteTemplate}
          </ul>
          <input type="button" value="Add more notes" onClick={(e) => this.addMoreInput(e, 'notes', {id:undefined, text:''})} />
          <br />
          <button>Save Recipe</button>
        </form>
      </React.Fragment>
    );
  }
}

export default AddRecipeForm;
