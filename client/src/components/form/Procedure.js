import React from 'react';

class Procedure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      procedure: this.props.procedure,
    };
  }

  //to render the correct number of ingredient fields.
  //currently, added input fields are done in redux store
  //alternative option is to have that done in component state, and then update the whole redux state at once.
  componentDidUpdate(prevProps) {
    if (prevProps.procedure !== this.props.procedure) {
      this.setState({
        procedure: this.props.procedure,
      });
    }
  }

  onChange = (e) => {
    const { name, value } = e.target;
    const { type, index } = e.target.dataset;

    let copyArr = JSON.parse(JSON.stringify(this.state.procedure)); //immutability helper.
    copyArr[index][name] = value;

    this.setState({
      procedure: copyArr,
    });
  };

  //need to adjust what values actions and reducers will use.
  onBlur = (e) => {
    const { name, value } = e.target;
    const { type, index } = e.target.dataset; //to call for data-* custom attributes
    this.props.updateChange(type, index, name, this.state.procedure[index][name]);
  };
  render() {
    //default key is set with index - may need to change once database is set, key will be primary key
    const procedureTemplate = this.state.procedure.map((step, index) => {
      return (
        <li key={index}>
          <textarea
            data-type="procedure"
            data-index={index}
            name="description"
            value={step.description}
            onChange={this.onChange}
            onBlur={this.onBlur}
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
