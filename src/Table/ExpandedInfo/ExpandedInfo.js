import React from "react";

const ExpandedInfo = function(props) {
  const addressHelper = {
    streetAddress: "Адрес проживания",
    city: "Город",
    state: "Провинция",
    zip: "Индекс"
  };
  const address = [];

  for (const key in props.info.address) {
    if (props.info.address.hasOwnProperty(key)) {
      const value = props.info.address[key];
      const russianKey = addressHelper[key];
      const row = (
        <p key={key}>
          {russianKey}: <b>{value ? value : ""}</b>
        </p>
      );
      address.push(row);
    }
  }
  return (
    <div className="text-left pb-5">
      Выбран пользователь <b>{props.info.firstName}</b>
      <br />
      <br />
      <strong>Описание:</strong>
      <br />
      <textarea defaultValue={props.info.description}></textarea>
      <br />
      <br />
      <address>{address}</address>
    </div>
  );
};

export default ExpandedInfo;
