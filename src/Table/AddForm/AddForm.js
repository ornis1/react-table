import React from "react";

class AddForm extends React.Component {
  constructor(props) {
    super(props);

    const formState = {
      id: { type: "number", value: "" },
      firstName: { type: "text", value: "" },
      lastName: { type: "text", value: "" },
      email: { type: "email", value: "" },
      phone: { type: "tel", value: "" }
    };
    this.state = { formState, isFormValid: false };
  }

  handleOnChange = e => {
    const key = e.target.getAttribute("id").split("_")[1];
    const formState = this.state.formState;
    formState[key].value = e.target.value;

    this.setState({ formState });

    const isValid = this.checkFormValid();

    if (isValid) {
      this.setState({ isFormValid: true });
    }
  };
  handleAddNewData = e => {
    e.preventDefault();
    const data = {};
    for (const key in this.state.formState) {
      if (this.state.formState.hasOwnProperty(key)) {
        const value = this.state.formState[key].value;
        data[key] = value;
      }
    }
    this.props.onAddNewData(data);
    this.resetFormState();
  };
  resetFormState = () => {
    const formState = {
      id: { type: "number", value: "" },
      firstName: { type: "text", value: "" },
      lastName: { type: "text", value: "" },
      email: { type: "email", value: "" },
      phone: { type: "tel", value: "" }
    };
    this.setState({ formState });
  };
  checkFormValid = () => {
    const values = Object.values(this.state.formState).map(v => v.value);
    return values.every(value => value !== "");
  };

  render() {
    const formState = this.state.formState;
    const isFormValid = this.state.isFormValid;
    const cols = [];

    for (const key in formState) {
      if (formState.hasOwnProperty(key)) {
        const input = formState[key];
        const col = (
          <div key={key} className="col">
            <label htmlFor={`input_${key}`}>{key}</label>
            <input
              onChange={this.handleOnChange}
              {...input}
              required
              className="form-control"
              id={`input_${key}`}
            />
          </div>
        );
        cols.push(col);
      }
    }

    return (
      <div className="text-left pb-5 container px-0 mt-4">
        <h5>Заполните данные, чтобы их добавить</h5>
        <form action="" className="form  justify-space-between mt-4">
          <div className="row">{cols}</div>
          <div className="row justify-content-center mt-4">
            <button
              onClick={this.handleAddNewData}
              type="submit"
              disabled={!isFormValid}
              className="btn btn-primary "
            >
              Добавить
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddForm;
