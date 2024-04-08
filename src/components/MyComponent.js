// class component
// function component

import React from "react";
import AddUserInfor from "./AddUserinfor";
import DisplayInfor from "./Displayinfor";

class MyComponent extends React.Component {

    state = {
        listUsers: [
            { id: 1, name: "Nguyễn Lê Duy", age: "16" },
            { id: 2, name: "Duy Nguyễn", age: "21" },
            { id: 3, name: "Dưa Leo", age: "69" },
        ]
    }

    handleAddNewUser = (userObj) => {
        this.setState({
            listUsers: [userObj, ...this.state.listUsers],
            // listUsers: [...this.state.listUsers, userObj]
        })
    }

    // JSX
    render() {
        // DRY: Don't repeat yourself
        return (
            <>
                <div className='a'>
                    <AddUserInfor handleAddNewUser={this.handleAddNewUser} />
                    <br /><br />
                    <DisplayInfor
                        listUsers={this.state.listUsers}
                    />

                </div>

                <div className='b'>

                </div>
            </>
        )
    }
}

export default MyComponent;