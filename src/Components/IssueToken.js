import React, { Component } from 'react';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';

import WrappedTokenForm from '../Components/IssueTokenForm';

class IssueToken extends Component {
  render() {
  	const { newTokenCallback } = this.props;
    return (
      <div className='main'>
        <Row>
          <h1 className='title'>Issue Token</h1>
        </Row>
        <Row className='content' gutter={16}>
          <Col span={12}>
            <WrappedTokenForm newToken={newTokenCallback} />
          </Col>
        </Row>      
      </div> 
    );
  }
}

export default IssueToken;
