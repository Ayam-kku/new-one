const closeReducer = (state = false, action) => {
    if (action.type === "openupdated") {
        return true;
      }
      else if (action.type === "closeupdated") {
        return false;
      }
      return state;
};

export default closeReducer;