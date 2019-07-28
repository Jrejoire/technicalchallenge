import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import InlineMenu from '../Components/Menu';
import SearchBar from '../Components/SearchBar';
import Actions from '../Components/ActionButtons';
import GridData from '../Components/GridData';
import WrappedTokenForm from '../Components/IssueTokenForm';


class App extends Component {
  render() {
    return (
     <BrowserRouter> 
        <div className='app'>
          <Row className='layout' gutter={16}>
            <Col span={6} className='menu'>
               <InlineMenu/>
            </Col>
            <Col span={18}>
              <Route exact path='/' component={Home}/>           
              <Route path='/IssueToken' component={IssueToken}/>
            </Col>
          </Row>
        </div>
      </BrowserRouter>
    );
  }
}

class Home extends Component {
  constructor(){
    super()
    this.state = {
      tokenData:[],
      searchfield:''
    }
  }

  componentWillMount(){
    const data = [
      { 
        key:'1',
        TokenName: 'TTism',
        TokenTicker: 'TTT',
        TotalSupply: 100000,
        CreationDate: '17 Mai 2019',
        IssuerName: 'Taurus Group SA',
        Template:'ERC20',
      },
    ];

    this.setState({ tokenData:data });

    localStorage.getItem('tokenData') && this.setState({ 
      tokenData: JSON.parse(localStorage.getItem('tokenData')),
      isLoading: false
    });
  }

  componentDidMount(){
    localStorage.setItem('tokenData', JSON.stringify(this.state.tokenData));
  }

  componentWillUpdate(nextProps, nextState){
    localStorage.setItem('tokenData', JSON.stringify(nextState.tokenData));
  }

   onSearchChange = (event) => {
    if(event.target.value.length>2){
      this.setState({ searchfield: event.target.value })
    } else{
      this.setState({ searchfield:'' })
    };
  }

  render() {
    const { tokenData, searchfield } = this.state;
    const filteredTokens = tokenData.filter(token =>{
      return token.TokenName.toLowerCase().includes(searchfield.toLowerCase())
          || token.TokenTicker.toLowerCase().includes(searchfield.toLowerCase())
          || token.IssuerName.toLowerCase().includes(searchfield.toLowerCase());
    });
    return (
      <div className='main'>
        <Row>
          <h1 className='title'>Token List</h1>
        </Row>

        <Row className='content' gutter={16}>
          <Col span={18}>
            <SearchBar searchChange={this.onSearchChange}/>
          </Col>

          <Col span={6}>
            <Actions />
          </Col>
        </Row>

        <Row>            
          <GridData tokenProp={filteredTokens}/>
        </Row>      
      </div> 
    );
  }
}

class IssueToken extends Component {

  render() {
    return (
      <div className='main'>
        <Row>
          <h1 className='title'>Issue Token</h1>
        </Row>

        <Row className='content' gutter={16}>
          <Col span={12}>
            <WrappedTokenForm />
          </Col>
        </Row>      
      </div> 
    );
  }
}

export default App;
