import React, { useEffect } from 'react';

import { Anchor, Col, Collapse, Row } from "antd";

import PatientContainerWithOptions from "containers/PatientBasicContainer/PatientContainerWithOptions";
import BaseContainer from "containers/BaseContainer";
import PatientHistoryContainer from "containers/PatientHistoryContainer";


const ConsultationContainer = () => {
	
	useEffect(() => {
		document.title = 'Consultation | PMASD';
	}, []);
	
	return (
		<BaseContainer>
			<Row>
				<Col span={20}>
					<section id="patient-basic">
						<Collapse>
							<Collapse.Panel key="patient-basic-collapse" header="Patient Details">
								<PatientContainerWithOptions />
							</Collapse.Panel>
						</Collapse>
					</section>
					
					<section id="patient-history">
						<PatientHistoryContainer />
					</section>
				</Col>
				<Col span={4}>
					<Anchor>
						<Anchor.Link href="#patient-basic" title="Patient Details" />
						<Anchor.Link href="#patient-history" title="Patient History" />
					</Anchor>
				</Col>
			</Row>
		</BaseContainer>
	);
};

export default ConsultationContainer;
