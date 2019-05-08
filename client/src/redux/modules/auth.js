import cookie from "js-cookie";

const LOGIN = "redux/auth/LOGIN";
const LOGIN_SUCCESS = "redux/auth/LOGIN_SUCCESS";
const LOGIN_FAIL = "redux/auth/LOGIN_FAIL";

const SIGNUP = "redux/auth/SIGNUP";
const SIGNUP_SUCCESS = "redux/auth/SIGNUP_SUCCESS";
const SIGNUP_FAIL = "redux/auth/SIGNUP_FAIL";

const LOGOUT = "redux/auth/LOGOUT";
const LOGOUT_SUCCESS = "redux/auth/LOGOUT_SUCCESS";
const LOGOUT_FAIL = "redux/auth/LOGOUT_FAIL";

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
    case LOGOUT:
      return {
        ...state,
        isLoggingout: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggingout: false,
        isAuthenticated: false,
        user: null
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggingout: false,
        logoutError: action.error
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
          console.log("LOGIN RESPONSE", response);
          return response;
        }
      } catch (e) {
        throw e;
      }
    }
  };
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

// logout user
export function logOut() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: async client => {
      try {
        const response = await client.delete("/auth/sign_out");
        if (response.status === 200) {
          setCookie("");
          return response;
        }
      } catch (err) {
        throw err;
      }
    }
  };
}

/*
 * set cookie helper
 * * * * * * * * * */
function setCookie(data, options) {
  cookie.set("token", data, options);
}
