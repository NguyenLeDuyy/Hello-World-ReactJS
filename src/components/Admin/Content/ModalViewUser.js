import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { TbCirclePlus } from "react-icons/tb";
import { toast } from 'react-toastify';
import _ from 'lodash';

const ModalViewUser = (props) => {
    const { show, setShow, dataUpdate } = props;
    // const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setEmail("");
        setPassword("");
        setUsername("");
        setRole("USER");
        setImage("");
        setPreviewImage("");
        props.resetUpdateData();
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        console.log('check useEffect', dataUpdate)
        if (!_.isEmpty(dataUpdate)) {
            //update state
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username);
            setRole(dataUpdate.role);
            setImage("");
            if (dataUpdate.image) {
                setPreviewImage(`data: image / jpeg; base64, ${dataUpdate.image}`);
            }
        }
    }, [dataUpdate])
    // chỗ này quan trọng! dataUpdate nằm trong dependencies này thì mỗi lần nay đổi giá trị (mỗi lần ấn vào button update => setdataUpdate(user)) thì sẽ chạy lại hook useEffect này

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
        else {
            // setPreviewImage("");
        }
        console.log('Upload file', event.target.files[0])
    }


    // console.log(dataUpdate)

    // console.log('check render: dataupdate', dataUpdate);
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop='static'
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email"
                                className="form-control"
                                value={email}
                                disabled
                                //= disabled={true}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password"
                                className="form-control"
                                value={password}
                                disabled
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input type="text"
                                className="form-control"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select className="form-select"
                                onChange={(event) => setRole(event.target.value)}
                                value={role}
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                                <option value="ADMIN">CUSTOMER</option>
                                <option value="ADMIN">SUPPLIER</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className="form-label lable-upload" htmlFor='labelUpload'>
                                <TbCirclePlus /> Upload File Image</label>
                            <input type='file'
                                id="labelUpload"
                                hidden
                                onChange={(event) => handleUploadImage(event)}
                            />
                        </div>

                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span>Preview-Image</span>
                            }

                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalViewUser;