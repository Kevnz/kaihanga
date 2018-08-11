import "./App.css";

import React, { Component } from "react";

import { Helmet } from "react-helmet";
import Logo from "./components/logo";
import to from "to-case";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modelName: "",
      properties: [],
      genString: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.addProperty = this.addProperty.bind(this);
    this.getString = this.getString.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  addProperty() {
    const props = this.state.properties.slice(0);
    props.push({ name: "", type: "" });
    this.setState({
      properties: props
    });
  }
  handleModelChange(event) {
    this.setState({
      modelName: to.capital(event.target.value)
    });
  }
  getString() {
    console.log("the inputs", this.input);
    const inputs = Object.keys(this.input);

    const attrs = inputs.map(
      k => `${this.input[k].value}:${this.inputTypes[k].value}`
    );
    this.setState({
      genString: `-- ${this.state.modelName} --attributes ${attrs.join(",")}`
    });
  }
  render() {
    if (!this.input) {
      this.input = {};
    }
    if (!this.inputTypes) {
      this.inputTypes = {};
    }
    const properties = this.state.properties.map(({ name, type }, index) => (
      <div key={`property-row-${index}`}>
        <input
          type="text"
          defaultValue="name"
          ref={input => (this.input[index] = input)}
        />{" "}
        -
        <select ref={input => (this.inputTypes[index] = input)}>
          <option>string</option>
          <option>integer</option>
          <option>bigint</option>
          <option>date</option>
          <option>dateonly</option>
          <option>boolean</option>
          <option>json</option>
          <option>jsonb</option>
          <option>uuid</option>
        </select>
      </div>
    ));
    return (
      <div className="App">
        <Helmet>
          <meta charSet="utf-8" />
          <title>
            Kaihanga - (noun) maker, builder, creator, architect, producer,
            drafter.
          </title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <header className="App-header">
          <Logo />
          <h1 className="App-title">Kaihanga</h1>
        </header>
        <p className="App-intro">Enter a model name to begin.</p>
        <input
          name="modelName"
          type="text"
          value={this.state.modelName}
          onChange={this.handleModelChange}
        />
        <div>
          <h3>{this.state.modelName}</h3>
          <div>
            {properties}
            <div onClick={this.addProperty} className="button">
              Add A Property
            </div>
          </div>
          <div onClick={this.getString} className="button">
            {" "}
            Generate String
          </div>
        </div>
        <div>{this.state.genString}</div>
      </div>
    );
  }
}

export default App;
