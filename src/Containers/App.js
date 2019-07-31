import { BrowserRouter, Route } from 'react-router-dom';
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import './App.css';

import InlineMenu from '../Components/Menu';
import Home from '../Components/Home';
import IssueToken from '../Components/IssueToken';

//Data could be fetched from external source
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
      displayedTokenData: [],
      initialTokenData:[],
      issuedTokenData:[],
      date:'',
    }
  }

  componentDidMount(){
    this.setsDate();

    //Saving initial Data to local storage.
    localStorage.setItem('initialTokenData', JSON.stringify(initialData));

    //Setting state variables from local storage.
    localStorage.getItem('initialTokenData') && this.setState({ 
      initialTokenData: JSON.parse(localStorage.getItem('initialTokenData')),
      isLoading: false
    });
    localStorage.getItem('issuedTokenData') && this.setState({ 
      issuedTokenData: JSON.parse(localStorage.getItem('issuedTokenData')),
      isLoading: false
    });
    
    //Udapting displayed token state at start.
    const { initialTokenData, issuedTokenData } = this.state;
    const displayedTokenData = [...initialTokenData, ...issuedTokenData];
    this.setState({ displayedTokenData: displayedTokenData });
  }

  componentDidUpdate(){
    const { initialTokenData, issuedTokenData } = this.state;
    const displayedTokenData = [...initialTokenData, ...issuedTokenData];

    //Udapting displayed token state and local storage on array change.
    if ( displayedTokenData.length !== this.state.displayedTokenData.length){
      this.setState({ displayedTokenData: displayedTokenData })
      localStorage.setItem('issuedTokenData', JSON.stringify(issuedTokenData));
    };
  }

  setsDate = () => {
    let mois = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", 
      "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];  
    let date = new Date();
    let dateDuJour = date.getDate() + " ";   // numero du jour
    dateDuJour += mois[date.getMonth()] + " ";   // mois
    dateDuJour += date.getFullYear(); //année
    this.setState({ date : dateDuJour });
  }

  newTokenCallback = (values) => {
    const { displayedTokenData, issuedTokenData, date } = this.state;
    let lastTokenKey =null;

    if(displayedTokenData.length === 0){
      lastTokenKey = initialData.slice(-1)[0].key;
    } else{
      lastTokenKey = displayedTokenData.slice(-1)[0].key
    };

    //Adding date and incremental key to object values.
    values.CreationDate = date; 
    values.key = (+lastTokenKey +1).toString();

    const issuedToken = [...issuedTokenData,values];
    this.setState({ issuedTokenData : issuedToken });
  }

  handleDelete = (key) =>{
    console.log(key);
    if (this.state.initialTokenData.some(token=>token.key === key)){
      console.log("key in init data")
      const deletedInitialData = this.state.initialTokenData.filter(token => token.key !==key);
      this.setState ({ initialTokenData : deletedInitialData });
    } else {
      console.log("key in issue data")
      const deletedIssueToken = this.state.issuedTokenData.filter(token => token.key !==key);
      this.setState ({ issuedTokenData : deletedIssueToken });
    }   
  }
  

  render() {
    const { displayedTokenData } = this.state;

    return (
     <BrowserRouter> 
        <div className='app'>
          <Row type="flex" justify="space-around" gutter={16}>
            <Col span={6} className='menu'>
               <InlineMenu/>
            </Col>
            <Col span={18}>
              <Route exact path='/' render={(props) => 
                <Home  tokenDataProp={displayedTokenData} deleteToken={this.handleDelete}/>}/>           
              <Route path='/IssueToken' render={(props) => 
                <IssueToken callbackMethod={this.newTokenCallback} />}/>
            </Col>
          </Row>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
