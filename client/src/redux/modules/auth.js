import cookie from "js-cookie";

const LOGIN = "redux/auth/LOGIN";
const LOGIN_SUCCESS = "redux/auth/LOGIN_SUCCESS";
const LOGIN_FAIL = "redux/auth/LOGIN_FAIL";

const SIGNUP = "redux/auth/SIGNUP";
const SIGNUP_SUCCESS = "redux/auth/SIGNUP_SUCCESS";
const SIGNUP_FAIL = "redux/auth/SIGNUP_FAIL";

const LOGOUT = "redux/auth/LOGOUT";

const LOAD = "redux/auth/LOAD";
const LOAD_SUCCESS = "redux/auth/LOAD_SUCCESS";
const LOAD_FAIL = "redux/auth/LOAD_FAIL";

const initialState = {
  isAuthenticated: false,
  user: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        isAuthenticated: false,
        authLoading: true,
        ...state
      };
    case LOAD_SUCCESS:
      return {
        isAuthenticated: true,
        authLoading: false,
        user: action.result.data,
        ...state
      };
    case LOAD_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        authLoading: false,
        user: null,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        logginIn: true,
        authLoading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        logginIn: false,
        authLoading: false,
        isAuthenticated: true,
        user: action.result.data
      };
    case LOGIN_FAIL:
      return {
        ...state,
        logginIn: false,
        authLoading: false,
        loginError: action.error
      };

    default:
      return state;
  }
}

/*
 * Actions
 * * * * */

// sign in
export function login(data) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: async client => {
      try {
        const response = await client.post("/auth/sign_in", { data });
        if (response.status === 200) {
          const authHeaders = ["access-token", "uid", "client"].reduce(
            (headerObj, key) => {
              let val = response.headers.get(key);
              if (val) {
                headerObj[key] = val;
                return headerObj;
              }
            },
            {}
          );
          const cookieOptions =
            { expires: new Date(response.headers.get("expiry") * 1000) } ||
            undefined;
          setCookie(authHeaders, cookieOptions);
        }

        return response;
      } catch (e) {
        throw e;
      }
    }
  };
}

// logout
export function logout() {
  return dispatch =>
    dispatch({
      type: LOGOUT,
      result: false
    });
}

// load user
export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: async client => {
      const response = await client.get("/auth/validate_token");
      return response;
    }
  };
}

// helpers
function setCookie(data, options) {
  cookie.set("token", data, options);
}
