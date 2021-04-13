const closeReducer = (state = false, action) => {
    if (action.type === "start") {
        return true;
      }
      else if (action.type === "stop") {
        return false;
      }
      return state;
};

export default closeReducer;