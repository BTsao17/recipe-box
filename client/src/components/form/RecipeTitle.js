import React from 'react';

class RecipeTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title, //makes sure that redux store and local state are identical from the start.
    };
  }

  //handle changes locally, and then only update to redux store once with onBlur.
  onChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  //need to adjust what values actions and reducers will use.
  onBlur = (e) => {
    this.props.updateChange(e.target.name, this.state.title);
  };

  render() {
    return (
      <div>
        <label htmlFor='title'>Title:</label>
        <input
          required
          name='title'
          type='text'
          placeholder='Recipe Title'
          value={this.state.title}
          onChange={this.onChange}
          onBlur={this.state.title !== this.props.title ? this.onBlur : null}
        />
      </div>
    );
  }
}

export default RecipeTitle;
