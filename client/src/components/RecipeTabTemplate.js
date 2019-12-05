import React from 'react';
import axios from 'axios';
import { Route, Switch, Link, Redirect } from 'react-router-dom';

// function component alternative
/*
function RecipeTab(props) {
  const { type } = props;
  return (
    <React.Fragment>
      <h2>{type}</h2>
      <p>This is the recipe page for {type.toLowerCase()}.</p>
    </React.Fragment>
  );
}
*/

class RecipeTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render(){
    const {type} = this.props;
    return (
      <React.Fragment>
        <h2>{type}</h2>
        <p>This is the recipe page for {type.toLowerCase()}.</p>
      </React.Fragment>
    )
  }
}

export default RecipeTab;
