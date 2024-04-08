import React from "react";
import './Displayinfor.scss';

class DisplayInfor extends React.Component {


    state = {
        isShowListUser: true,
    }

    handleShowHide = () => {
        this.setState({
            isShowListUser: !this.state.isShowListUser,
        })
    }

    render() {

        //destructuring array/object
        const { listUsers } = this.props; // "Vì" this.props là một object variable
        // console.log(listUsers);
        // console.table(listUsers);
        // const listUsers = this.props;
        // console.log(this.props);
        //props => viết tắt của properties
        return (
            <div className="display-infor-container">
                <div>
                    <span onClick={() => { this.handleShowHide() }}>
                        {this.state.isShowListUser ? "Hide list users: " : "Show list users: "}
                    </span>
                </div>
                {this.state.isShowListUser &&
                    <div>
                        {listUsers.map((user, index) => { // không nên dùng index làm 'key' vì dễ bị bug
                            return (
                                <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                                    <div style={{ color: 'orange', paddingTop: '50px' }}>My name's {user.name}</div>
                                    <div>My age's {user.age}</div>
                                    <hr />
                                </div>
                            )
                        })
                        }
                    </div >
                }
            </div>
        )
    }
}

export default DisplayInfor;