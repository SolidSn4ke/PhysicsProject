import '../css/Main.css';
import Slider from "./Slider";
import {
    changeBallMass,
    changeCar2Mass,
    changeCarMass,
    changeCase,
    changeDeformation,
    changeStiffness
} from "../js/caseSlice";
import {useDispatch, useSelector} from "react-redux";
import Scene from "./Scene";

/**
 Компонент основной страницы
 */
function Main() {
    const cases = useSelector((state) => state.case)
    const ballMass = useSelector((state) => state.ballMass)
    const stiffness = useSelector((state) => state.stiffness)
    const deformation = useSelector((state) => state.deformation)
    const carMass = useSelector((state) => state.carMass)
    const car2Mass = useSelector((state) => state.car2Mass)
    const dispatch = useDispatch();

    /** 3 случай */
    if (cases === 3){

    }

    /** 2 случай */
    if (cases === 2) {
        return (
            <div className="wrapper">
                {/** Блок с графикой */}
                <div id={"graph"}>
                    <Scene ballMass={ballMass} k={stiffness} x={deformation} carMass={carMass} car2Mass={car2Mass}
                           cases={cases}/>
                </div>
                {/** Блок с элементами управления*/}
                <div id={"controls"}>
                    <div id={"cases"}>
                        <input type={"button"} className={"scenarioButton"} id={"case1"} value={"Ситуация 1"}
                               onClick={() => dispatch(changeCase(1))}/>
                        <input type={"button"} className={"scenarioButton"} id={"case2"} value={"Ситуация 2"}
                               onClick={() => dispatch(changeCase(2))}/>
                        <input type={"button"} className={"scenarioButton"} id={"case3"} value={"Ситуация 3"}
                               onClick={() => dispatch(changeCase(3))}/>
                    </div>
                    <Slider id={"ballSlider"} value={"Масса шарика"} min={1} max={100} onChange={(e) => {
                        dispatch(changeBallMass(e.target.value))
                    }}/>
                    <Slider id={"cartSlider"} value={"Масса тележки"} min={1} max={100}
                            onChange={(e) => dispatch(changeCarMass(e.target.value))}/>
                    <Slider value={"Жесткость пружины"} min={100} max={500} onChange={(e) => {
                        dispatch(changeStiffness(e.target.value))
                    }}/>
                    <Slider value={"Деформация пружины (в см)"} max={10} min={1}
                            onChange={(e) => dispatch(changeDeformation(e.target.value))}/>
                    <Slider value={"Масса второй тележки"} min={1} max={10}
                            onChange={(e) => dispatch(changeCar2Mass(e.target.value))}/>
                </div>
            </div>
        )
    }

    /** 1 случай*/
    return (
        <div className="wrapper">
            {/** Блок с графикой */}
            <div id={"graph"}>
                <Scene ballMass={ballMass} k={stiffness} x={deformation} carMass={carMass} cases={cases}/>
            </div>
            {/** Блок с элементами управления*/}
            <div id={"controls"}>
                <div id={"cases"}>
                    <input type={"button"} className={"scenarioButton"} id={"case1"} value={"Ситуация 1"}
                           onClick={() => dispatch(changeCase(1))}/>
                    <input type={"button"} className={"scenarioButton"} id={"case2"} value={"Ситуация 2"}
                           onClick={() => dispatch(changeCase(2))}/>
                    <input type={"button"} className={"scenarioButton"} id={"case3"} value={"Ситуация 3"}
                           onClick={() => dispatch(changeCase(3))}/>
                </div>
                <Slider id={"ballSlider"} value={"Масса шарика"} min={1} max={100} onChange={(e) => {
                    dispatch(changeBallMass(e.target.value))
                }}/>
                <Slider id={"cartSlider"} value={"Масса тележки"} min={1} max={100}
                        onChange={(e) => dispatch(changeCarMass(e.target.value))}/>
                <Slider value={"Жесткость пружины"} min={100} max={500}
                        onChange={(e) => dispatch(changeStiffness(e.target.value))}/>
                <Slider value={"Деформация пружины (в см)"} max={10} min={1}
                        onChange={(e) => dispatch(changeDeformation(e.target.value))}/>
            </div>
        </div>
    );
}

export default Main;
