const closeReducer = (state = false, action) => {
    if (action.type === "startUpdate") {
        return true;
      }
      else if (action.type === "stopUpdate") {
        return false;
      }
      return state;
};

export default closeReducer;