import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { toast } from 'react-toastify';
import './Profile.scss'
import TableHistory from './TableHistory'
import UserInfor from './UserInfor'
import Password from './Password';

const Profile = (props) => {
    const { show, setShow, dataUpdate, setDataUpdate } = props;
    console.log(dataUpdate)
    const handleClose = () => setShow(false);


    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size='xl'
                backdrop="static"
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Manage User Infor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey="profile"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="home" title="User Information">
                            <UserInfor
                                setShow={setShow}
                            />
                        </Tab>
                        <Tab eventKey="profile" title="Change Password" className='change-password'>

                            <Password
                                setShow={setShow}
                            />
                        </Tab>
                        <Tab eventKey="contact" title="History">
                            <TableHistory
                            />
                        </Tab>
                    </Tabs>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default Profile;