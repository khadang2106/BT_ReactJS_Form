import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  deleteStudentAction,
  setSelectedStudentAction,
} from '../../store/actions/studentAction';

class StudentManagement extends Component {
  state = {
    keyword: '',
  };

  removeVietnameseTones = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    str = str.replace(/\s/g, '');
    str = str.trim();
    // Remove punctuations
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      ' '
    );
    return str.trim().toLowerCase();
  };

  renderStudentList = () => {
    let data = this.props.studentList.filter((element) => {
      const lowerCaseFullName = this.removeVietnameseTones(element.fullName);

      return lowerCaseFullName.indexOf(this.state.keyword) !== -1;
    });

    return data.map((element, index) => {
      const { studentId, fullName, phoneNumber, email } = element;

      return (
        <tr key={index}>
          <td className="text-center">{studentId}</td>
          <td>{fullName}</td>
          <td>{phoneNumber}</td>
          <td>{email}</td>
          <td className="text-center">
            <button
              onClick={() =>
                this.props.dispatch(setSelectedStudentAction(element))
              }
              className="btn btn-warning mr-2"
            >
              <i className="fa fa-edit" />
            </button>
            <button
              onClick={() => this.props.dispatch(deleteStudentAction(element))}
              className="btn btn-danger"
            >
              <i className="fa fa-trash-alt" />
            </button>
          </td>
        </tr>
      );
    });
  };

  handleChange = (event) => {
    this.setState({
      keyword: this.removeVietnameseTones(event.target.value),
    });
  };

  render() {
    return (
      <div className="card p-0 mt-3">
        <div className="card-header font-weight-bold bg-dark text-white">
          STUDENT MANAGEMENT
        </div>
        <div className="row mt-4 px-3 ">
          <div className="col-5">
            <div className="form-group mb-0">
              <input
                onChange={this.handleChange}
                type="text"
                placeholder="Search by full name..."
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="card-body">
          <table className="table table-hover">
            <thead className="thead-light">
              <tr className="text-center">
                <th>Student ID</th>
                <th>Full Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{this.renderStudentList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    studentList: state.studentReducer.studentList,
  };
};

export default connect(mapStateToProps)(StudentManagement);
