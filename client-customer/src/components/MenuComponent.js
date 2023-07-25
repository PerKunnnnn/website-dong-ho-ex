import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';


class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }
  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <li key={item._id} className="menu"><Link to={'/product/category/' + item._id}>{item.name}</Link></li>
      );
    });
    return (
      <div className="heading">
        <div className="top-header">
          <ul className="menu">
            <li className="menu"><Link to='/'>Trang chủ</Link></li>
            {cates}
          </ul>
        </div>
        <div className="top-header">
          <form className="">
            <input className="edit-search" type="search" placeholder="Sản phẩm cần tìm" value={this.state.txtKeyword} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }} />
            <input className='edit-submit' type="submit" value="Tìm kiếm" onClick={(e) => this.btnSearchClick(e)} />
          </form>
        </div>
        {/* <div className="float-clear" /> */}
      </div>
    );
  }
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  // apis
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}
export default withRouter(Menu);