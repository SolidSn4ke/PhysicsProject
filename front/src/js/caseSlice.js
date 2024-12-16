import {createSlice} from "@reduxjs/toolkit";

export const caseSlice = createSlice({
    name: 'cases',
    initialState: {
        case: 1,
        ballMass: 1,
        stiffness: 1,
        deformation: 1,
        carMass: 2
    },
    reducers: {
        changeCase: (state, action) => {
            state.case = action.payload
        },
        changeBallMass: (state, action) => {
            state.ballMass = action.payload
        },
        changeStiffness: (state, action) => {
            state.stiffness = action.payload
        },
        changeDeformation: (state, action) => {
            state.deformation = action.payload
        },
        changeCarMass: (state, action) => {
            state.carMass = action.payload
        }
    }
})

export const {changeCase, changeBallMass, changeStiffness, changeDeformation, changeCarMass} = caseSlice.actions

export default caseSlice.reducer