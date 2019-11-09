import { HashRouter, Route } from 'react-router-dom';
import React, { Component } from 'react';
import { Col, Row } from 'antd';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import './App.css';

import InlineMenu from '../Components/Menu';
import Home from '../Components/Home';
import IssueToken from '../Components/IssueToken';

import { setSearchField, setToken, setDate } from '../actions';

const mapStateToProps = state => {
  return {
    searchField: state.searchTokens.searchField,
    tokenData: state.getTokenData.tokenData,
    date: state.getDate.date
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
    
    setsDate: () => {
      let months = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];
      let date = new Date();
      let today = date.getDate() + " ";   // numero du jour
      today += months[date.getMonth()] + " ";   // mois
      today += date.getFullYear(); //année
      dispatch(setDate(today))
    },

    addTokenData: (values) => {
      dispatch(setToken(values))
    }
  }
}

class App extends Component {

  componentDidMount() {
    const { setsDate, addTokenData } = this.props;
    
    setsDate();

    // Saving initial Data to local storage.
    //localStorage.setItem('tokenData', JSON.stringify(tokenData));

    // Setting state variables from local storage.
    localStorage.getItem('tokenData') && addTokenData(JSON.parse(localStorage.getItem('tokenData')));
  }

  handleDelete = (key) => {
    if (this.props.tokenData.some(token => token.key === key)) {
      const deletedInitialData = this.props.tokenData.filter(token => token.key !== key);
      this.props.addTokenData(deletedInitialData);
    }
  }

  newTokenCallback = (values) => {
    const { tokenData, addTokenData } = this.props;
    let lastTokenKey = tokenData.slice(-1)[0].key || 1;
    // Adding date and incremental key to object values.
    values.creationDate = this.props.date;
    values.key = (+lastTokenKey + 1).toString();
    addTokenData(values);
  }


  render() {
    const { searchField, onSearchChange, tokenData } = this.props;

    return (
      <HashRouter basename='/'>
        <div className='app'>
          <Row type="flex" justify="space-around" gutter={16}>
            <Col span={6} className='menu'>
              <InlineMenu />
            </Col>
            <Col span={18}>
              <Route exact path='/' render={() =>
                <Home tokenDataProp={tokenData} deleteToken={this.handleDelete} searchField={searchField} onSearchChange={onSearchChange} /> } />
              <Route path='/IssueToken' render={() =>
                <IssueToken callbackMethod={this.newTokenCallback} />} />
            </Col>
          </Row>
        </div>
      </HashRouter>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);