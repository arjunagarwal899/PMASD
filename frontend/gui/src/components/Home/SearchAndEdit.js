import React from "react";
// import "antd/dist/antd.css";
import { Card, Col } from "antd";

const searchAndEditLinks = [
  {
    name: "Patient [Id, Name, Mobile,....]",
    color: "",
    span: 4,
  },
  {
    name: "Medicines",
    color: "",
    span: 4,
  },
  {
    name: "Payables",
    color: "",
    span: 4,
  },
  {
    name: "Suspense [Transaction, Amt, TDS,....]",
    color: "",
    span: 4,
  },
  {
    name: "Doctor [Name, Mobile,....]",
    color: "",
    span: 4,
  },
  {
    name: "Prescription",
    color: "",
    span: 4,
  },
  {
    name: "Receivables",
    color: "",
    span: 4,
  },
  {
    name: "Cash Patient Records",
    color: "",
    span: 4,
  },
  {
    name: "Hospital [Balance,...]",
    color: "",
    span: 4,
  },
  {
    name: "Receipt No",
    color: "",
    span: 4,
  },
  {
    name: "Cheque [Nos, Amt, Name,....]",
    color: "",
    span: 4,
  },
  {
    name: "Cheque To Cash",
    color: "",
    span: 4,
  },
  {
    name: "Ledger wise",
    color: "",
    span: 4,
  },
  {
    name: "",
    color: "",
    span: 4,
  },
  {
    name: "Credit Cards",
    color: "",
    span: 4,
  },
  {
    name: "",
    color: "",
    span: 4,
  },
];

const SearchAndEdit = () => {
  return (
    <React.Fragment>
      {searchAndEditLinks.map((searchAndEdit, index) => {
        return (
          <Col span={searchAndEdit.span}>
            {" "}
            <Card
              hoverable
              style={{ backgroundColor: searchAndEdit.color }}
              key={index}
            >
              {searchAndEdit.name}
            </Card>
          </Col>
        );
      })}
    </React.Fragment>
  );
};

export default SearchAndEdit;
