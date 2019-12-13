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
          prep: 0,
          unit: 'minutes',
        },
        {
          cook: 0,
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
      procedure: [],
      notes: [],
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //handle changes to state where it's an array
  handleChangeTimeArr = (e) => {
    const { name, value } = e.target;
    const { type, index } = e.target.dataset; //to call for data-* custom attributes
    console.log(type, index, name, value);

    let copyArr = [ ...this.state[type] ]; //problem is that this isn't a deep copy.

    //alt: json parse and stringify....an ugly solution, and doesn't copy methods, so will probably be an issue.  Look into immutability-helper
    let newArr2 = JSON.parse(JSON.stringify(this.state[type]));
    newArr2[index][name] = value;
    console.log(this.state[type]);
    console.log(newArr2);

    //number in the state will be a string - need to figure out how to word conditional to change to number data type.
    this.setState({
      [type]: newArr2,
    });
  };

  handleChangeIngredArr = (e) => {
    console.log(e.target);
    console.log(e.target.value);
    const { name, value } = e.target;
    const { type, index } = e.target.dataset; //to call for data-* custom attributes
    console.log(type, index, name, value);

    let newArr = JSON.parse(JSON.stringify(this.state[type]));
    newArr[index][name] = value;
    console.log(newArr);
    console.log(newArr.length);
    this.setState({
      [type]: newArr,
    });
  };

  addMoreIngredInputs = (e) => {
    console.log('clicked');
    // once this is clicked, add one more object with empty values into ingredients array state
    //generate html <ul> options to add to the rendering?
    const ingredientsObjTemplate = { name: '', quantity: '', unit: '' };
    let newArr = JSON.parse(JSON.stringify(this.state.ingredients));
    newArr.push(ingredientsObjTemplate);
    console.log(newArr);

    this.setState({
      ingredients: newArr,
    });
  };

  //datalist option is supported only in some browsers
  generateListOptions = (listType) => {
    return listType.map((type) => {
      return <option key={type} value={type} />;
    });
  };

  render() {
    const { dishTypes, cuisines } = this.props;

    const cuisineOptions = this.generateListOptions(cuisines);
    const dishTypeOptions = this.generateListOptions(dishTypes);

    let ingredientsListTemplate = this.state.ingredients.map((ingredient, index) => {
      return (
        <li key={index}>
          <input
            data-type="ingredients"
            data-index={index}
            name="quantity"
            type="text"
            placeholder="quantity"
            onChange={this.handleChangeIngredArr}
            value={ingredient.quantity}
          />
          <input
            data-type="ingredients"
            data-index={index}
            name="unit"
            type="text"
            placeholder="unit of measurement"
            onChange={this.handleChangeIngredArr}
            value={ingredient.unit}
          />
          {/* may want a datalist of measurements to choose from */}
          <input
            data-type="ingredients"
            data-index={index}
            name="name"
            type="text"
            placeholder="Ingredient"
            onChange={this.handleChangeIngredArr}
            value={ingredient.name}
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
            onChange={this.handleChangeTimeArr}
          />
          <select
            data-type="time"
            data-index="0"
            name="unit"
            value={this.state.time[0].unit}
            onChange={this.handleChangeTimeArr}
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
            onChange={this.handleChangeTimeArr}
          />
          <select
            data-type="time"
            data-index="1"
            name="unit"
            value={this.state.time[1].unit}
            onChange={this.handleChangeTimeArr}
          >
            <option value="minutes">minutes</option>
            <option value="hours">hours</option>
          </select>
          <br />
          Ingredients:
          <br />
          {/* hard coded initial ingredients list
          <ul>
            <li>
              <input
                data-type="ingredients"
                data-index="0"
                name="quantity"
                type="number"
                placeholder="quantity"
                onChange={this.handleChangeIngredArr}
                value={this.state.ingredients[0].quantity}
              />
              <input
                data-type="ingredients"
                data-index="0"
                name="unit"
                type="text"
                placeholder="unit of measurement"
                onChange={this.handleChangeIngredArr}
                value={this.state.ingredients[0].unit}
              />
              may want a datalist of measurements to choose from
              <input
                data-type="ingredients"
                data-index="0"
                name="name"
                type="text"
                placeholder="Ingredient"
                onChange={this.handleChangeIngredArr}
                value={this.state.ingredients[0].name}
              />
            </li>
            <li>
              <input
                data-type="ingredients"
                data-index="1"
                name="quantity"
                type="number"
                placeholder="quantity"
                onChange={this.handleChangeIngredArr}
                value={this.state.ingredients[1].quantity}
              />
              <input
                data-type="ingredients"
                data-index="1"
                name="unit"
                type="text"
                placeholder="unit of measurement"
                onChange={this.handleChangeIngredArr}
                value={this.state.ingredients[1].unit}
              />
              may want a datalist of measurements to choose from
              <input
                data-type="ingredients"
                data-index="1"
                name="name"
                type="text"
                placeholder="Ingredient"
                onChange={this.handleChangeIngredArr}
                value={this.state.ingredients[1].name}
              />
            </li>
          </ul> */}

          {ingredientsListTemplate}
          <input type="button" value="Add more Ingredients" onClick={this.addMoreIngredInputs} />

          <br />
          Procedure:
          <br />
          <ol>
            <li />
            <li />
          </ol>
          <br />
          Notes:
          <br />
          <ul>
            <li />
          </ul>
        </form>
      </React.Fragment>
    );
  }
}

export default AddRecipeForm;
