import React from 'react';

class Ingredients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: this.props.ingredients,
    };
  }

  //to render the correct number of ingredient fields.
  //currently, added input fields are done in redux store
  //alternative option is to have that done in component state, and then update the whole redux state at once.
  componentDidUpdate(prevProps) {
    if (prevProps.ingredients !== this.props.ingredients) {
      this.setState({
        ingredients: this.props.ingredients,
      });
    }
  }

  onChange = (e) => {
    const { name, value } = e.target;
    const { type, index } = e.target.dataset;

    let copyArr = JSON.parse(JSON.stringify(this.state.ingredients)); //immutability helper.
    copyArr[index][name] = value;

    this.setState({
      ingredients: copyArr,
    });
  };

  //need to adjust what values actions and reducers will use.
  onBlur = (e) => {
    const { name, value } = e.target;
    const { type, index } = e.target.dataset; //to call for data-* custom attributes
    this.props.updateChange(type, index, name, this.state.ingredients[index][name]);
  };

  render() {
    //default key is set with index - will need to change once database is sets
    const ingredientsListTemplate = this.state.ingredients.map((ingredient, index) => {
      return (
        <li key={index}>
          <input
            data-type="ingredients"
            data-index={index}
            name="quantity"
            type="text" //better if the type is number, but when set state, it automatically becomes a string.
            placeholder="quantity"
            value={ingredient.quantity}
            onChange={this.onChange}
            onBlur={this.onBlur}
          />
          <input
            data-type="ingredients"
            data-index={index}
            name="unit"
            type="text"
            placeholder="unit of measurement"
            value={ingredient.unit}
            onChange={this.onChange}
            onBlur={this.onBlur}
          />
          {/* may want a datalist of measurements to choose from */}
          <input
            data-type="ingredients"
            data-index={index}
            name="name"
            type="text"
            placeholder="Ingredient"
            value={ingredient.name}
            onChange={this.onChange}
            onBlur={this.onBlur}
          />
        </li>
      );
    });
    return (
      <div>
        <label>Ingredients:</label>
        <br />
        <ul>{ingredientsListTemplate}</ul>
        {/* //for the button to add more input */}
        {this.props.children}
      </div>
    );
  }
}

export default Ingredients;
