import { useEffect, useState } from "react";
import axios from "axios";


const TableUser = (props) => {

    const [listUsers, setListUsers] = useState([])

    useEffect(() => {

    }, []);

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&

                        listUsers.map((item, index) => {
                            return (
                                <tr key={'table-users-${index}'} >
                                    <td>{index + 1}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                </tr>
                            )
                        })}

                    {listUsers && listUsers.length === 0 &&
                        <tr>
                            <td colSpan={'4'}>Not found data</td>
                        </tr>
                    }
                </tbody>
            </table >
        </>
    )
}
export default TableUser;