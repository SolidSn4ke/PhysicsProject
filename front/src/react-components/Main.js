import '../css/Main.css';
import Slider from "./Slider";
import {changeBallMass, changeCarMass, changeCase, changeDeformation, changeStiffness} from "../js/caseSlice";
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
    const dispatch = useDispatch();

    /** 2 и 3 случаи (переписать)*/
    if (cases > 1) {
        return (
            <div className="wrapper">
                {/** Блок с графикой */}
                <div id={"graph"}>
                    <Scene ballMass={ballMass} k={stiffness} x={deformation} carMass={carMass}/>
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
                    <Slider id={"ballSlider"} value={"Масса шарика"} min={1} max={100} onChange={(e) => {dispatch(changeBallMass(e.target.value))}}/>
                    <Slider id={"cartSlider"} value={"Масса тележки"} min={1} max={100} onChange={(e) => dispatch(changeCarMass(e.target.value))}/>
                    <Slider value={"Жесткость пружины"} min={100} max={500} onChange={(e) => {dispatch(changeStiffness(e.target.value))}}/>
                    <Slider value={"Деформация пружины (в см)"} max={10} min={1} onChange={(e) => dispatch(changeDeformation(e.target.value))}/>
                    <Slider value={"Масса второй тележки"} min={1} max={10}/>
                </div>
            </div>
        )
    }

    /** 1 случай*/
    return (
        <div className="wrapper">
            {/** Блок с графикой */}
            <div id={"graph"}>
                <Scene ballMass={ballMass} k={stiffness} x={deformation} carMass={carMass}/>
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
                <Slider id={"ballSlider"} value={"Масса шарика"} min={1} max={100} onChange={(e) => {dispatch(changeBallMass(e.target.value))}}/>
                <Slider id={"cartSlider"} value={"Масса тележки"} min={1} max={100} onChange={(e) => dispatch(changeCarMass(e.target.value))}/>
                <Slider value={"Жесткость пружины"} min={100} max={500} onChange={(e) => dispatch(changeStiffness(e.target.value))}/>
                <Slider value={"Деформация пружины (в см)"} max={10} min={1} onChange={(e) => dispatch(changeDeformation(e.target.value))}/>
            </div>
        </div>
    );
}

export default Main;
