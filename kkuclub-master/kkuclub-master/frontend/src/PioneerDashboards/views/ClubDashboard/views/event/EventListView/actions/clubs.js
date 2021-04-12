export const addInfoCollege = (college)=>({
    type:'ADD COLLEGE',
    college:college
 });

 export const addInfoUsers = (users)=>({
    type:'ADD USERS',
    users:users
 });

 export const addInfoClub = (club)=>({
    type:'ADD CLUB',
    club:club
 });

 export const addPosition = (position)=>({
    type:'position',
    position:position
 });
 
export const presidState = () => {
    return {
        type: "president"
    };
};

export const pioState = () => {
    return {
        type: "pioneer"
    };
};


export const changeStatusOfStateToStartInfo = () => {
    return {
        type: "startInfo"
    };
};

export const changeStatusOfStateToFalseInfo = () => {
    return {
        type: "stopInfo"
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

  