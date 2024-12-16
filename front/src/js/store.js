import {createStore} from "@reduxjs/toolkit";
import {caseSlice} from "./caseSlice";

export const store = createStore(caseSlice.reducer)