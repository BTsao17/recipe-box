import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRecipeList } from '../actions';

// function component alternative
/*
function RecipeTabTemplate(props) {
  const { type } = props;
  return (
    <React.Fragment>
      <h2>{type}</h2>
      <p>This is the recipe page for {type.toLowerCase()}.</p>
    </React.Fragment>
  );
}
*/

class RecipeTabTemplate extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     recipeList: [],
  //   };
  // }

  componentDidMount() {
    //only fetch if going to new Recipe Tab
    const { recipeList } = this.props;
    const { type } = this.props.match.params;
    const sameDishTypeTab = recipeList.find(({ dish }) => dish === type.toLowerCase());
    console.log(sameDishTypeTab);
    if (!recipeList.length || !sameDishTypeTab) {
      this.getPageData();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.type !== this.props.match.params.type) {
      this.getPageData();
    }
  }

  getPageData = () => {
    const { type } = this.props.match.params;
    this.props.fetchRecipeList(type);
    // axios
    //   .get(`http://localhost:8080/${type}`)
    //   .then((response) => {
    //     console.log(response.data);
    //     this.setState({
    //       recipeList: response.data,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  render() {
    const { match, dishTypes } = this.props;
    const dishType = match.params.type;
    console.log('recipeList', this.props.recipeList);

    const recipeLinks = this.props.recipeList.map((recipe) => {
      const recipeTitleDash = recipe.title.toLowerCase().split(' ').join('-');
      return (
        <li key={recipe.id}>
          <Link to={`${match.url}/${recipe.id}/${recipeTitleDash}`}>{recipe.title}</Link>
        </li>
      );
    });

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
          <h2>{dishType}</h2>
          <p>This is the recipe page for {dishType.toLowerCase()}.</p>
          {this.props.recipeList.length !== 0 && (
            <React.Fragment>
              <p>Listing Links:</p>
              <ul>{recipeLinks}</ul>
            </React.Fragment>
          )}
        </React.Fragment>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    dishTypes: state.dishTypes.items,
    recipeList: state.recipeList.items,
  };
}
const mapDispatchToProps = {
  fetchRecipeList,
};

//export default RecipeTabTemplate;
export default connect(mapStateToProps, mapDispatchToProps)(RecipeTabTemplate);
