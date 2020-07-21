import React, { Componet } from "react";

import ItemList from "../item-list/item-list";
import PersonDetails from "../person-details/person-details";
import ErrorIndicator from "../error-indicator/error-indicator";

import "./person-page.css";

export default class PersonPage extends Componet {
  state = {
    selectedPerson: 3,
    hasError: false,
  };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  onPersonSelected = (selectedPerson) => {
    this.setState({ selectedPerson });
  };

  render() {
    if (this.setState.hasError) {
      return <ErrorIndicator />;
    }

    return (
      <div className="row mb2">
        <div className="col-md-6">
          <ItemList onItemSelected={this.onPersonSelected} />
        </div>
        <div className="col-md-6">
          <PersonDetails personId={this.state.selectedPerson} />
        </div>
      </div>
    );
  }
}
