const collegeReducers = [];
export default (state = collegeReducers, action) => {
  switch (action.type) {
    case 'ADD COLLEGE':
      return [
        ...state,
        action.college
      ];
    default:
      return state;
  }
};
