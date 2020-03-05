import React from 'react';

class RecipeTitle extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor="title">Title:</label>
        <input
          name="title"
          type="text"
          placeholder="Recipe Title"
          value={this.props.title}
          onChange={this.props.handleChange}
        />
      </div>
    );
  }
}

export default RecipeTitle;
