import React from "react";

class TableHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: "" };
  }
  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };
  onSearch = e => {
    e.preventDefault();
    this.props.onSearch(this.state.inputValue);
  };
  render() {
    const inputValue = this.state.inputValue;
    const showForm = this.props.showForm;
    return (
      <>
        <div className="container ">
          <form action="" className="form-inline row py-2 d-flex">
            <input
              type="text"
              className="form-control col-6"
              value={inputValue}
              onChange={this.handleInputChange}
              placeholder="Найти"
            />
            <button onClick={this.onSearch} className="btn btn-dark ml-2 col-2">
              Найти
            </button>
            <button
              onClick={this.props.onShowAddForm}
              className="ml-auto btn btn-primary"
            >
              {!showForm ? "Добавить..." : "Убрать форму"}
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default TableHeader;
