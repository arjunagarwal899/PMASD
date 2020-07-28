import React, { useEffect, useRef, useState } from 'react';
import { connect } from "react-redux";
import moment from "moment";

import { Button, Input, message, Table } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

import { patientHistoryCreate, patientHistoryDelete, patientHistoryList, patientHistoryReset } from "myredux";
import MyDatePicker from 'components/MyDatePicker';
import maxlengths from "constants/maxlengths";
import _ from 'lodash';

const PatientHistory = props => {
	
	const { type, patientID, historyData, heading } = props;
	const [disabled, setDisabled] = useState(props.disabled || !(type && patientID));
	
	const newHistory = useRef(null);
	const newDuration = useRef(null);
	const newDescription = useRef(null);
	
	
	const [listLoading, setListLoading] = useState(false);
	
	const AddLoading = () => {
		for (let x of props.loading) {
			if (x.actionType === 'create') {
				return <LoadingOutlined />;
			}
		}
		
		return null;
	};
	
	const DeleteLoading = ({ historyKey }) => {
		for (let x of props.loading) {
			if (x.actionType === 'delete' && x.historyKey === historyKey) {
				return <LoadingOutlined />;
			}
		}
		
		return null;
	};
	
	
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
					<Button type="link"
					        disabled={disabled}
					        onClick={
						        record.handleOperation ?
							        () => {
								        if (!newHistory.current.state.value) {
									        message.warning('Patient History is compulsary.');
								        } else {
									        record.handleOperation(type, patientID, {
										        history: newHistory.current.state.value,
										        duration: newDuration.current.state.value,
										        description: newDescription.current.state.value,
									        }).then(() => {
										        newHistory.current.state.value = '';
										        newDuration.current.state.value = '';
										        newDescription.current.state.value = '';
										
										        newHistory.current.focus();
									        });
								        }
							        }
							
							        :
							
							        () => {
								        props.delete(type, patientID, record.key);
							        }
					        }
					>
						{value || 'Delete'}
					</Button>
					{value ?
						record.handleOperationLoading
						:
						<DeleteLoading historyKey={record.key} />
					}
				</React.Fragment>
			),
		}
	];
	
	const addNewDataRow = [
		{
			key: -1,
			created: <MyDatePicker disabled={true} value={moment()} suffixIcon={null} />,
			history: <Input maxLength={maxlengths.patientHistory_History}
			                allowClear
			                disabled={disabled}
			                ref={newHistory} />,
			duration: <Input maxLength={maxlengths.patientHistory_Duration}
			                 allowClear
			                 disabled={disabled}
			                 ref={newDuration} />,
			description: <Input.TextArea maxLength={maxlengths.patientHistory_Description}
			                             allowClear
			                             disabled={disabled}
			                             autoSize={{ minRows: 1, maxRows: 3 }}
			                             ref={newDescription} />,
			operation: 'Add',
			handleOperation: props.create,
			handleOperationLoading: <AddLoading />,
		}
	];
	
	
	// useEffect(() => {
	// 	console.log(`rendering ${type} history`);
	// });
	
	
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
	
	
	useEffect(() => {
		setDisabled(props.disabled || !(type && patientID));
	}, [props.disabled, type, patientID]);      // eslint-disable-line
	
	useEffect(() => {
		if (type && patientID) {
			props.list(type, patientID);
		} else if (!patientID) {
			props.reset(type);
		}
	}, [type, patientID]);      // eslint-disable-line
	
	return (
		<React.Fragment>
			<Table title={() => `${heading}`}
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
	for (const loadingItem of state.patientHistory.loading) {
		if (loadingItem.historyType === ownProps.type) {
			loading.push(loadingItem);
		}
	}
	
	return {
		historyData: state.patientHistory.historyData[ownProps.type],
		loading: loading
	};
};

const mapDispatchToProps = dispatch => {
	return {
		list: (historyType, patientID) => dispatch(patientHistoryList(historyType, patientID)),
		create: (historyType, patientID, historyData) => dispatch(patientHistoryCreate(historyType, patientID, historyData)),
		delete: (historyType, patientID, historyKey) => dispatch(patientHistoryDelete(historyType, patientID, historyKey)),
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
