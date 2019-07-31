import React, { Component } from 'react';
import { Form, Input, InputNumber, Button, Select } from 'antd';
import 'antd/dist/antd.css';

const { Option } = Select;

class TokenForm extends Component {
	constructor(){
	    super();
	    this.state = {
			listOfCountries:[],
		};
	}

	//Fetching list of country names
	componentDidMount(){
	    fetch('https://restcountries.eu/rest/v2/all')
	    .then(answer => answer.json())
	    .then(countries => this.setState({ listOfCountries: countries }))
	    .catch(error=> console.log('error :', error));	
	}

	//Sending back token data to App component
	callbackMethod = (values) =>{
		this.props.newToken(values);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				this.callbackMethod(values);
				this.props.form.resetFields()
				alert('New token added!')
			}
		});	
	}

	render(){
		const { getFieldDecorator } = this.props.form;
		const { listOfCountries } = this.state;
		const countryName = listOfCountries.map(country => 
			({ name: country.name, code: country.alpha2Code }));

		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 12 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 12 },
			},
		};

		const buttonFormItemLayout = {
			wrapperCol: {
				sm: {
				  span: 24,
				  offset: 16,
				},
			},
		};

		return (
			<Form {...formItemLayout} onSubmit={this.handleSubmit}>
		        <Form.Item label="Token Name">
		        	{getFieldDecorator('TokenName', {
			        	rules: [{ required: true, message: 'Please enter your token name!' }],
	            	})(<Input placeholder="Enter token name"/>)}
		        </Form.Item>
		        <Form.Item label="Token Ticker">
		        	{getFieldDecorator('TokenTicker', {
            			rules: [{ required: true, message: 'Please input your token ticker!' }],				
        			})(<Input placeholder='Enter token ticker'/>)}		         	 
		        </Form.Item>
		        <Form.Item label="Total Supply">
		        	{getFieldDecorator('TotalSupply', { 
			        	rules: [{ required: true, message: 'Please input the total supply!' }],
	            	})(<InputNumber placeholder='Enter total supply' style={{ width: '100%' }}/>)}		
	          	</Form.Item>
		        <Form.Item label="Issuer Name">
		        	{getFieldDecorator('IssuerName', {
            			rules: [{ required: true, message: 'Please input the name of the issuer!' }],
            		})(<Input placeholder='Enter issuer name'/>)}		
	            </Form.Item>
		        <Form.Item label="Token Template" required="true">
		        	{getFieldDecorator('Template', { 
            			rules: [{ required: true, message: 'Please input the token template!' }],
	            	})(<Input placeholder='Enter token template'/>)}			 
		        </Form.Item>
		        <Form.Item label="Country" required="true">
	     			{getFieldDecorator('Country', {initialValue: 'Switzerland'}, {
						rules: [{ required: true, message: 'Please select your country!' }],
					})(<Select placeholder="Please select a country">
						{countryName.map(country => <Option key={country.code} value={country.name}>{country.name}</Option>)}
				    </Select>)}	   		    		
	        	</Form.Item>
	        	<Form.Item {...buttonFormItemLayout}>
			        <Button 
			        type="primary" 
			        htmlType="submit">
			        	Submit
			        </Button>
			    </Form.Item>
	     	</Form>
		);
	}
}

const WrappedTokenForm = Form.create({ name: 'tokenForm' })(TokenForm);

export default WrappedTokenForm;
