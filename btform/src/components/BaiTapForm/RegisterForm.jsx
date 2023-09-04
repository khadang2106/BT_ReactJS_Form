import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import {
  addStudentAction,
  cancelAction,
  updateStudentAction,
} from '../../store/actions/studentAction';

class RegisterForm extends Component {
  studentIdInputRef = createRef();
  fullNameInputRef = createRef();
  phoneNumberInputRef = createRef();
  emailInputRef = createRef();

  state = {
    studentId: '',
    fullName: '',
    phoneNumber: '',
    email: '',
  };

  static getDerivedStateFromProps(nextProps, currentState) {
    if (
      nextProps.selectedStudent &&
      nextProps.selectedStudent.studentId !== currentState.studentId
    ) {
      currentState = nextProps.selectedStudent;
    }

    return currentState;
  }

  handleChangeInput = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        this.checkValid();
      }
    );
  };

  validateRequired = (value, ref, mess) => {
    if (value) {
      ref.innerHTML = '';

      return true;
    }

    ref.innerHTML = mess;

    return false;
  };

  validatePattern = (value, pattern, ref, mess) => {
    if (pattern.test(value)) {
      ref.innerHTML = '';

      return true;
    }

    ref.innerHTML = mess;

    return false;
  };

  validateExist = (value, ref, mess) => {
    let isExist = false;

    this.props.studentList.forEach((element) => {
      if (value === element.studentId) {
        isExist = true;
      }
    });

    if (isExist) {
      ref.innerHTML = mess;

      return false;
    }

    ref.innerHTML = '';

    return true;
  };

  checkValid = () => {
    let isValid = true;

    // Validate Student ID
    if (this.props.selectedStudent) {
      isValid &= true;
      this.studentIdInputRef.current.innerHTML = '';
    } else {
      isValid &=
        this.validateRequired(
          this.state.studentId,
          this.studentIdInputRef.current,
          'Student ID cannot be blank!'
        ) &&
        this.validatePattern(
          this.state.studentId,
          /^[a-zA-Z0-9]*$/,
          this.studentIdInputRef.current,
          'Invalid ID'
        ) &&
        this.validatePattern(
          this.state.studentId,
          /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
          this.studentIdInputRef.current,
          'ID must have at least 1 number and 1 character'
        ) &&
        this.validateExist(
          this.state.studentId,
          this.studentIdInputRef.current,
          `ID already exists`
        );
    }

    // Validate Full Name
    isValid &=
      this.validateRequired(
        this.state.fullName,
        this.fullNameInputRef.current,
        'Full Name cannot be blank!'
      ) &&
      this.validatePattern(
        this.state.fullName,
        /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\ ]+$/,
        this.fullNameInputRef.current,
        'Invalid Name'
      );

    // Validate Phone Number
    isValid &=
      this.validateRequired(
        this.state.phoneNumber,
        this.phoneNumberInputRef.current,
        'Phone Number cannot be blank!'
      ) &&
      this.validatePattern(
        this.state.phoneNumber,
        /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
        this.phoneNumberInputRef.current,
        `Invalid VN's Phone Number`
      );

    // Validate Email
    isValid &=
      this.validateRequired(
        this.state.email,
        this.emailInputRef.current,
        'Email cannot be blank!'
      ) &&
      this.validatePattern(
        this.state.email,
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        this.emailInputRef.current,
        'Invalid Email'
      );

    return isValid;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let isValid = this.checkValid();

    if (isValid) {
      if (this.props.selectedStudent) {
        this.props.dispatch(updateStudentAction(this.state));
        // this.studentIdInputRef.current.innerHTML = '';
        this.setState({
          studentId: '',
          fullName: '',
          phoneNumber: '',
          email: '',
        });
      } else {
        this.props.dispatch(addStudentAction(this.state));
        this.setState({
          studentId: '',
          fullName: '',
          phoneNumber: '',
          email: '',
        });
      }
    }
  };

  handleCancel = (event) => {
    event.preventDefault();

    this.props.dispatch(cancelAction(this.state));
    this.studentIdInputRef.current.innerHTML = '';
    this.fullNameInputRef.current.innerHTML = '';
    this.phoneNumberInputRef.current.innerHTML = '';
    this.emailInputRef.current.innerHTML = '';
    this.setState({
      studentId: '',
      fullName: '',
      phoneNumber: '',
      email: '',
    });
  };

  render() {
    const isDisabled = this.props.selectedStudent ? true : false;

    return (
      <div className="card p-0">
        <div className="card-header text-white font-weight-bold bg-dark">
          REGISTER FORM
        </div>
        <div className="card-body">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label>Student ID</label>
                  <input
                    disabled={isDisabled}
                    value={this.state.studentId}
                    onChange={this.handleChangeInput}
                    name="studentId"
                    type="text"
                    className="form-control"
                  />
                  <span
                    ref={this.studentIdInputRef}
                    className="text-danger error-message"
                  ></span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    value={this.state.fullName}
                    onChange={this.handleChangeInput}
                    type="text"
                    name="fullName"
                    className="form-control"
                  />
                  <span
                    ref={this.fullNameInputRef}
                    className="text-danger error-message"
                  ></span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    value={this.state.phoneNumber}
                    onChange={this.handleChangeInput}
                    type="number"
                    name="phoneNumber"
                    className="form-control"
                  />
                  <span
                    ref={this.phoneNumberInputRef}
                    className="text-danger error-message"
                  ></span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    value={this.state.email}
                    onChange={this.handleChangeInput}
                    type="text"
                    name="email"
                    className="form-control"
                  />
                  <span
                    ref={this.emailInputRef}
                    className="text-danger error-message"
                  ></span>
                </div>
              </div>
            </div>

            {this.props.selectedStudent ? (
              <button className="btn btn-warning mr-2">Update</button>
            ) : (
              <button className="btn btn-primary mr-2">
                <i className="fa fa-plus mr-1" />
                Add
              </button>
            )}

            {this.props.selectedStudent ? (
              <button onClick={this.handleCancel} className="btn btn-dark mr-2">
                Cancel
              </button>
            ) : (
              <></>
            )}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    studentList: state.studentReducer.studentList,
    selectedStudent: state.studentReducer.selectedStudent,
  };
};

export default connect(mapStateToProps)(RegisterForm);
