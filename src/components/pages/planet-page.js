import React, { Component } from "react";
import Row from "../row";
import { PlanetDetails, PlanetList } from "../sw-component";

export default class PlanetPage extends Component {
  state = {
    selectedItem: 1,
  };

  onItemSelected = (selectedItem) => {
    this.setState({ selectedItem });
  };

  render() {
    const { selectedItem } = this.state;
    return (
      <Row
        left={<PlanetList onItemSelected={this.onItemSelected} />}
        right={<PlanetDetails itemId={selectedItem} />}
      />
    );
  }
}
