import * as React from "react";
import ReactCanvasNest from "react-canvas-nest";

import Login from "./../../views/Login";

class Bootstrap extends React.Component {
    render() {
        return (
            <div className="login-container">
                <ReactCanvasNest className = 'canvasNest' config = {{ count: 100, pointColor: ' 255, 255, 255 ', lineColor: '0, 0, 0', follow: false }} />
                <div className="login-wrapper">
                    <Login />
                </div>
            </div>
        );
    }
}

export default Bootstrap;