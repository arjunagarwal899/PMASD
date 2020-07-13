import React from "react";
import { Form, Input, InputNumber, Select } from "antd";

const { Option } = Select;

const VitalExamination = () => {
	const [form] = Form.useForm();

	const onSubmit = (values) => {
		console.log(values);
	};

	return (
		<Form form={form} name='control-hooks' onFinish={onSubmit}>
			<Form.Item
				name='temperature'
				label='Temperature'
				rules={[
					{ required: true, message: "Please select a temperature type" },
				]}
			>
				<Select placeholder='Select a temperature type' allowClear>
					<Option value='afebrile'>Afebrile</Option>
					<Option value='febrile'>Febrile</Option>
				</Select>
			</Form.Item>

			<Form.Item
				noStyle
				shouldUpdate={(prevValues, currentValues) =>
					prevValues.temperature !== currentValues.temperature
				}
			>
				{({ getFieldValue }) => {
					return getFieldValue("temperature") === "other" ? (
						<Form.Item
							name='temperatureInFahrenheit'
							label='Enter Temperature in Fahrenheit'
							rules={[{ required: true, message: "Please enter this field!" }]}
						>
							<Input />
						</Form.Item>
					) : null;
				}}
			</Form.Item>

			<Form.Item
				name='pulse'
				label='Pulse'
				rules={[{ required: true, message: "Please enter this field!" }]}
			>
				<InputNumber min={1} max={200} defaultValue={72} />
			</Form.Item>

			<Form.Item
				name='bloodPressure'
				label='Blood Pressure'
				rules={[{ required: true, message: "Please enter this field!" }]}
			>
				<Input.Group compact>
					<InputNumber
						style={{ width: "50%" }}
						placeholder='Systolic'
						min={1}
						max={400}
					/>
					<InputNumber
						style={{ width: "50%" }}
						placeholder='Diastolic'
						min={1}
						max={200}
					/>
				</Input.Group>
			</Form.Item>

			<Form.Item
				name='respiratoryRate'
				placeholder='Respiratory Rate'
				rules={[{ required: true, message: "Please enter this field!" }]}
			>
				<InputNumber min={0} max={50} defaultValue={18} />
			</Form.Item>

			<Form.Item name='spo2' placeholder='SPO2'>
				<InputNumber
					defaultValue={100}
					min={0}
					max={100}
					formatter={(value) => `${value}%`}
					parser={(value) => value.replace("%", "")}
				/>
			</Form.Item>

			<Form.Item name='hgt' placeholder='HGT'>
				<InputNumber min={0} max={1000} />
			</Form.Item>
		</Form>
	);
};

export default VitalExamination;
