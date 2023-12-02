import {configureStore} from "@reduxjs/toolkit"
import auhtSlice from "./auhtSlice";
const store=configureStore({
    reducer:{
        users:auhtSlice
        
    }
});

export default store;