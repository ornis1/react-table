import React from "react";
import Table from "./Table/Table";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], error: null, isLoaded: false };
  }
  componentDidMount() {
    const smallData =
      "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
    const bigData =
      " http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";

    axios.get(smallData).then(response => {
      if (response.error) {
        this.setState({
          isLoaded: true,
          error: response.error
        });
      } else {
        this.setState({ data: response.data, isLoaded: true });
      }
    });
  }
  render() {
    const data = this.state.data;
    const isLoaded = this.state.isLoaded;
    const error = this.state.error;
    const headers = ["id", "firstName", "lastName", "email", "phone"];

    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      return (
        <div className="App">
          <div className="container pt-10">
            <Table headers={headers} data={data} />
          </div>
        </div>
      );
    }
  }
}

export default App;
