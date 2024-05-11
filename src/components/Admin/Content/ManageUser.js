import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import { TbCirclePlus } from "react-icons/tb";
import { useState } from "react";
import TableUser from "./TableUser";



const ManageUser = (props) => {

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>
            <div className="users-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary"
                        onClick={() => setShowModalCreateUser(true)}>
                        <TbCirclePlus /> Add new users
                    </button>
                </div>
                <div className="table-users-container">
                    <TableUser />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                />
            </div>
        </div>
    )
}
export default ManageUser;