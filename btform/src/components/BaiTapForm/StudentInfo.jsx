import React, { Component } from 'react';
import RegisterForm from './RegisterForm';
import StudentManagement from './StudentManagement';
import './style.css';

export default class StudentInfo extends Component {
  render() {
    return (
      <div className="w-75 mx-auto mt-5">
        <RegisterForm />

        <StudentManagement />
      </div>
    );
  }
}
