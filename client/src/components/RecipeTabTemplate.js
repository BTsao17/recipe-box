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
    this.state = {
      recipeList: [],
    };
  }

  componentDidMount() {
    this.getPageData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.type !== this.props.match.params.type) {
      this.getPageData();
    }
  }

  getPageData = () => {
    const { type } = this.props.match.params;
    axios
      .get(`http://localhost:8080/${type}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          recipeList: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    // const {type, recipes} = this.props;
    const { dishTypes } = this.props;
    const dishType = this.props.match.params.type;

    const recipeLinks = this.state.recipeList.map((recipe) => {
      return (
        <li key={recipe.id}>
          <Link to={recipe.title}>{recipe.title}</Link>
        </li>
      )
    })

    const recipePaths = null;

    //conditional rendering - 404 error page
    if (!dishTypes.includes(dishType)) {
      return (
        <React.Fragment>
          <h2>404</h2>
          <p>The page you are looking for cannot be found.</p>
        </React.Fragment>
      );
    }
    else {
      return (
        <React.Fragment>
          {/* <h2>{type}</h2>
          <p>This is the recipe page for {type.toLowerCase()}.</p>
          <p>listing links:</p> */}

          <h2>{dishType}</h2>
          <p>This is the recipe page for {dishType.toLowerCase()}.</p>
          <p>Listing Links:</p>
          {/* conditional rendering of list, only has bullets if recipes list has items */}
          {this.state.recipeList.length !== 0 && <ul>{recipeLinks}</ul>}
        </React.Fragment>
      );
    }
  }
}

export default RecipeTab;