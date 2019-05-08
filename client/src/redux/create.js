import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

/**
 * clientMiddleware - handles => api requests
 */
import clientMiddleware from "./middleware/clientMiddleware";

// main reducer
import reducer from "./modules/reducer";

export default function configureStore(initialState, apiClient) {
  // create middleware
  let middleware = [thunkMiddleware, clientMiddleware(apiClient)];
  const loggerMiddleware = createLogger();

  //   enable redux-logger in developement
  if (process.env.NODE_ENV !== "production") {
    middleware = [...middleware, loggerMiddleware];
  }

  middleware = [...middleware];

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware)
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./modules/reducer", () => {
      const nextRootReducer = require("./modules/reducer").default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
