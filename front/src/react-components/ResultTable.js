import React from "react";
import {
    carDistanceCase1,
    getFirstCartsDistCase2,
    getSecondCartDistanceCase3,
    getSecondCartsDistCase2
} from "../js/physics";

function ResultTable(props) {
    if (props.isSleeping) return

    if (props.cases === 1) return (
        <div>
            <table>
                <tbody>
                <tr>
                    <td>Тележка проехала</td>
                    <td>{Math.round(100 * carDistanceCase1(props.carMass, props.ballMass, props.k, props.x, props.friction)) / 100 + " м"}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )

    if (props.cases === 2) return (
        <div>
            <table>
                <tbody>
                <tr>
                    <td>Первая тележка проехала</td>
                    <td>{Math.round(100 * getFirstCartsDistCase2(props.friction, props.k, props.x, props.ballMass, props.carMass, props.car2Mass)) / 100 + "м"}</td>
                </tr>
                <tr>
                    <td>Вторая тележка проехала</td>
                    <td>{Math.round(100 * getSecondCartsDistCase2(props.friction, props.k, props.x, props.ballMass, props.carMass, props.car2Mass)) / 100 + "м"}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )

    if (props.cases === 3) return (
        <div>
            <table>
                <tbody>
                <tr>
                    <td>Тележка проехала</td>
                    <td>{Math.round(100 * getSecondCartDistanceCase3(props.friction, props.k, props.x, props.ballMass, props.carMass, props.car2Mass)) / 100 + "м"}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ResultTable