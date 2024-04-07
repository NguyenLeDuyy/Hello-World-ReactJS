// class component
// function component

import React from "react";

class MyComponent extends React.Component {

    state = {
        name: 'Cucumber',
        address: 'NguyenLeDuy1012',
        age: 21,
    };

    render() {
        return (
            <div>

                My name is {this.state.name} and I'm from {this.state.address}
            </div>
        )
    }
}

export default MyComponent;