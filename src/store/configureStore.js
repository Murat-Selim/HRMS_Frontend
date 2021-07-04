import { devToolsEnhancer } from "redux-devtools-extension";
import { createStore } from "redux";
import rootReducer from "./rootReducer";

export function configureStore() {
    return createStore(rootReducer, devToolsEnhancer())
}