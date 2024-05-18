import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteQuiz } from '../../../../service/apiServices';

const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataDelete } = props;

    const handleClose = () => setShow(false);

    const handleSubmitDeleteQuiz = async () => {
        let data = await deleteQuiz(dataDelete.id);
        // console.log(data)
        // console.log(dataDelete)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose()
            await props.fetchQuiz();
        }
        else if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete the quiz?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this quiz with name:
                    <b>
                        {dataDelete && dataDelete.name ? " " + dataDelete.name : ""}
                    </b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => { handleSubmitDeleteQuiz() }}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;