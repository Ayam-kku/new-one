const closeReducer = (state = false, action) => {
    if (action.type === "startInfo") {
        return true;
      }
      else if (action.type === "stopInfo") {
        return false;
      }
      return state;
};

export default closeReducer;