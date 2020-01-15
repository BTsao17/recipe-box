import React from 'react';
import axios from 'axios';
import { Route, Switch, Link, Redirect } from 'react-router-dom';

// function RecipeDetailsTemplate(props) {
//   console.log("recipe dets info",props.match);
//   return <h2>Recipe Details placeholder - {props.match.params.recipe}</h2>;
// }

class RecipeDetailsTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <h2>Recipe Details placeholder - {this.props.match.params.recipe}</h2>
      </React.Fragment>
    );
  }
}

export default RecipeDetailsTemplate;
