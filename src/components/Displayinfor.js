import React from "react";

class DisplayInfor extends React.Component {
    render() {
        //destructuring array/object
        const { listUsers } = this.props; // "Vì" this.props là một object variable
        console.log(listUsers);
        // const listUsers = this.props;
        // console.log(this.props);
        //props => viết tắt của properties
        return (
            <div>
                {listUsers.map((user, index) => { // không nên dùng index làm 'key' vì dễ bị bug
                    return (
                        <div key={user.id}>
                            <div>My name's {user.name}</div>
                            <div>My age's {user.age}</div>
                            <hr />
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default DisplayInfor;