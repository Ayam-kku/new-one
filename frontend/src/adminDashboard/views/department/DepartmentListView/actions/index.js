export const changeStatusOfStateToStart = () => {
    return {
        type: "start"
    };
};

export const changeStatusOfStateToFalse = () => {
    return {
        type: "stop"
    };
};

export const changeStatusOfStateToStartUpdate = () => {
  return (dispatch, getState) => {
      dispatch({
          type: "startUpdate"
      })
  }
};

export const changeStatusOfStateToFalseUpdate = () => {
    return (dispatch, getState) => {
        dispatch({
            type: "stopUpdate"
        })
    }
};

export const changeStatusOfSearch = (data) => {
    console.log(data,'s8l');
    return {
        type: "search",
        search: data
    };
};