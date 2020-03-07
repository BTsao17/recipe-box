import React from 'react';

class Procedure extends React.Component {
  render() {
    //default key is set with index - may need to change once database is set, key will be primary key
    const procedureTemplate = this.props.procedure.map((step, index) => {
      return (
        <li key={index}>
          <textarea
            data-type="procedure"
            data-index={index}
            name="description"
            value={step.description}
            onChange={this.props.handleChange}
          />
        </li>
      );
    });
    return (
      <div>
        <label>Procedure:</label>
        <br />
        <ol>{procedureTemplate}</ol>
        {this.props.children}
      </div>
    );
  }
}

export default Procedure;
