import React from "react";
// import "antd/dist/antd.css";
import { Card, Col } from "antd";

const reportLinks = [
	{
		name: "P&L",
		color: "#721e43",
		span: 4,
	},
	{
		name: "Bank Balance & Statement",
		color: "#127ef6",
		span: 4,
	},
	{
		name: "FD",
		color: "yellow",
		span: 4,
	},
	{
		name: "Medical Income",
		color: "lightgreen",
		span: 4,
	},
	{
		name: "Prof Expenses",
		color: "orange",
		span: 4,
	},
	{
		name: "Income Tax",
		color: "coral",
		span: 4,
	},
	{
		name: "Loans",
		color: "lightblue",
		span: 4,
	},
	{
		name: "Patient Analysis",
		color: "purple",
		span: 4,
	},
	{
		name: "Trial Balance",
		color: "orange",
		span: 4,
	},
	{
		name: "Cash In Hand",
		color: "blue",
		span: 4,
	},
	{
		name: "MF",
		color: "red",
		span: 4,
	},
	{
		name: "Business Income",
		color: "",
		span: 4,
	},
	{
		name: "Non-P&L Expenses",
		color: "indigo",
		span: 4,
	},
	{
		name: "Professional Tax",
		color: "green",
		span: 4,
	},
	{
		name: "Gifts",
		color: "lightgreen",
		span: 4,
	},
	{
		name: "Doctor Analysis",
		color: "grey",
		span: 4,
	},
	{
		name: "Capital Amount",
		color: "white",
		span: 4,
	},
	{
		name: "Payables",
		color: "#127621",
		span: 4,
	},
	{
		name: "TFB",
		color: "#2e8210",
		span: 4,
	},
	{
		name: "Interest Income",
		color: "#1281fa",
		span: 4,
	},
	{
		name: "Salary",
		color: "#292394",
		span: 4,
	},
	{
		name: "Advance Tax",
		color: "#bc3328",
		span: 4,
	},
	{
		name: "Jewellery",
		color: "#ba8721",
		span: 4,
	},
	{
		name: "Hospital Analysis",
		color: "#d21819",
		span: 4,
	},
	{
		name: "Computation of Income Tax",
		color: "#067ba4",
		span: 4,
	},
	{
		name: "Receivables",
		color: "#ab8965",
		span: 4,
	},
	{
		name: "Insurance",
		color: "#231bde",
		span: 4,
	},
	{
		name: "Tax Free income",
		color: "#23e981",
		span: 4,
	},
	{
		name: "",
		color: "#009876",
		span: 4,
	},
	{
		name: "Self-Assessment tax",
		color: "#123456",
		span: 4,
	},
	{
		name: "Asset blocks",
		color: "#098765",
		span: 4,
	},
	{
		name: "Income Analysis",
		color: "#abcdef",
		span: 4,
	},
];

const Reports = () => {
	return (
		<React.Fragment>
			{reportLinks.map((report, index) => {
				return (
					<Col span={report.span}>
						{" "}
						<Card
							hoverable
							style={{ backgroundColor: report.color }}
							key={index}
						>
							{report.name}
						</Card>
					</Col>
				);
			})}
		</React.Fragment>
	);
};

export default Reports;
