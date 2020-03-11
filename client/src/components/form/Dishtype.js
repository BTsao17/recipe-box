import React from 'react';

class Dishtype extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dish: this.props.dish,
    };
  }

  onChange = (e) => {
    this.setState({
      dish: e.target.value,
    });
  };

  onBlur = (e) => {
    this.props.updateChange(e.target.name, this.state.dish);
  };

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
          value={this.state.dish}
          onChange={this.onChange}
          onBlur={this.state.dish !== this.props.dish ? this.onBlur : null}
        />
        <datalist id="dishTypes">{dishTypeOptions}</datalist>
      </div>
    );
  }
}

export default Dishtype;
