import { createContext, useReducer } from "react";

export const Store = createContext();

const tentPhotos = [{}];

const reducer = (state, action) => {
  const newState = [...state];
  console.log(action);
  switch (action.type) {
    case "ADD_UPLOADER":
      [...newState, {}];
    case "ADD_PHOTO":
      newState[newState.length - 1].file = action.payload;
  }
  return newState;
};

export default (props) => {
  const [state, dispatch] = useReducer(reducer, tentPhotos);
  return (
    <Store.Provider value={{ state, dispatch }}>
      {props.children}
    </Store.Provider>
  );
};
