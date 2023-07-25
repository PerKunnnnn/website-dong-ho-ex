import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class CategoryDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtName: ''
    };
  }
  render() {
    return (
      <div className="page">
        <h2 className="text-center">Thông tin dòng sản phẩm</h2>
        <form>
          <table className='table'>
            <tbody>
              <tr>
                <td>ID</td>
                <td><input className='box' type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} readOnly={true} /></td>
              </tr>
              <tr>
                <td>Dòng sản phẩm</td>
                <td><input className='box' type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td></td>
                <td>
                <input className='box-submit' type="submit" value="Thêm mới" onClick={(e) => this.btnAddClick(e)} />
                <input className='box-submit' type="submit" value="Update" onClick={(e) => this.btnUpdateClick(e)} />
                <input className='box-submit' type="submit" value="Xóa" onClick={(e) => this.btnDeleteClick(e)} />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
  // event-handlers
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    if (name) {
      const cate = { name: name };
      this.apiPostCategory(cate);
    } else {
      alert('Vui lòng nhập tên');
    }
  }
  // apis
  apiPostCategory(cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/categories', cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Thêm thành công');
        this.apiGetCategories();
      } else {
        alert('Thêm không thành công');
      }
    });
  }
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.props.updateCategories(result);
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({ txtID: this.props.item._id, txtName: this.props.item.name });
    }
  }
  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    if (id && name) {
      const cate = { name: name };
      this.apiPutCategory(id, cate);
    } else {
      alert('Vui lòng nhập id và tên');
    }
  }
  // apis
  apiPutCategory(id, cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/categories/' + id, cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Update thành công');
        this.apiGetCategories();
      } else {
        alert('Update không thành công');
      }
    });
  }
  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('Bạn có chắc chưa?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteCategory(id);
      } else {
        alert('Vui lòng nhập id');
      }
    }
  }
  // apis
  apiDeleteCategory(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/categories/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Xóa thành công!');
        this.apiGetCategories();
      } else {
        alert('Xóa không thành công!');
      }
    });
  }
}
export default CategoryDetail;