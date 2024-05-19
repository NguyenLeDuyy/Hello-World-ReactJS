import { useEffect, useState } from 'react';
import Select from 'react-select';
import './ManageQuiz.scss'
import { postCreateNewQuiz } from '../../../../service/apiServices'
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
import { getAllQuizForAdmin } from "../../../../service/apiServices";
import QuizQA from './QuizQA';
import AssginQuiz from './AssignQuiz';


const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];

const ManageQuiz = (props) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);

    const [listQuiz, setListQuiz] = useState([])

    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }

    useEffect(() => {
        fetchQuiz();
    }, [])


    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        }
        // console.log(res)
    }

    const handleSubmitQuiz = async () => {
        //validate
        if (!name || !description) {
            toast.error('Name/Description is required')
            return
        }

        let res = await postCreateNewQuiz(description, name, type?.value, image);
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setName('')
            setDescription('')
            setImage(null);
            fetchQuiz();
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <div>
            <div className="quiz-container">
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Manage Quizzes</Accordion.Header>
                        <Accordion.Body>
                            <div className="add-new">
                                <fieldset className="border rounded-3 p-3">
                                    <legend className="float-none w-auto px-3">Add new Quiz:</legend>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder='Your quiz name'
                                            value={name}
                                            onChange={(event) => setName(event.target.value)}
                                        />
                                        <label >Name</label>
                                    </div>
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder='Description'
                                            value={description}
                                            onChange={(event) => setDescription(event.target.value)}
                                        />
                                        <label >Description</label>
                                    </div>
                                    <div className='my-3'>
                                        <Select
                                            value={type}
                                            // onChange={this.handleChange}
                                            defaultValue={type}
                                            onChange={setType}
                                            options={options}

                                            placeholder={"Quiz type..."}
                                        />
                                    </div>
                                    <div className="more-actions form-group">
                                        <label className='mb-1'>Upload Image</label>
                                        <input
                                            type='file'
                                            className='form-control'
                                            onChange={(event) => handleChangeFile(event)}
                                        />
                                    </div>

                                    <div className='mt-3'>
                                        <button
                                            className='btn btn-warning'
                                            onClick={() => handleSubmitQuiz()}
                                        >Save</button>
                                    </div>
                                </fieldset>
                            </div>
                            <div className="list-detail">
                                <TableQuiz
                                    listQuiz={listQuiz}
                                    setListQuiz={setListQuiz}
                                />
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Update Q/A Quizzes</Accordion.Header>
                        <Accordion.Body>
                            <QuizQA />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Assgin to Users</Accordion.Header>
                        <Accordion.Body>
                            <AssginQuiz />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

            </div>

        </div >
    )
}
export default ManageQuiz;