import { HashRouter, Route } from 'react-router-dom';
import React, { Component } from 'react';
import { Col, Row } from 'antd';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import './App.css';

import InlineMenu from '../Components/Menu';
import Home from '../Components/Home';
import IssueToken from '../Components/IssueToken';

import { setToken, setDate, updateToken } from '../actions';

const mapStateToProps = state => {
  return {
    tokenData: state.getTokenData.tokenData,
    date: state.getDate.date
  }
}

const mapDispatchToProps = (dispatch) => {
  return { 
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
    },
    updateTokenData: (data) => {
      dispatch(updateToken(data))
      localStorage.setItem('tokenData', JSON.stringify(data));
    }
  }
}

class App extends Component {

  componentDidMount() {
    const { setsDate, updateTokenData, tokenData } = this.props;
    
    setsDate();

    // Setting state variables from local storage.
    localStorage.getItem('tokenData') && updateTokenData(JSON.parse(localStorage.getItem('tokenData')));
    
    this.setState({ initialDataLength : tokenData.length });
  } 

  newTokenCallback = (values) => {
    const { date, tokenData, addTokenData } = this.props;

    let lastTokenKey = null;

    if (tokenData.length === 0) {
      lastTokenKey = 0;
    } else {
      lastTokenKey = tokenData.slice(-1)[0].key
    }

    // Adding date and incremental key to object values.
    values.creationDate = date;
    values.key = (+lastTokenKey + 1).toString();
    addTokenData(values);

    //localStorage.setItem('tokenData', JSON.stringify(tokenData));
  }


  render() {
    return (
      <HashRouter basename='/'>
        <div className='app'>
          <Row type="flex" justify="space-around" gutter={16}>
            <Col span={6} className='menu'>
              <InlineMenu />
            </Col>
            <Col span={18}>
              <Route exact path='/' render={() =>
                <Home /> } />
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