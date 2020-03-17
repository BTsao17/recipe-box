import React from 'react';

class Cuisine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cuisine: this.props.cuisine,
    };
  }

  onChange = (e) => {
    this.setState({
      cuisine: e.target.value,
    });
  };

  onBlur = (e) => {
    this.props.updateChange(e.target.name, this.state.cuisine);
  };

  //datalist option is supported only in some browsers
  //default key is set with index - may need to change once database is set
  generateListOptions = (listType) => {
    return listType.map((type) => {
      return <option key={type} value={type} />;
    });
  };

  render() {
    const cuisineOptions = this.generateListOptions(this.props.cuisineList);

    return (
      <div>
        <label htmlFor='cuisine'>Cuisine:</label>
        <input
          required
          name='cuisine'
          list='cuisines'
          type='text'
          placeholder='Cuisine'
          value={this.state.cuisine}
          onChange={this.onChange}
          onBlur={this.state.cuisine !== this.props.cuisine ? this.onBlur : null}
        />
        <datalist id='cuisines'>{cuisineOptions}</datalist>
      </div>
    );
  }
}

export default Cuisine;
