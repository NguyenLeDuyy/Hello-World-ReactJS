import React, { useState } from "react";
import './Displayinfor.scss';
import logooo from './../logo.svg'; //logooo tượng trưng cho tên biến


// stateless vs stateful
// class DisplayInfor extends React.Component {

//     render() {
//         console.log('>>>> call me render')

//         //destructuring array/object
//         const { listUsers } = this.props; // "Vì" this.props là một object variable


//         //template + logic js
//         return (
//             <div className="display-infor-container">

//                 {true &&
//                     <>
//                         {listUsers.map((user, index) => { // không nên dùng index làm 'key' vì dễ bị bug
//                             return (
//                                 <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
//                                     <div>My name's {user.name}</div>
//                                     <div>My age's {user.age}</div>
//                                     <div>
//                                         <button onClick={() => { this.props.handleDeleteUser(user.id) }}>Delete</button>
//                                         {/* Trong React, khi bạn truyền một hàm như một prop và muốn truyền tham số cho hàm đó, bạn cần sử dụng một arrow function hoặc một hàm bình thường để "bọc" lời gọi hàm.

//                                         Nếu bạn viết như sau:

//                                         Thì hàm handleDeleteUser sẽ được gọi ngay lập tức khi component được render, chứ không phải khi bạn click vào button. Điều này thường không phải là điều bạn mong muốn.

//                                         Khi bạn sử dụng một arrow function như sau:

//                                         Thì hàm handleDeleteUser sẽ chỉ được gọi khi bạn click vào button, và user.id sẽ được truyền vào như một tham số. Đây chính là cách bạn truyền tham số cho một hàm callback trong React. */}
//                                     </div>
//                                     <hr />
//                                 </div>
//                             )
//                         })
//                         }
//                     </>
//                 }
//             </div>
//         )
//     }
// }

const DisplayInfor = (props) => {
    const { listUsers } = props; // "Vì" this.props là một object variable

    const [isShowHideListUSers, setShowHideListUSers] = useState(true);

    // this.state = {
    //     isShowHideListUSers: true,
    // }

    const handleShowHideListUsers = () => {
        // alert('Oke nhas ')
        // this.setState({
        //     isShowHideListUSers: true,
        // })
        setShowHideListUSers(!isShowHideListUSers)
    }

    return (
        <div className="display-infor-container">
            <div>
                <span onClick={() => handleShowHideListUsers()}>
                    {isShowHideListUSers === true ? "Hide list users: " : "Show list users: "}
                </span>
            </div>
            {isShowHideListUSers &&
                <>
                    {listUsers.map((user, index) => { // không nên dùng index làm 'key' vì dễ bị bug
                        return (
                            <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                                <div>My name's {user.name}</div>
                                <div>My age's {user.age}</div>
                                <div>
                                    <button onClick={() => { props.handleDeleteUser(user.id) }}>Delete</button>
                                    {/* Trong React, khi bạn truyền một hàm như một prop và muốn truyền tham số cho hàm đó, bạn cần sử dụng một arrow function hoặc một hàm bình thường để "bọc" lời gọi hàm.

                                            Nếu bạn viết như sau:

                                            Thì hàm handleDeleteUser sẽ được gọi ngay lập tức khi component được render, chứ không phải khi bạn click vào button. Điều này thường không phải là điều bạn mong muốn.

                                            Khi bạn sử dụng một arrow function như sau:

                                            Thì hàm handleDeleteUser sẽ chỉ được gọi khi bạn click vào button, và user.id sẽ được truyền vào như một tham số. Đây chính là cách bạn truyền tham số cho một hàm callback trong React. */}
                                </div>
                                <hr />
                            </div>
                        )
                    })
                    }
                </>
            }
        </div>
    )
}

export default DisplayInfor;