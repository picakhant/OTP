import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useReducer } from "react";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };

    case "LOGOUT":
      return { user: null };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  console.log("Auth context change", state);

  useEffect((first) => {
    const isUserExist = Cookies.get("user");
    if (isUserExist) {
      dispatch({ type: "LOGIN", payload: JSON.parse(isUserExist) });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
