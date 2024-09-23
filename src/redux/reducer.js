const initialState = {
  userId: null,
  admin: false,
};



const reducer = (state = initialState, action) => {
  switch (action.type) {
    // frontend components will dispatch an action object: 
    // { type: "USER-AUTH", payload: { userId: userId, admin: boolean } }
    case "USER_AUTH":
      return {
        ...state,
        userId: action.payload.userId,
        admin: action.payload.admin,
      };

      // triggered from front end with this dispatch action object:
      // { type: "LOGOUT"}
      case "LOGOUT":
        return {
          ...state,
          userId: null,
        };

      // triggered form front end with this dispath action object: { type: "ADMIN_AUTH", payload: { userId: userId, admin: boolean } }
      case "ADMIN_AUTH":
        return {
          ...state,
          userId: action.payload.userId,
          admin: action.payload.admin,
        };

      default:
        return state;
  }
};

export default reducer;