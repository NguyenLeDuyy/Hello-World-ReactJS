import React from "react";
import './Displayinfor.scss';
import logooo from './../logo.svg'; //logooo tượng trưng cho tên biến

class DisplayInfor extends React.Component {

    constructor(props) {
        console.log('>>>> call me constructor: 0')
        super(props);
        //babel compiler
        this.state = {
            isShowListUser: true,
        }
    }

    componentDidMount() {
        console.log('call me component did mount');
        setTimeout(() => {
            document.title = 'Duy Lê'
        }, 3000);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('call me component did update', this.props, prevProps);
        if (this.props.listUsers !== prevProps.listUsers) {
            if (this.props.listUsers.length === 5) {
                alert('You got 5 users')
            }
        }
    }

    handleShowHide = () => {
        this.setState({
            isShowListUser: !this.state.isShowListUser,
        })
    }

    render() {
        console.log('>>>> call me render')

        //destructuring array/object
        const { listUsers } = this.props; // "Vì" this.props là một object variable


        //template + logic js
        return (
            <div className="display-infor-container">
                {/* <img src={logooo} alt="Logo"></img> */}
                <div>
                    <span onClick={() => { this.handleShowHide() }}>
                        {this.state.isShowListUser ? "Hide list users: " : "Show list users: "}
                    </span>
                </div>
                {this.state.isShowListUser &&
                    <>
                        {listUsers.map((user, index) => { // không nên dùng index làm 'key' vì dễ bị bug
                            return (
                                <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                                    <div>My name's {user.name}</div>
                                    <div>My age's {user.age}</div>
                                    <div>
                                        <button onClick={() => { this.props.handleDeleteUser(user.id) }}>Delete</button>
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
}

export default DisplayInfor;