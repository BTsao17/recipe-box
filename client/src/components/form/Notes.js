import React from 'react';

class Notes extends React.Component {
  render() {
    //default key is set with index - may need to change once database is set, key will be primary key
    const noteTemplate = this.props.notes.map((note, index) => {
      return (
        <li key={index}>
          <textarea
            data-type="notes"
            data-index={index}
            name="text"
            value={note.text}
            // onChange={this.handleChangeNotesArr}
            onChange={this.props.handleChange}
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
