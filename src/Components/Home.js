import React, { Component } from 'react';
import { Col, Row } from 'antd';
import 'antd/dist/antd.css';

import SearchBar from '../Components/SearchBar';
import Actions from '../Components/ActionButtons';
import GridData from '../Components/GridData';

class Home extends Component {

  render() {
    const { tokenDataProp, deleteToken, searchField, onSearchChange } = this.props;

    //to filter the search
    const filteredTokens = tokenDataProp.filter(token => {
      return token.tokenName.toLowerCase().includes(searchField.toLowerCase())
        || token.tokenTicker.toLowerCase().includes(searchField.toLowerCase())
        || token.issuerName.toLowerCase().includes(searchField.toLowerCase());
    });

    return (
      <div className='main'>
        <Row>
          <h1 className='title'>Token List</h1>
        </Row>
        <Row type="flex" justify="center" gutter={16}>
          <Col span={16}>
            <SearchBar searchChange={onSearchChange} />
          </Col>
          <Col span={8}>
            <Actions />
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <GridData tokenProp={filteredTokens} handleDelete={deleteToken} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
