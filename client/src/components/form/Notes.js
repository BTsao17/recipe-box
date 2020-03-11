import React from 'react';
import update from 'immutability-helper';

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: this.props.notes,
    };
  }
  //to render the correct number of ingredient fields.
  //currently, added input fields are done in redux store
  //alternative option is to have that done in component state, and then update the whole redux state at once.
  componentDidUpdate(prevProps) {
    if (prevProps.notes !== this.props.notes) {
      this.setState({
        notes: this.props.notes,
      });
    }
  }

  onChange = (e) => {
    const { name, value } = e.target;
    const { type, index } = e.target.dataset;

    const newArr = update(this.state.notes, { [index]: { [name]: { $set: value } } });

    this.setState({
      notes: newArr,
    });
  };

  //need to adjust what values actions and reducers will use.
  onBlur = (e) => {
    const { name, value } = e.target;
    const { type, index } = e.target.dataset; //to call for data-* custom attributes
    this.props.updateChange(type, index, name, this.state.notes[index][name]);
  };

  render() {
    //default key is set with index - may need to change once database is set, key will be primary key
    const noteTemplate = this.state.notes.map((note, index) => {
      return (
        <li key={index}>
          <textarea
            data-type="notes"
            data-index={index}
            name="text"
            value={note.text}
            onChange={this.onChange}
            onBlur={note.text !== this.props.notes[index].text ? this.onBlur : null}
          />
        </li>
      );
    });
    return (
      <div>
        <label>Notes:</label>
        <br />
        <ul>{noteTemplate}</ul>
        {this.props.children}
      </div>
    );
  }
}

export default Notes;
