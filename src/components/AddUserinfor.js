import React from "react";

class AddUserInfor extends React.Component {

    state = {
        name: 'Cucumber',
        address: 'NguyenLeDuy1012',
        age: 21,
    };

    handleOnChangeInput = (event) => {
        this.setState({
            name: event.target.value,
        })
    }

    handleOnChangeAge = (event) => {
        this.setState({
            age: event.target.value,
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault(); //Khi bạn submit một form trong HTML, hành vi mặc định là trang sẽ được tải lại (refresh).
        this.props.handleAddNewUser({
            id: Math.floor((Math.random() * 100) + 1) + ' - random',
            name: this.state.name,
            age: this.state.age,
        });
    }

    render() {
        return (
            <div>
                My name is {this.state.name} and I'm {this.state.age}
                <form onSubmit={(event) => this.handleOnSubmit(event)}>
                    <label>Your name:</label>
                    <input
                        // value={this.state.name}
                        type="text"
                        onChange={(event) => this.handleOnChangeInput(event)}
                    />

                    <label>Your age:</label>
                    <input
                        // value={this.state.age}
                        type="text"
                        onChange={(event) => this.handleOnChangeAge(event)}
                    />
                    <button onClick={this.handleClick1}>Submit</button>
                </form>
            </div>
        )
    }
}

export default AddUserInfor;