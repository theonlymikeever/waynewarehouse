import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export default function AdminSideBar(props){
    return (
      <div className="mt-3">
        
        <div className="list-group">
          <div className="list-group-item">
            Admin Menu
          </div>
          <Link className="list-group-item" to="/admin/product_form">
            Add Product
          </Link>
          <Link className="list-group-item" to="/admin/category_form">
            Add Category
          </Link>
          <Link className="list-group-item" to="/admin/analytics">
            Analytics
          </Link>
        </div>
      </div>
    )

}