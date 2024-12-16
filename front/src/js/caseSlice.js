import {createSlice} from "@reduxjs/toolkit";

export const caseSlice = createSlice({
    name: 'cases',
    initialState: {
        case: 1,
        ballMass: 50,
        stiffness: 300,
        deformation: 5,
        carMass: 50,
        car2Mass: 50,
        friction: 0.5
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
        },
        changeCar2Mass: (state, action) => {
          state.car2Mass = action.payload
        },
        changeFriction: (state, action) => {
            state.friction = action.payload
        }
    }
})

export const {changeCase, changeBallMass, changeStiffness, changeDeformation, changeCarMass, changeCar2Mass, changeFriction} = caseSlice.actions

export default caseSlice.reducer