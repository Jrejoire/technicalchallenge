import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

class TokenForm extends React.Component {
	state={
		listOfCountries:[],
	};

	handleCountryData=()=>{
	    fetch('https://restcountries.eu/rest/v2/all')
	    .then(answer => answer.json())
	    .then(countries => countries.map(country=>country.name))
	    .then(name => this.setState({ listOfCountries:name }))
	    .catch(error=> console.log('error :', error));
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
			  console.log('Received values of form: ', values);
			}
		});
	};

	render(){
		const { getFieldDecorator } = this.props.form;
		const { listOfCountries } = this.state;

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
		        	{getFieldDecorator('Token Name', 
			        	{
	            			rules: [
	            				{ 
	            					required: true, 
	            					message: 'Please enter your token name!' 
	            				}
	            			],    					
            			})
            				(<Input placeholder='Enter token name'/>)
            		}	
		        </Form.Item>
		        <Form.Item label="Token Ticker">
		        	{getFieldDecorator('Token Ticker', 
			        	{
	            			rules: [
	            				{ 
	            					required: true, 
	            					message: 'Please input your token ticker!' 
	            				}
	            			],    					
            			})
            				(<Input placeholder='Enter token ticker'/>)
            		}		         	 
		        </Form.Item>
		        <Form.Item label="Total Supply">
		        	{getFieldDecorator('Total Supply', 
			        	{
	            			rules: [
	            				{ 
	            					required: true, 
	            					message: 'Please input the total supply!' 
	            				}
	            			],    					
            			})
            				(<Input placeholder='Enter total supply'/>)
            		}	
		        </Form.Item>
		        <Form.Item label="Issuer Name">
		        	{getFieldDecorator('Issuer Name', 
			        	{
	            			rules: [
	            				{ 
	            					required: true, 
	            					message: 'Please input the name of the issuer!' 
	            				}
	            			],    					
            			})
            				(<Input placeholder='Enter issuer name'/>)
            		}	
		        </Form.Item>
		        <Form.Item label="Token Template" required="true">
		        	{getFieldDecorator('Token Template', 
			        	{
	            			rules: [
	            				{ 
	            					required: true, 
	            					message: 'Please input the token template!' 
	            				}
	            			],    					
            			})
            				(<Input placeholder='Enter token template'/>)
            		}	
		        </Form.Item>
		        <Form.Item label="Country" required="true">
	     			<Select defaultValue="Switzerland">
				        {listOfCountries.map((x,y) => 
				        	<Option value={y}>{x}</Option>)			    		
				        }
				    </Select>
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