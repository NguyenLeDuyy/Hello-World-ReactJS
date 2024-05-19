import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { TbCirclePlus } from "react-icons/tb";
import { toast } from 'react-toastify';
import { putUpdateQuizForAdmin } from "../../../../service/apiServices";
import _ from 'lodash';

const ModalUpdateQuiz = (props) => {
    const { show, setShow, dataUpdate } = props;
    // const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setName("");
        setDescription("");
        setType("");
        setImage("");
        setPreviewImage("");
        props.resetUpdateData();
    };

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        console.log('check useEffect', dataUpdate)
        if (!_.isEmpty(dataUpdate)) {
            //update state
            setName(dataUpdate.name);
            setDescription(dataUpdate.description);
            setType(dataUpdate.difficulty);
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

    const handleSubmitUpdateQuiz = async () => {
        //validate
        if (!name || !description) {
            toast.error('Name/Description is required')
            return
        }

        let data = await putUpdateQuizForAdmin(dataUpdate.id, description, name, type, image);
        console.log("component data edit: ", data);
        if (data && data.EC == 0) {
            // toast.success('Create a new participant succeed')
            toast.success(data.EM)
            handleClose()
            await props.fetchQuiz();
        }
        else if (data && data.EC != 0) {
            // toast.error('The email ' + email + ' is already exist')
            toast.error(data.EM)
        }
    }

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
                            <label className="form-label">Title</label>
                            <input type="text"
                                className="form-control"
                                value={name}
                                //= disabled={true}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input type="text"
                                className="form-control"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Type</label>
                            <select className="form-select"
                                onChange={(event) => setType(event.target.value)}
                                value={type}
                            >
                                <option value="EASY">EASY</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HARD">HARD</option>
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
                    <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalUpdateQuiz;