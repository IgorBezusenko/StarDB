import React, { Component } from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorBoundry from "../error-bountry";

import "./app.css";

import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import { SwapiServiceProvider } from "../swapi-service-context";
import {
  PeoplePage,
  PlanetPage,
  StarshipPage,
  LoginPage,
  SecretPage,
} from "../pages";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { StarshipDetails } from "../sw-component";

export default class App extends Component {
  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false,
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true,
    });
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service =
        swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

      return {
        swapiService: new Service(),
      };
    });
  };

  render() {
    const { isLoggedIn } = this.state;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange} />

              <RandomPlanet />

              <Switch>
                <Route
                  path="/"
                  render={() => <h2>Welcome to SterDB</h2>}
                  exact={true}
                />

                <Route path="/people/:id?" component={PeoplePage} />
                <Route path="/planets" component={PlanetPage} />
                <Route path="/starships" exact component={StarshipPage} />
                <Route
                  path="/starships/:id"
                  render={({ match }) => {
                    const { id } = match.params;
                    return <StarshipDetails itemId={id} />;
                  }}
                />
                <Route
                  path="/login"
                  render={() => (
                    <LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin} />
                  )}
                />
                <Route
                  path="/secret"
                  render={() => <SecretPage isLoggedIn={isLoggedIn} />}
                />
                <Route render={() => <h2>Page is not defined</h2>} />
              </Switch>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
