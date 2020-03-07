import React from 'react';

class Ingredients extends React.Component {
  render() {
    //default key is set with index - will need to change once database is sets
    const ingredientsListTemplate = this.props.ingredients.map((ingredient, index) => {
      return (
        <li key={index}>
          <input
            data-type="ingredients"
            data-index={index}
            name="quantity"
            type="text" //better if the type is number, but when set state, it automatically becomes a string.
            placeholder="quantity"
            onChange={this.props.handleChange}
            value={ingredient.quantity}
          />
          <input
            data-type="ingredients"
            data-index={index}
            name="unit"
            type="text"
            placeholder="unit of measurement"
            onChange={this.props.handleChange}
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
            onChange={this.props.handleChange}
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
