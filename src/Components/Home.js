import React, { Component } from 'react';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';

import SearchBar from '../Components/SearchBar';
import Actions from '../Components/ActionButtons';
import GridData from '../Components/GridData';

class Home extends Component {
  constructor(){
    super();
    this.state = {
      searchfield:'',
    }
  }

  onSearchChange = (event) => {
    if(event.target.value.length>2){
      this.setState({ searchfield: event.target.value })
    } else{
      this.setState({ searchfield:'' })
    };
  }

  render(){
    const { searchfield } = this.state;
    const { tokenDataProp } = this.props;

    const filteredTokens = tokenDataProp.filter(token =>{
      return token.TokenName.toLowerCase().includes(searchfield.toLowerCase())
          || token.TokenTicker.toLowerCase().includes(searchfield.toLowerCase())
          || token.IssuerName.toLowerCase().includes(searchfield.toLowerCase());
    });
    

    return (
      <div className='main'>
        <Row>
          <h1 className='title'>Token List</h1>
        </Row>
        <Row type="flex" justify="center" gutter={36}>
          <Col span={18}>
            <SearchBar searchChange={this.onSearchChange}/>
          </Col>
          <Actions />
        </Row>
        <Row>
          <Col span={23}>            
            <GridData tokenProp={filteredTokens}/>
          </Col>
        </Row>      
      </div> 
    );
  }
}

export default Home;