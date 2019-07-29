import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'antd';
import 'antd/dist/antd.css';

const Actions = () => {
	return(
		<Row>
			<Col span={12}>
			    <Button type="primary">
			    	<Link to='/IssueToken'>
			    	Issue Token
			    	</Link>
			    </Button>
			</Col>
			<Col span={12}>
		        <Button type="normal" icon='download'>
		            Export to CSV
		        </Button>
	        </Col>	
        </Row>
	)
};

export default Actions;