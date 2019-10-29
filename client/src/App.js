import React from 'react';
import axios from 'axios';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <header>
          <h1>Recipe Box</h1>
        </header>
        <main>
          <nav>
            <ul>
              <li>
                <Link to="/appetizers">Appetizers</Link>
              </li>
              <li>
                <Link to="/salads">Salads</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/appetizers">
              <Appetizers />
            </Route>
            <Route path="/salads">
              <Salads />
            </Route>
            <Route path="*">
              <Error />
            </Route>
          </Switch>
        </main>
        <footer>
          <p>Footer</p>
        </footer>
      </React.Fragment>
    );
  }
}

//functional or dummy components
function Home() {
  return <h2>Home</h2>;
}

function Appetizers() {
  return <h2>Appetizers</h2>;
}

function Salads() {
  return <h2>Salads</h2>;
}

function Error() {
  return (
    <React.Fragment>
      <h2>404</h2>
      <p>The page you are looking for cannot be found.</p>
    </React.Fragment>
  );
}

export default App;
