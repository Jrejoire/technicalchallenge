import React, { Component } from "react";
import "antd/dist/antd.css";
import { Table, Icon } from "antd";

class GridData extends Component {
	constructor(props) {
		super(props);
		this.columns = [
			{
				title: "Token name",
				dataIndex: "tokenName",
				key: "tokenName"
			},
			{
				title: "Token ticker",
				dataIndex: "tokenTicker",
				key: "tokenTicker"
			},
			{
				title: "Total supply",
				dataIndex: "totalSupply",
				key: "totalSupply"
			},
			{
				title: "Creation date",
				dataIndex: "creationDate",
				key: "creationDate"
			},
			{
				title: "Issuer name",
				dataIndex: "issuerName",
				key: "issuerName"
			},
			{
				title: "Template",
				dataIndex: "template",
				key: "template"
			},
			{
				title: "Action",
				key: "action",
				render: (text, record, onClick) => (
					<Icon
						type="delete"
						style={{ color: "rgba(0,0,0,.25)", padding: "10px" }}
						onClick={e => {
							this.onDelete(record.key, e);
						}}
					/>
				)
			}
		];
	}

	//Callback to App component
	onDelete = (key, e) => {
		e.preventDefault();
		this.props.handleDelete(key);
	};
	render() {
		const { tokenProp } = this.props;
		return <Table columns={this.columns} dataSource={tokenProp} />;
	}
}

export default GridData;
