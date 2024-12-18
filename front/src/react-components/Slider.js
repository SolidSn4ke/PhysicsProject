import React from "react";

/** Компонент слайдера
 *  id - значение id тега для слайдера
 *  value - название
 *  min - минимальное значение
 *  max - максимальное значение
 * */
const Slider = ({id, value, min, max, onChange, step, initialValue}) => {
    return (
        <div className={"slider"}>
            <label htmlFor={id}>{"" + value}</label><br/>
            <label htmlFor={id}>{min}</label>
            <input value={initialValue} className={"inputSlider"} type={"range"} id={id} min={min} max={max} onChange={onChange} step={step}/>
            <label htmlFor={id}>{max}</label>
        </div>
    )
}

export default Slider;