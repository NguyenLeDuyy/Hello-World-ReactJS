// class component
// function component

import React from "react";

class MyComponent extends React.Component {
    render() {
        return (
            <div>
                My first component
                {Math.random()}
            </div>
        )
    }
}

export default MyComponent;