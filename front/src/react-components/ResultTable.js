import React from "react";
import {carDistanceCase1} from "../js/physics";

function ResultTable(props) {
    if (props.isSleeping) return

    function calculateCarDistance(cases) {
        if (cases === 1) return Math.round(100 * carDistanceCase1(props.carMass, props.ballMass, props.k, props.x, props.friction)) / 100 + " м"
        if (cases === 2) return 0 + "м"
        if (cases === 3) return 0 + "м"
    }

    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <td>Тележка проехала</td>
                    <td>{calculateCarDistance(props.cases)}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ResultTable