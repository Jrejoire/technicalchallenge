import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Table, Icon } from 'antd';

class GridData extends Component {
	constructor(props) {
    super(props);
		this.columns = [{
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
		    	render: (text, record, onClick) => (
			     	<Icon 
			     		type="delete"
			     		style={{ color: 'rgba(0,0,0,.25)', padding:'10px' }}
			     		onClick={(e) => { this.onDelete(record.key, e); }}
			     	/>      	
		    	),
			},
		];
	}

	onDelete = (key, e) => {
		e.preventDefault();
		this.props.handleDelete(key);
	}
	render(){
		const { tokenProp } = this.props;
		return(
				<Table columns={this.columns} dataSource={tokenProp} />
		);
	}
}

export default GridData;