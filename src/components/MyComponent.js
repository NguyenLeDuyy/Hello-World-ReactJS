// class component
// function component

import React from "react";

class MyComponent extends React.Component {

    state = {
        name: 'Cucumber',
        address: 'NguyenLeDuy1012',
        age: 21,
    };

    // handleClick = (event) => {
    //     console.log(" >> Click me my button <<");
    //     console.log(" My name is ", this.state.name);
    // }

    handleClick(event) {
        console.log(" >> Click me my button <<");

        // merge State => chỉ có trong React class
        this.setState({
            name: 'Duy Nguyễn',
            age: Math.floor((Math.random() * 100) + 1),
        })

        // this.setState({
        //     age: Math.floor((Math.random() * 100) + 1),
        // })
    }

    handleOnMouseOver(event) {
        // console.log(event.pageX);

    }

    render() {
        return (
            <div>

                My name is {this.state.name} and I'm {this.state.age}
                <button onClick={(event) => { this.handleClick(event) }}>Click me</button>
                <button onMouseOver={this.handleOnMouseOver}>Hover me</button>
            </div>
        )
    }
}

export default MyComponent;