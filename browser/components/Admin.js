import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import AdminSideBar from './AdminComponents/AdminSideBar';
import AdminProductForm from './AdminComponents/AdminProductForm';
import AdminCategoryForm from './AdminComponents/AdminCategoryForm';
import AdminUserList from './AdminComponents/AdminUserList';
import AdminOrderList from './AdminComponents/AdminOrderList';
import AdminChart from './AdminComponents/AdminChart';

export default function Admin(props) {
  return(
    <div className="container">  
      <div className="row">
        <div className="col-md-3">
          <AdminSideBar render={ <AdminSideBar /> }/> 
        </div>
        <div className="col-md-9">   
          <Route exact path="/admin" component={ AdminProductForm } />
          <Route exact path='/admin/product_form' component={ AdminProductForm } />
          <Route exact path='/admin/category_form' component={ AdminCategoryForm } />
          <Route exact path='/admin/users' component={ AdminUserList } />
          <Route exact path='/admin/orders' component={ AdminOrderList } />
          <Route exact path='/admin/analytics' component={ AdminChart } />
        </div>
      </div>
    </div>
  )  
}


