import React from 'react';

class Time extends React.Component {
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
            value={this.props.time[0].prep}
            onChange={this.props.handleChange}
          />
          <select
            data-type="time"
            data-index="0"
            name="unit"
            value={this.props.time[0].unit}
            onChange={this.props.handleChange}
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
            value={this.props.time[1].cook}
            onChange={this.props.handleChange}
          />
          <select
            data-type="time"
            data-index="1"
            name="unit"
            value={this.props.time[1].unit}
            onChange={this.props.handleChange}
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
