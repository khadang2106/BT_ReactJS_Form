import {
  ADD_STUDENT,
  CANCEL,
  DELETE_STUDENT,
  SET_SELECTED_STUDENT,
  UPDATE_STUDENT,
} from '../types/studentType';

export const addStudentAction = (student) => {
  return {
    type: ADD_STUDENT,
    payload: student,
  };
};

export const setSelectedStudentAction = (student) => {
  return {
    type: SET_SELECTED_STUDENT,
    payload: student,
  };
};

export const updateStudentAction = (student) => {
  return {
    type: UPDATE_STUDENT,
    payload: student,
  };
};

export const deleteStudentAction = (student) => {
  return {
    type: DELETE_STUDENT,
    payload: student,
  };
};

export const cancelAction = (student) => {
  return {
    type: CANCEL,
    payload: student,
  };
};
