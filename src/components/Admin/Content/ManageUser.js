import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';



const ManageUser = (props) => {
    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>
            <div className="users-content">
                <button>Add new users</button>
                <div>
                    table users
                </div>
                <ModalCreateUser />
            </div>
        </div>
    )
}
export default ManageUser;