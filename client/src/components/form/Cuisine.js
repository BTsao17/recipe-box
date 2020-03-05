import React from 'react';

class Cuisine extends React.Component {
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
        <label htmlFor="cuisine">Cuisine:</label>
        <input
          name="cuisine"
          list="cuisines"
          type="text"
          placeholder="Cuisine"
          value={this.props.cuisine}
          onChange={this.props.handleChange}
        />
        <datalist id="cuisines">{cuisineOptions}</datalist>
      </div>
    );
  }
}

export default Cuisine;
