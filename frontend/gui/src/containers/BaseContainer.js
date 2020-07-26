import React from 'react';

import { Layout, Menu, Typography } from "antd";

const BaseContainer = props => {
	return (
		<div>
			<Layout>
				<Layout.Header style={{ background: '#17252A', height: '50px' }}>
					<Typography.Title style={{ color: 'white', padding: '10px 0' }} level={4}>PMASD</Typography.Title>
				</Layout.Header>
				<Layout>
					<Layout.Sider collapsible style={{ background: '#17252A' }}>
						<Menu
							defaultSelectedKeys={['Dashboard']}
							mode="inline"
						>
							<Menu.Item key='Dashboard'>
								Dashboard
							</Menu.Item>
						</Menu>
					</Layout.Sider>
					<Layout.Content style={{ padding: '0 50px' }}>
						{props.children}
						<Layout.Footer style={{ textAlign: 'center' }}>Created by PMASD</Layout.Footer>
					</Layout.Content>
				
				</Layout>
			</Layout>
		</div>
	);
};

export default BaseContainer;
