import React from "react";
import Table from "./Table/Table";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], error: null, isLoaded: false, loading: false };
  }
  loadData = dataSize => {
    const data =
      dataSize === "big"
        ? " http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
        : "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
    this.setState({ loading: true });
    axios.get(data).then(response => {
      if (response.error) {
        this.setState({
          isLoaded: true,
          loading: false,
          error: response.error
        });
      } else {
        this.setState({ data: response.data, isLoaded: true, loading: false });
      }
    });
  };
  render() {
    const data = this.state.data;
    const isLoaded = this.state.isLoaded;
    const loading = this.state.loading;
    const error = this.state.error;
    const headers = ["id", "firstName", "lastName", "email", "phone"];

    if (!data.length && !loading) {
      return (
        <>
          <h1>Сколько данных загрузить?</h1>
          <button
            className="btn btn-primary"
            onClick={() => this.loadData("small")}
          >
            Мало данных
          </button>
          <button
            className="btn btn-primary"
            onClick={() => this.loadData("big")}
          >
            Много данных
          </button>
        </>
      );
    }
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
