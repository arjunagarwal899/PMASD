import React, { useEffect, useRef, useState } from 'react';
import { connect } from "react-redux";
import moment from "moment";
import _ from 'lodash';

import { Button, Input, message, Table } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

import { patientHistoryCreate, patientHistoryDelete, patientHistoryList, patientHistoryReset } from "myredux";
import MyDatePicker from 'components/MyDatePicker';
import maxlengths from "constants/maxlengths";


// A component to display the history details of a particular type of a particular patient in a tabular format.
// Props:
// type: the type of history to be displayed (Eg. past, present etc.)
// patientID: the patient id of the pateint who's history is to be displayed
// title (optional): the title of the table if desired
const PatientHistory = props => {
	
	const { type, patientID, historyData, title } = props;
	
	// hook to manage the disabled state of the component. Will be disabled if no 'type' or 'patientID' has been provided or if indicated by parent component
	const [disabled, setDisabled] = useState(null);
	
	// Hook to control the component which allows user to add new history to the table
	const newHistoryRef = useRef(null);
	// Hooks to control the value of the three input boxes which allow user to add new history data
	const [newHistoryState, setNewHistoryState] = useState(null);
	const [newDurationState, setNewDurationState] = useState(null);
	const [newDescriptionState, setNewDescriptionState] = useState(null);
	
	// Hook to indicate loading of the component when history data is being retrieved
	const [listLoading, setListLoading] = useState(false);
	
	// Funciton to indicate the loading of the "add new history" row in the table when adding new history data
	const AddLoading = () => {
		for (let x of props.loading) {
			if (x.actionType === 'create') {
				return <LoadingOutlined />;
			}
		}
		
		return null;
	};
	
	// Function to indicate the loading of the "delete row" in the table when deleting a particular history data
	const DeleteLoading = ({ historyKey }) => {
		for (let x of props.loading) {
			if (x.actionType === 'delete' && x.historyKey === historyKey) {
				return <LoadingOutlined />;
			}
		}
		
		return null;
	};
	
	
	// Columns of the table
	const columns = [
		{
			title: 'Date Created',
			key: 'created',
			dataIndex: 'created',
			render: value => {
				if (value instanceof moment) return value.format('DD-MMM-YYYY');
				
				return value;
			},
			sorter: (x, y) => {
				if (typeof x.created === 'object' && !(x.created instanceof moment)) return -1;
				if (typeof y.created === 'object' && !(y.created instanceof moment)) return 1;
				
				if (x.created.isBefore(y.created)) return -1;
				else return 1;
			},
			sortDirections: ['ascend'],
		},
		{
			title: 'History',
			key: 'history',
			dataIndex: 'history',
		},
		{
			title: 'Duration',
			key: 'duration',
			dataIndex: 'duration',
		},
		{
			title: 'Description',
			key: 'description',
			dataIndex: 'description',
		},
		{
			title: 'Operation',
			key: 'operation',
			dataIndex: 'operation',
			render: (value, record) => (
				<React.Fragment>
					{/*Button which displays 'Add' in the "add new history" row of the table and displays 'Delete' in the remaining rows of the table.*/}
					{/*Implements the onClick functionality accordingly*/}
					<Button type="default"
					        disabled={disabled}
					        onClick={
						        record.handleOperation ?
							        () => {
								        if (!newHistoryState || newHistoryState === '') {
									        message.warning('Patient History is compulsary.');
								        } else {
									        record.handleOperation(type, patientID, {
										        history: newHistoryState,
										        duration: newDurationState,
										        description: newDescriptionState,
									        }).then(() => {
										        setNewHistoryState(null);
										        setNewDurationState(null);
										        setNewDescriptionState(null);
										
										        newHistoryRef.current.focus();
									        });
								        }
							        }
							
							        :
							
							        () => {
								        props.delete(type, patientID, record);
							        }
					        }
					>
						{value || 'Delete'}
						{/*Loading icon displayed when 'Add' or 'Delete' transaction is occuring*/}
						{value ?
							record.handleOperationLoading
							:
							<DeleteLoading historyKey={record.key} />
						}
					</Button>
				</React.Fragment>
			),
		}
	];
	
	// The 'add new history' row details
	const addNewDataRow = [
		{
			key: `add-new-${type}-history`,
			created: <MyDatePicker disabled={true} value={moment()} suffixIcon={null} />,
			history: <Input maxLength={maxlengths.patientHistory_History}
			                allowClear
			                disabled={disabled}
			                ref={newHistoryRef}
			                value={newHistoryState}
			                onChange={event => setNewHistoryState(event.target.value)} />,
			duration: <Input maxLength={maxlengths.patientHistory_Duration}
			                 allowClear
			                 disabled={disabled}
			                 value={newDurationState}
			                 onChange={event => setNewDurationState(event.target.value)} />,
			description: <Input.TextArea maxLength={maxlengths.patientHistory_Description}
			                             allowClear
			                             disabled={disabled}
			                             autoSize={{ minRows: 1, maxRows: 3 }}
			                             value={newDescriptionState}
			                             onChange={event => setNewDescriptionState(event.target.value)} />,
			operation: 'Add',
			handleOperation: props.create,
			handleOperationLoading: <AddLoading />,
		}
	];
	
	
	// Hook for debugging purposes
	// useEffect(() => {
	// 	console.log(`rendering ${type} history`);
	// });
	
	
	// Hook to determine the value of the listLoading state of the component
	useEffect(() => {
		let loadingSetFlag = false;             // Flag so that value is changed only if necessary
		for (const x of props.loading) {
			if (x.actionType === 'list') {
				setListLoading(true);
				loadingSetFlag = true;
				break;
			}
		}
		if (!loadingSetFlag) {
			setListLoading(false);
		}
	}, [props.loading]);
	
	
	// Hook to determine the disabled state of the component
	useEffect(() => {
		setDisabled(props.disabled || !(type && patientID));
	}, [props.disabled, type, patientID]);      // eslint-disable-line
	
	// Hook to determine whether provided 'patientID' and 'type' are present or not and act accordingly
	useEffect(() => {
		if (type && patientID) {
			props.list(type, patientID);
		} else if (!patientID) {
			props.reset(type);
		}
	}, [type, patientID]);      // eslint-disable-line
	
	
	return (
		<React.Fragment>
			<Table title={() => `${title}`}
			       size="small"
			       bordered
			       disabled={disabled}
			       showSorterTooltip={false}
			       pagination={false}
				// scroll={{ y: 300 }}
				   loading={listLoading}
				
				   columns={columns}
				   dataSource={[...addNewDataRow, ...historyData]}
			/>
		</React.Fragment>
	);
};


const mapStateToProps = (state, ownProps) => {
	let loading = [];
	for (const loadingItem of state.patient.history.loading) {
		if (loadingItem.historyType === ownProps.type) {
			loading.push(loadingItem);
		}
	}
	
	return {
		historyData: state.patient.history.historyData[ownProps.type],
		loading: loading,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		list: (historyType, patientID) => dispatch(patientHistoryList(historyType, patientID)),
		create: (historyType, patientID, historyData) => dispatch(patientHistoryCreate(historyType, patientID, historyData)),
		delete: (historyType, patientID, historyData) => dispatch(patientHistoryDelete(historyType, patientID, historyData)),
		reset: historyType => dispatch(patientHistoryReset(historyType)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(React.memo(
	PatientHistory,
	(prevProps, nextProps) => {
		return _.isEqual(prevProps, nextProps);
	})
);
