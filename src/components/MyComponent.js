// class component
// function component

import React from "react";

class MyComponent extends React.Component {

    state = {
        name: 'Cucumber',
        address: 'NguyenLeDuy1012',
        age: 21,
    };

    handleClick(event) {
        console.log(" >> Click me my button <<");
        console.log(" My name is ", this.state.name);
    }

    handleOnMouseOver(event) {
        console.log(event.pageX);
    }

    render() {
        return (
            <div>

                My name is {this.state.name} and I'm from {this.state.address}
                <button onClick={this.handleClick}>Click me</button>
                <button onMouseOver={this.handleOnMouseOver}>Hover me</button>
            </div>
        )
    }
}

export default MyComponent;