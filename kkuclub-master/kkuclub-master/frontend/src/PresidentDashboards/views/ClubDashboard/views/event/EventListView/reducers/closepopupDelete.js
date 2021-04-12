const closeReducer = (state = false, action) => {
    if (action.type === "open") {
        return true;
      }
      else if (action.type === "close") {
        return false;
      }
      return state;
};

export default closeReducer;