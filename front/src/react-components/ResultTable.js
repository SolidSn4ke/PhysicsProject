import React from "react";
import {carDistance} from "../js/physics";

function ResultTable(props) {

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>Тележка проехала</td>
                        <td>{carDistance(props.carMass, props.ballMass, props.k, props.x, props.friction)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ResultTable