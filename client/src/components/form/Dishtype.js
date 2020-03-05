import React from 'react';

class Dishtype extends React.Component {
  //datalist option is supported only in some browsers
  //default key is set with index - may need to change once database is set
  generateListOptions = (listType) => {
    return listType.map((type) => {
      return <option key={type} value={type} />;
    });
  };

  render() {
    const dishTypeOptions = this.generateListOptions(this.props.dishList);

    return (
      <div>
        <label htmlFor="dish">Dish Type:</label>
        <input
          name="dish"
          list="dishTypes"
          type="text"
          placeholder="Dish Type"
          value={this.props.dish}
          onChange={this.props.handleChange}
        />
        <datalist id="dishTypes">{dishTypeOptions}</datalist>
      </div>
    );
  }
}

export default Dishtype;
