import React from 'react';

import { Layout, Menu, Typography } from "antd";

// A base container in which the webpage content is present
const BaseContainer = props => {
	return (
		<div>
			<Layout>
				<Layout.Header>
					<Typography.Title style={{ color: 'white', padding: '10px 0' }} level={4}>PMASD</Typography.Title>
				</Layout.Header>
				<Layout>
					<Layout.Sider collapsible defaultCollapsed={true}>
						<Menu
							defaultSelectedKeys={['Dashboard']}
							mode="inline"
						>
							<Menu.Item key='Dashboard'>
								Dashboard
							</Menu.Item>
						</Menu>
					</Layout.Sider>
					<Layout.Content>
						{props.children}
						<Layout.Footer style={{ textAlign: 'center' }}>Created by PMASD</Layout.Footer>
					</Layout.Content>
				
				</Layout>
			</Layout>
		</div>
	);
};

export default BaseContainer;
