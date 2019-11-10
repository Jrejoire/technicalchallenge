import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'antd';
import 'antd/dist/antd.css';

import SearchBar from '../Components/SearchBar';
import Actions from '../Components/ActionButtons';
import GridData from '../Components/GridData';

import { setToken, setSearchField } from '../actions';

const mapStateToProps = state => {
  return {
    searchField: state.searchTokens.searchField,
    tokenData: state.getTokenData.tokenData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => {
      if (event.target.value.length > 2) {
        dispatch(setSearchField(event.target.value))
      } else {
        dispatch(setSearchField(''))
      }
    },
    handleDelete: (value) => {
      if (this.props.tokenData.some(token => token.key === value)) {
        const deletedData = this.props.tokenData.filter(token => token.key !== value);
        dispatch(setToken(deletedData));
      }
    }
  }
}

class Home extends Component {
  render() {
    const {tokenData, handleDelete, searchField, onSearchChange} = this.props;

    let filteredTokens = [];
    if (tokenData !== undefined) {
      //to filter the search
      filteredTokens = tokenData.filter(token => {
        return token.tokenName.toLowerCase().includes(searchField.toLowerCase()) ||
          token.tokenTicker.toLowerCase().includes(searchField.toLowerCase()) ||
          token.issuerName.toLowerCase().includes(searchField.toLowerCase());
      });
    } else {
      filteredTokens = tokenData;
    }

    return (
      <div className = 'main' >
        <Row >
          <h1 className = 'title' > Token List </h1> 
        </Row>
        <Row type = "flex" justify = "center" gutter = {16} >
          <Col span = {16} >
            <SearchBar searchChange = {onSearchChange}/> 
          </Col> 
          <Col span = {8}>
            <Actions />
          </Col>
        </Row>
        <Row>
          <Col span = {22}>
            <GridData tokenProp = {filteredTokens} handleDelete = {handleDelete}/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);