import {
  ADD_STUDENT,
  CANCEL,
  DELETE_STUDENT,
  SET_SELECTED_STUDENT,
  UPDATE_STUDENT,
} from '../types/studentType';

const DEFAULT_STATE = {
  studentList: [],
  selectedStudent: null,
};

const stringify = localStorage.getItem('STUDENT_LIST');

if (stringify) {
  DEFAULT_STATE.studentList = JSON.parse(stringify);
}

export const studentReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_STUDENT: {
      state.studentList = [...state.studentList, action.payload];

      localStorage.setItem('STUDENT_LIST', JSON.stringify(state.studentList));

      alert(`${action.payload.fullName} has been added successfully!`);

      break;
    }

    case SET_SELECTED_STUDENT: {
      state.selectedStudent = action.payload;

      break;
    }

    case UPDATE_STUDENT: {
      const result = window.confirm('Update this student?');

      if (result) {
        const data = [...state.studentList];

        const index = data.findIndex(
          (element) => element.studentId === action.payload.studentId
        );

        data[index] = action.payload;

        state.selectedStudent = null;
        state.studentList = data;

        localStorage.setItem('STUDENT_LIST', JSON.stringify(state.studentList));

        alert(`Update successfully!`);
      }

      break;
    }

    case DELETE_STUDENT: {
      const result = window.confirm(
        `Delete ${action.payload.fullName} from list?`
      );

      if (result) {
        const data = [...state.studentList];

        const index = data.findIndex(
          (element) => element.studentId === action.payload.studentId
        );

        data.splice(index, 1);

        state.studentList = data;

        localStorage.setItem('STUDENT_LIST', JSON.stringify(state.studentList));

        alert(`Delete successfully!`);
      }

      break;
    }

    case CANCEL: {
      state.selectedStudent = null;

      break;
    }
  }

  return { ...state };
};
