// class component
// function component

import React from "react";
import UserInfor from "./Userinfor";
import DisplayInfor from "./Displayinfor";

class MyComponent extends React.Component {


    // JSX
    render() {
        const myInfor = ['ab', 'c', 'c']
        return (
            <div>
                <UserInfor />
                <br /><br />
                <DisplayInfor name="Nguyễn Lê Duy" age="19" />
                <hr />
                <DisplayInfor name="Duy Nguyễn" age={20} myInfor={myInfor} />
            </div>
        )
    }
}

export default MyComponent;