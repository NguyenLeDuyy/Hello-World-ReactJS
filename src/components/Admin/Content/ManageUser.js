import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import { TbCirclePlus } from "react-icons/tb";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../service/apiServices";


const ManageUser = (props) => {

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);

    const [listUsers, setListUsers] = useState([])

    useEffect(() => {
        fetchListUsers();
    }, []);

    const fetchListUsers = async () => {
        let res = await getAllUsers();
        // console.log(res)
        if (res.EC === 0) {
            setListUsers(res.DT);
        }
    }



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
                    <TableUser listUsers={listUsers} />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUsers={fetchListUsers}
                />
            </div>
        </div>
    )
}
export default ManageUser;