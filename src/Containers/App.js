import { HashRouter, Route } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'antd';
import 'antd/dist/antd.css';
import './App.css';

import InlineMenu from '../Components/Menu';
import Home from '../Components/Home';
import IssueToken from '../Components/IssueToken';

import { setSearchField } from '../actions';

const mapStateToProps = state => {
  return {
    searchField: state.searchTokens.searchField
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value))
  }
}

// Data could be fetched from external source
const initialData = [
  {
    key: '1',
    tokenName: 'TTism',
    tokenTicker: 'TTT',
    totalSupply: 100000,
    creationDate: '17 Mai 2019',
    issuerName: 'Taurus Group SA',
    template: 'ERC20',
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedTokenData: [],
      initialTokenData: [],
      issuedTokenData: [],
      date: '',
    }
  }

  componentDidMount() {

    this.setsDate();

    // Saving initial Data to local storage.
    localStorage.setItem('initialTokenData', JSON.stringify(initialData));

    // Setting state variables from local storage.
    localStorage.getItem('initialTokenData') && this.setState({
      initialTokenData: JSON.parse(localStorage.getItem('initialTokenData')),
      isLoading: false,
    });
    localStorage.getItem('issuedTokenData') && this.setState({
      issuedTokenData: JSON.parse(localStorage.getItem('issuedTokenData')),
      isLoading: false,
    });

    // Updating displayed token state at start.
    const { initialTokenData, issuedTokenData } = this.state;
    const displayedTokenData = [...initialTokenData, ...issuedTokenData];
    this.setState({ displayedTokenData: displayedTokenData });
  }

  componentDidUpdate() {
    const { initialTokenData, issuedTokenData } = this.state;
    const displayedTokenData = [...initialTokenData, ...issuedTokenData];

    // Updating displayed token state and local storage on array change.
    if (displayedTokenData.length !== this.state.displayedTokenData.length) {
      this.setState({ displayedTokenData: displayedTokenData })
      localStorage.setItem('issuedTokenData', JSON.stringify(issuedTokenData));
    }
    ;
  }

  setsDate = () => {
    let months = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];
    let date = new Date();
    let today = date.getDate() + " ";   // numero du jour
    today += months[date.getMonth()] + " ";   // mois
    today += date.getFullYear(); //année
    this.setState({ date: today });
  }

  newTokenCallback = (values) => {
    const { displayedTokenData, issuedTokenData, date } = this.state;
    let lastTokenKey = null;

    if (displayedTokenData.length === 0) {
      lastTokenKey = initialData.slice(-1)[0].key;
    } else {
      lastTokenKey = displayedTokenData.slice(-1)[0].key
    }

    // Adding date and incremental key to object values.
    values.creationDate = date;
    values.key = (+lastTokenKey + 1).toString();

    const issuedToken = [...issuedTokenData, values];
    this.setState({ issuedTokenData: issuedToken });
  }

  handleDelete = (key) => {
    if (this.state.initialTokenData.some(token => token.key === key)) {
      const deletedInitialData = this.state.initialTokenData.filter(token => token.key !== key);
      this.setState({ initialTokenData: deletedInitialData });
    } else {
      const deletedIssueToken = this.state.issuedTokenData.filter(token => token.key !== key);
      this.setState({ issuedTokenData: deletedIssueToken });
    }
  }


  render() {
    const { displayedTokenData } = this.state;

    return (
      <HashRouter basename='/'>
        <div className='app'>
          <Row type="flex" justify="space-around" gutter={16}>
            <Col span={6} className='menu'>
              <InlineMenu />
            </Col>
            <Col span={18}>
              <Route exact path='/' render={() =>
                <Home tokenDataProp={displayedTokenData} deleteToken={this.handleDelete} />} />
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