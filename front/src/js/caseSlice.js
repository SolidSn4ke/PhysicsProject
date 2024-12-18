import {createSlice} from "@reduxjs/toolkit";

export const caseSlice = createSlice({
    name: 'cases',
    initialState: {
        case: 3,
        ballMass: 10,
        stiffness: 300,
        deformation: 5,
        carMass: 55,
        car2Mass: 55,
        friction: 0.6,
        isSleeping: true
    },
    reducers: {
        changeCase: (state, action) => {
            state.case = action.payload
            state.isSleeping = true
        },
        changeBallMass: (state, action) => {
            state.ballMass = action.payload
            state.isSleeping = true
        },
        changeStiffness: (state, action) => {
            state.stiffness = action.payload
            state.isSleeping = true
        },
        changeDeformation: (state, action) => {
            state.deformation = action.payload
            state.isSleeping = true
        },
        changeCarMass: (state, action) => {
            state.carMass = action.payload
            state.isSleeping = true
        },
        changeCar2Mass: (state, action) => {
            state.car2Mass = action.payload
            state.isSleeping = true
        },
        changeFriction: (state, action) => {
            state.friction = action.payload
            state.isSleeping = true
        },
        changeSleeping: (state, action) => {
            state.isSleeping = action.payload
        }
    }
})

export const {
    changeCase,
    changeBallMass,
    changeStiffness,
    changeDeformation,
    changeCarMass,
    changeCar2Mass,
    changeFriction,
    changeSleeping
} = caseSlice.actions

export default caseSlice.reducer