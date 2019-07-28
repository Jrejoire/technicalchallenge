import React from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Menu, Icon } from 'antd';

const InlineMenu = () => {
	return(
		<Menu>
			<Menu.Item style={{ marginBottom: '50px',textAlign:'center' }}>
				<Link to='/'>
					<img  
					src='./taurus-logo.svg' 
					alt='Taurus Logo'
					/>
				</Link>
			</Menu.Item>
			<Menu.Item style={{ paddingLeft: '25%' }}>
				<Link to='/IssueToken'>	
					<Icon 
		                type="plus" 
		                style={{ color: 'rgba(0,0,0,.25)' }} 
	                />
					Issue Token
				</Link>
			</Menu.Item>
			
			
			<Menu.Item style={{ paddingLeft: '25%' }}>
				<Link to='/'>
					<Icon 
	                    type="bars" 
	                    style={{ color: 'rgba(0,0,0,.25)' }} 
	                />
					Token List
				</Link>
			</Menu.Item>					
		</Menu>
	)};

export default InlineMenu;