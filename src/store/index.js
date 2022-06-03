import { createStore } from "redux";


import reducers from "./reducers";

let store;
store = createStore(reducers);

export default store;