import { BrowserRouter, Route } from 'react-router-dom';
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import './App.css';

import InlineMenu from '../Components/Menu';
import Home from '../Components/Home';
import IssueToken from '../Components/IssueToken';

const initialData = [
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

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tokenData:[],
      issuedToken:[],
      date:'',
    }
  }

  componentDidMount(){
    this.setsDate();
    
    localStorage.setItem('tokenData', JSON.stringify(initialData));

    localStorage.getItem('tokenData') && this.setState({ 
      tokenData: JSON.parse(localStorage.getItem('tokenData')),
      isLoading: false
    });

    /*localStorage.getItem('tokenData') && this.setState({ 
        tokenData: JSON.parse(localStorage.getItem('tokenData')),
        isLoading: false
      });*/
  
    /*tokenData.push(issuedToken);

    localStorage.setItem('tokenData', JSON.stringify(tokenData));*/
  }

  

  componentWillUpdate(nextProps, nextState){
    localStorage.setItem('tokenData', JSON.stringify(nextState.tokenData));
  }

  setsDate = () => {
    let mois = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", 
      "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];  
    let date = new Date();
    let dateDuJour = date.getDate() + " ";   // numero du jour
    dateDuJour += mois[date.getMonth()] + " ";   // mois
    dateDuJour += date.getFullYear();
    this.setState({ date : dateDuJour });
  }

  handleNewToken = (e,values) => {
    console.log('TEST')
    /*const { tokenData, date } = this.state;
      values.CreationDate = date; 
      values.key = tokenData.length+1;
      this.setState({ issuedToken: values });*/
  }

  render() {
    const { tokenData } = this.state;
    return (
     <BrowserRouter> 
        <div className='app'>
          <Row type="flex" justify="space-around" gutter={16}>
            <Col span={6} className='menu'>
               <InlineMenu/>
            </Col>
            <Col span={18}>
              <Route exact path='/' render={(props) => 
                <Home  tokenDataProp={tokenData} />}/>           
              <Route path='/IssueToken' render={(props) => 
                <IssueToken tokenDataProp={tokenData} issuedToken={this.handleNewToken} />}/>
            </Col>
          </Row>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
