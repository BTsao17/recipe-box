import React from 'react';

class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.props.time,
    };
  }

  onChange = (e) => {
    const { name, value } = e.target;
    const { type, index } = e.target.dataset;

    let copyArr = JSON.parse(JSON.stringify(this.state.time)); //immutability helper.
    copyArr[index][name] = value;

    this.setState({
      time: copyArr,
    });
  };

  //need to adjust what values actions and reducers will use.
  onBlur = (e) => {
    const { name, value } = e.target;
    const { type, index } = e.target.dataset; //to call for data-* custom attributes
    this.props.updateChange(type, index, name, this.state.time[index][name]);
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <label htmlFor="prep">Prep Time:</label>
          <input
            data-type="time"
            data-index="0"
            name="prep"
            type="number" //when set state, it automatically becomes a string.
            min="0"
            value={this.state.time[0].prep}
            onChange={this.onChange}
            onBlur={this.onBlur}
          />
          <select
            data-type="time"
            data-index="0"
            name="unit"
            value={this.state.time[0].unit}
            onChange={this.onChange}
            onBlur={this.onBlur}
          >
            <option value="minutes">minutes</option>
            <option value="hours">hours</option>
          </select>
        </div>
        <div>
          <label htmlFor="cook">Cook Time:</label>
          <input
            data-type="time"
            data-index="1"
            name="cook"
            type="number" //when set state, it automatically becomes a string.
            min="0"
            value={this.state.time[1].cook}
            onChange={this.onChange}
            onBlur={this.onBlur}
          />
          <select
            data-type="time"
            data-index="1"
            name="unit"
            value={this.state.time[1].unit}
            onChange={this.onChange}
            onBlur={this.onBlur}
          >
            <option value="minutes">minutes</option>
            <option value="hours">hours</option>
          </select>
        </div>
      </React.Fragment>
    );
  }
}

export default Time;
