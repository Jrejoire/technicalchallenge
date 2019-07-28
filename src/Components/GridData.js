import React from 'react';
import 'antd/dist/antd.css';
import { Table, Icon } from 'antd';

const columns = [{
		title: 'Token name',
		dataIndex: 'TokenName',
		key: 'TokenName',
	},
	{
		title: 'Token ticker',
		dataIndex: 'TokenTicker',
		key: 'TokenTicker',
	},
	{
		title: 'Total supply',
		dataIndex: 'TotalSupply',
		key: 'TotalSupply',
	},
	{
		title: 'Creation date',
		dataIndex: 'CreationDate',
		key: 'CreationDate',
	},
	{
		title: 'Issuer name',
		dataIndex: 'IssuerName',
		key: 'IssuerName',
	},
	{
		title: 'Template',
		dataIndex: 'Template',
		key: 'Template',
	},
	{
		title: 'Action',
    	key: 'action',
    	render: (text, record) => (
     	<Icon 
     		type="delete"
     		style={{ color: 'rgba(0,0,0,.25)', padding:'10px' }}
     	/>      	
    ),
	},
];

const GridData = ({ tokenProp }) => {
	return(
		<Table columns={columns} dataSource={tokenProp} />
	)};

export default GridData;