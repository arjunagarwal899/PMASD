import React, { useEffect } from 'react';

import { Collapse } from "antd";

import PatientContainerWithOptions from "containers/PatientBasicContainer/PatientContainerWithOptions";
import BaseContainer from "containers/BaseContainer";
import PatientHistoryContainer from "containers/PatientHistoryContainer";


const ConsultationContainer = () => {
	
	useEffect(() => {
		document.title = 'Consultation | PMASD';
	}, []);
	
	return (
		<BaseContainer>
			<Collapse defaultActiveKey="patient-basic">
				<Collapse.Panel key="patient-basic" header="Patient Details">
					<PatientContainerWithOptions />
				</Collapse.Panel>
			</Collapse>
			<PatientHistoryContainer />
		</BaseContainer>
	);
};

export default ConsultationContainer;
