import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row } from "antd";
import "antd/dist/antd.css";

import SearchBar from "../Components/SearchBar";
import Actions from "../Components/ActionButtons";
import GridData from "../Components/GridData";

import { setSearchField, updateToken } from "../actions";

const mapStateToProps = state => {
  return {
    searchField: state.searchTokens.searchField,
    tokenData: state.getTokenData.tokenData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: event => {
      if (event.target.value.length > 2) {
        dispatch(setSearchField(event.target.value));
      } else {
        dispatch(setSearchField(""));
      }
    },
    filterTokenData: data => {
      dispatch(updateToken(data));
      localStorage.setItem("tokenData", JSON.stringify(data));
    }
  };
};

class Home extends Component {
  handleDelete = key => {
    const { tokenData, filterTokenData } = this.props;
    if (tokenData.some(token => token.key === key)) {
      const deletedData = tokenData.filter(token => token.key !== key);
      filterTokenData(deletedData);
    }
  };

  render() {
    const { tokenData, searchField, onSearchChange } = this.props;

    //to filter the search
    let filteredTokens = tokenData.filter(token => {
      return (
        token.tokenName.toLowerCase().includes(searchField.toLowerCase()) ||
        token.tokenTicker.toLowerCase().includes(searchField.toLowerCase()) ||
        token.issuerName.toLowerCase().includes(searchField.toLowerCase())
      );
    });

    return (
      <div className="main">
        <Row>
          <h1 className="title"> Token List </h1>
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
            <GridData
              tokenProp={filteredTokens}
              handleDelete={this.handleDelete}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
