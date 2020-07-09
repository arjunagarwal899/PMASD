import React from "react";
import "antd/dist/antd.css";
import { Card, Col } from "antd";

const entryLinks = [
  {
    name: "OPD",
    color: "",
    span: 4,
  },
  {
    name: "Payments",
    color: "",
    span: 4,
  },
  {
    name: "Medical Receipts Reconciliation",
    color: "",
    span: 4,
  },
  {
    name: "Profile",
    color: "",
    span: 4,
  },
  {
    name: "Referral Fees",
    color: "",
    span: 4,
  },
  {
    name: "IPO",
    color: "",
    span: 4,
  },
  {
    name: "Depreciation",
    color: "",
    span: 4,
  },
  {
    name: "Bank Reconciliation",
    color: "",
    span: 4,
  },
  {
    name: "Masters",
    color: "",
    span: 4,
  },
  {
    name: "Notes",
    color: "",
    span: 4,
  },
  {
    name: "Receipts (Non-Medical)",
    color: "",
    span: 4,
  },
  {
    name: "Journal Voucher",
    color: "",
    span: 4,
  },
  {
    name: "Credit Card Reconciliation",
    color: "",
    span: 4,
  },
  {
    name: "Ledger",
    color: "",
    span: 4,
  },
  {
    name: "ScreenSavers/Goals/Affirmations",
    color: "",
    span: 4,
  },
];

const Entries = () => {
  return (
    <React.Fragment>
      {entryLinks.map((entry, index) => {
        return (
          <Col span={entry.span}>
            {" "}
            <Card
              hoverable
              style={{ backgroundColor: entry.color }}
              key={index}
            >
              {entry.name}
            </Card>
          </Col>
        );
      })}
    </React.Fragment>
  );
};

export default Entries;
