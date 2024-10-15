import { Layout, Row, Typography } from 'antd';
import React from 'react';
import styles from './Guide.less';

// 脚手架示例组件
const Guide: React.FC = () => {
  return (
    <Layout>
      <Row>
        <Typography.Title level={3} className={styles.title}>
          欢迎参与测试 ！
        </Typography.Title>
      </Row>
    </Layout>
  );
};

export default Guide;
