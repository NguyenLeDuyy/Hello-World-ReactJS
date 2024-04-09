// class component
// function component

import React, { useState } from "react";
import AddUserInfor from "./AddUserinfor";
import DisplayInfor from "./Displayinfor";

// class MyComponent extends React.Component {

//     state = {
//         listUsers: [
//             { id: 1, name: "Nguyễn Lê Duy", age: "16" },
//             { id: 2, name: "Duy Nguyễn", age: "21" },
//             { id: 3, name: "Dưa Leo", age: "69" },
//         ]
//     }

//     handleAddNewUser = (userObj) => {
//         this.setState({
//             listUsers: [userObj, ...this.state.listUsers],
//             // listUsers: [...this.state.listUsers, userObj]
//         })
//     }

//     handleDeleteUser = (userId) => {
//         let listUsersClone = [...this.state.listUsers];
//         listUsersClone = listUsersClone.filter(item => item.id !== userId)
//         this.setState({
//             listUsers: listUsersClone,
//         })
//     }

//     // JSX
//     render() {
//         // DRY: Don't repeat yourself

//         return (
//             <>
//                 <div className='a'>
//                     <AddUserInfor handleAddNewUser={this.handleAddNewUser} />
//                     <br /><br />
//                     <DisplayInfor
//                         listUsers={this.state.listUsers}
//                         handleDeleteUser={this.handleDeleteUser}
//                     />

//                 </div>

//                 <div className='b'>

//                 </div>
//             </>
//         )
//     }
// }

const MyComponent = (props) => {

    const [listUsers, setListUsers] = useState([
        { id: 1, name: "Nguyễn Lê Duy", age: "16" },
        { id: 2, name: "Duy Nguyễn", age: "21" },
        { id: 3, name: "Dưa Leo", age: "69" },]);



    const handleAddNewUser = (userObj) => {
        setListUsers([userObj, ...listUsers])
    }

    const handleDeleteUser = (userId) => {
        let listUsersClone = [...listUsers];
        listUsersClone = listUsersClone.filter(item => item.id !== userId)
        setListUsers([...listUsersClone])
    }

    return (
        <>
            <div className='a'>
                <AddUserInfor handleAddNewUser={handleAddNewUser} />
                <br /><br />
                <DisplayInfor
                    listUsers={listUsers}
                    handleDeleteUser={handleDeleteUser}
                />

            </div>

            <div className='b'>

            </div>
        </>
    )
}

export default MyComponent;