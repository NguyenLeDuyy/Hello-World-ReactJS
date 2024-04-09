import React, { useState } from "react";

// class AddUserInfor extends React.Component {

//     state = {
//         name: '',
//         address: 'NguyenLeDuy1012',
//         age: '',
//     };

//     handleOnChangeInput = (event) => {
//         this.setState({
//             name: event.target.value,
//         })
//     }

//     handleOnChangeAge = (event) => {
//         this.setState({
//             age: event.target.value,
//         })
//     }

//     handleOnSubmit = (event) => {
//         event.preventDefault(); //Khi bạn submit một form trong HTML, hành vi mặc định là trang sẽ được tải lại (refresh).
//         this.props.handleAddNewUser({
//             id: Math.floor((Math.random() * 100) + 1) + ' - random',
//             name: this.state.name,
//             age: this.state.age,
//         });
//     }

//     render() {
//         return (
//             <div>
//                 My name is {this.state.name} and I'm {this.state.age}
//                 <form onSubmit={(event) => this.handleOnSubmit(event)}>
//                     <label>Your name:</label>
//                     <input
//                         // value={this.state.name}
//                         type="text"
//                         onChange={(event) => this.handleOnChangeInput(event)}
//                     />

//                     <label>Your age:</label>
//                     <input
//                         // value={this.state.age}
//                         type="text"
//                         onChange={(event) => this.handleOnChangeAge(event)}
//                     />
//                     <button onClick={this.handleClick1}>Submit</button>
//                 </form>
//             </div>
//         )
//     }
// }

const AddUserInfor = (props) => {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('NguyenLeDuy1012');
    const [age, setAge] = useState('');

    const handleOnChangeInput = (event) => {
        setName(event.target.value)
    }

    const handleOnChangeAge = (event) => {
        setAge(event.target.value)
    }

    const handleOnSubmit = (event) => {
        event.preventDefault(); //Khi bạn submit một form trong HTML, hành vi mặc định là trang sẽ được tải lại (refresh).
        props.handleAddNewUser({
            id: Math.floor((Math.random() * 100) + 1) + ' - random',
            name: name,
            age: age,
        });
    }

    return (
        <div>
            My name is {name} and I'm {age}
            <form onSubmit={(event) => handleOnSubmit(event)}>
                <label>Your name:</label>
                <input
                    // value={this.state.name}
                    type="text"
                    onChange={(event) => handleOnChangeInput(event)}
                />

                <label>Your age:</label>
                <input
                    // value={this.state.age}
                    type="text"
                    onChange={(event) => handleOnChangeAge(event)}
                />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default AddUserInfor;