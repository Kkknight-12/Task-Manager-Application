import { combineReducers } from "redux"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

//
import TaskReducer from "./slices/taskSlice"

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
}

const rootReducer = combineReducers({
  Task: persistReducer(rootPersistConfig, TaskReducer),
})

export { rootPersistConfig, rootReducer }
