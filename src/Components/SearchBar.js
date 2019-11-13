import React from "react";
import "antd/dist/antd.css";
import { Form, Icon, Input } from "antd";

const SearchBar = ({ searchChange }) => {
  return (
    <Form layout="vertical">
      <Form.Item className="searchBar">
        <Input
          prefix={<Icon type="search" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="Contract name or address or ticker"
          onChange={searchChange}
        />
      </Form.Item>
    </Form>
  );
};

export default SearchBar;
