import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import { TbCirclePlus } from "react-icons/tb";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../service/apiServices";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";


const ManageUser = (props) => {

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});


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

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
        // console.log(user);
    }

    const handleClickBtnView = (user) => {
        setShowModalViewUser(true);
        setDataUpdate(user);
    }

    const resetUpdateData = () => {
        setDataUpdate({})
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
                    <TableUser
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUsers={fetchListUsers}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUsers={fetchListUsers}
                    resetUpdateData={resetUpdateData}
                />
                <ModalViewUser
                    show={showModalViewUser}
                    setShow={setShowModalViewUser}
                    dataUpdate={dataUpdate}
                    // fetchListUsers={fetchListUsers}
                    resetUpdateData={resetUpdateData}
                />
            </div>
        </div>
    )
}
export default ManageUser;