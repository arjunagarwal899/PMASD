import React from "react";
import "antd/dist/antd.css";
import { Layout, Breadcrumb, Row } from "antd";

import Reports from "../components/Home/Reports";
import Entries from "../components/Home/Entries";
import SearchAndEdit from "../components/Home/SearchAndEdit";

const { Footer, Content } = Layout;

const HomeContainer = () => {
  return (
    <div>
      <Layout>
        <Layout>
          <Layout style={{ height: "100vh" }}>
            <Content style={{ padding: "0 50px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
              </Breadcrumb>
              <div
                style={{
                  background: "#BBB",
                  padding: 24,
                  justifyContent: "center",
                }}
              >
                <div className='site-card-wrapper'>
                  <Row
                    gutter={[8, 8]}
                    style={{
                      justifyContent: "center",
                      padding: "30px 30px 0 30px",
                    }}
                  >
                    <Reports />
                  </Row>
                </div>

                <div className='site-card-wrapper' textAlign='left'>
                  <Row
                    gutter={[8, 8]}
                    style={{
                      justifyContent: "left",
                      padding: "30px 30px 0 30px",
                    }}
                  >
                    <Entries />
                  </Row>
                </div>

                <div className='site-card-wrapper' textAlign='left'>
                  <Row
                    gutter={[8, 8]}
                    style={{
                      justifyContent: "left",
                      padding: "30px 30px 0 30px",
                    }}
                  >
                    <SearchAndEdit />
                  </Row>
                </div>
              </div>

              <Footer style={{ textAlign: "center" }}>Created by PMASD</Footer>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default HomeContainer;
