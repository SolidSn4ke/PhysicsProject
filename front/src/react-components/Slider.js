import React from "react";

/** Компонент слайдера
 *  id - значение id тега для слайдера
 *  value - название
 *  min - минимальное значение
 *  max - максимальное значение
 * */
const Slider = ({id, value, min, max, onChange, step}) => {
    return (
        <div className={"inputSlider"}>
            <label htmlFor={id}>{"" + value}</label><br/>
            <label htmlFor={id}>{min}</label>
            <input type={"range"} id={id} min={min} max={max} onInput={onChange} step={step}/>
            <label htmlFor={id}>{max}</label>
        </div>
    )
}

export default Slider;