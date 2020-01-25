import React from "react";
import Paginations from "./Paginations/Paginations";
import TableHeader from "./TableHeader/TableHeader";
import ExpandedInfo from "./ExpandedInfo/ExpandedInfo";
import AddForm from "./AddForm/AddForm";
import "./Table.css";

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterText: "",
      selectedId: "",
      currentPage: 1,
      itemsPerPage: 50,
      showForm: false,
      data: props.data
    };
  }
  handleSearch = value => {
    this.setState({ filterText: value, currentPage: 1, selectedId: "" });
  };

  handleSelectedId = id => {
    this.setState({ selectedId: id });
  };

  handlePageChange = value => {
    const newVal = this.state.currentPage + value;

    if (newVal >= 1) {
      this.setState({ currentPage: newVal });
    }
  };

  showAddForm = e => {
    e.preventDefault();
    this.setState({ showForm: !this.state.showForm });
  };

  addNewData = newData => {
    //Убираем пользовательские изменения
    const data = [newData, ...this.state.data];
    this.setState({ data, filterText: "", currentPage: 1, selectedId: "" });
  };
  selectSortBy = e => {
    this.setState({ sortBy: e.target.textContent });
  };
  getHeaders = () => {
    return (
      <tr>
        {this.props.headers.map(header => (
          <th onClick={this.selectSortBy} key={header}>
            {header}
          </th>
        ))}
      </tr>
    );
  };
  sortData = data => {
    const sortBy = this.state.sortBy;
    const sortString = (a, b) => ("" + a).localeCompare(b);
    const sortNumbers = (a, b) => a - b;
    const sortPhoneNumbers = (a, b) =>
      a.replace(/\D+/g, "") - b.replace(/\D+/g, "");

    switch (sortBy) {
      case "id":
        return data.sort((a, b) => sortNumbers(a[sortBy], b[sortBy]));
      case "phone":
        return data.sort((a, b) => sortPhoneNumbers(a[sortBy], b[sortBy]));
      default:
        return data.sort((a, b) => sortString(a[sortBy], b[sortBy]));
    }
  };
  getTotalPages = arr => {
    const itemsPerPage = this.state.itemsPerPage;
    if (arr.length === 0) {
      return 1;
    }
    return Math.ceil(arr.length / itemsPerPage);
  };
  componentDidUpdate(prevState) {
    // Если через пропсы передаются данные и в стейте data пустое
    if (this.props.data.length && !this.state.data.length) {
      this.setState({ data: this.props.data });
    }
  }
  render() {
    const itemsPerPage = this.state.itemsPerPage;
    const currentPage = this.state.currentPage;
    const filterText = this.state.filterText;
    const selectedId = this.state.selectedId;
    const showForm = this.state.showForm;
    const data = this.state.data;
    const rows = [];
    // т.к filteredData может изменятся из за пользователя, объявляем через let
    let filteredData = [];

    const headers = this.getHeaders();

    for (let i = 0; i < data.length; i++) {
      const obj = data[i];

      /* 
      Пройтись по значениям объекта и сравнить со стрoкой поиска, 
      если есть подстрока сохраняем объект
      */

      // Если строка фильтра пустая тогда добавляем каждый объект
      if (!filterText) {
        filteredData.push(obj);
      } else {
        /* 
        Иначе если строка фильтра не пустая тогда
        инициализируем отфильтрованный объект
         */
        const filteredObj = {};

        /* Фильтруем по заголовкам таблицы */
        for (const key of this.props.headers) {
          filteredObj[key] = String(obj[key]);
        }
        const values = Object.values(filteredObj);
        for (const value of values) {
          // Если есть совпадение с пользовательским вводом в фильтре, тогда добавляем НЕОТФИЛЬТРОВАННЫЙ объект
          if (value.includes(filterText)) {
            filteredData.push(obj);
            break;
          }
        }
      }
    }

    filteredData = this.sortData(filteredData);
    // Всего страниц
    const totalPages = this.getTotalPages(filteredData);

    // Формируем строки и добавляем в массив строк
    // Этот цикл будет показывать только отфильтрованные данные
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;

    for (let i = start; i <= end; i++) {
      const obj = filteredData[i];
      // Если мы не получили объект из массива, тогда прерываем цикл чтобы не получить ошибку
      if (!obj) break;

      const newObj = {};
      for (const key of this.props.headers) {
        newObj[key] = obj[key];
      }

      const values = Object.values(newObj);
      const key = values.join("");
      const { id } = newObj;

      // Формирую строки
      const row = (
        <tr key={key} onClick={() => this.handleSelectedId(id)}>
          {values.map((v, index) => {
            return <td key={v + index}>{v}</td>;
          })}
        </tr>
      );
      rows.push(row);
    }

    // Данные о человеке для ExpandedInfo
    const info = filteredData.find(element => {
      return element.id === selectedId;
    });

    return (
      <div>
        {showForm && (
          <AddForm
            onAddNewData={this.addNewData}
            headers={this.props.headers}
          />
        )}
        <TableHeader
          onInputChange={this.handleInputChange}
          inputValue={this.state.inputValue}
          onShowAddForm={this.showAddForm}
          onSearch={this.handleSearch}
          showForm={showForm}
        ></TableHeader>
        <table id="table" className="table table-striped table-bordered">
          <thead>{headers}</thead>
          <tbody>{rows}</tbody>
        </table>
        <Paginations
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
        />
        {selectedId && <ExpandedInfo info={info} />}
      </div>
    );
  }
}

export default Table;
