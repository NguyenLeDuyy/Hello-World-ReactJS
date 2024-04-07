import React from "react";

class DisplayInfor extends React.Component {
    render() {
        //destructuring array/object
        const { age, name } = this.props; // do this.props là một object variable
        // console.log(this.props);
        //props => viết tắt của properties
        return (
            <div>
                <div>My name's {name}</div>
                <div>My age's {age}</div>
            </div>
        )
    }
}

export default DisplayInfor;