import React, { useEffect } from 'react';

import { Collapse } from "antd";

import PatientContainer from "containers/PatientContainer/PatientContainer";
import BaseContainer from "containers/BaseContainer";


const ConsultationContainer = () => {
	
	useEffect(() => {
		document.title = 'Consultation | PMASD';
	}, []);
	
	return (
		<BaseContainer>
			<Collapse defaultActiveKey="patient-basic">
				<Collapse.Panel key="patient-basic" header="Patient Details">
					<PatientContainer />
				</Collapse.Panel>
			</Collapse>
		</BaseContainer>
	);
};

export default ConsultationContainer;
