const closeReducer = (state = false, action) => {
    if (action.type === "president") {
        return true;
      }
      else if (action.type === "pioneer") {
        return false;
      }
      return state;
};

export default closeReducer;