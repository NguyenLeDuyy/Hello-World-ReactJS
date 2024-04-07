// class component
// function component

import React from "react";
import UserInfor from "./Userinfor";
import DisplayInfor from "./Displayinfor";

class MyComponent extends React.Component {

    state = {
        listUsers: [
            { id: 1, name: "Nguyễn Lê Duy", age: "19" },
            { id: 2, name: "Duy Nguyễn", age: "21" },
            { id: 3, name: "Dưa Leo", age: "20" },
        ]
    }

    // JSX
    render() {
        // DRY: Don't repeat yourself
        return (
            <div>
                <UserInfor />
                <br /><br />
                <DisplayInfor
                    listUsers={this.state.listUsers}
                />

            </div>
        )
    }
}

export default MyComponent;