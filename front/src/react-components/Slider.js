import React from "react";

/** Компонент слайдера
 *  id - значение id тега для слайдера
 *  value - название
 *  min - минимальное значение
 *  max - максимальное значение
 * */
const Slider = ({id, value, min, max, onChange}) => {
    return (
        <div>
            <label htmlFor={id}>{"" + value}</label><br/>
            <label htmlFor={id}>{min}</label>
            <input type={"range"} id={id} className={"inputSlider"} min={min} max={max} onInput={onChange}/>
            <label htmlFor={id}>{max}</label>
        </div>
    )
}

export default Slider;