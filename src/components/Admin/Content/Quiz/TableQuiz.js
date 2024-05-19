import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../service/apiServices";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import ModalDeleteQuiz from './ModalDeleteQuiz';

const TableQuiz = (props) => {

    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    // const [listQuiz, setListQuiz] = useState([])
    const { listQuiz, setListQuiz } = props;

    useEffect(() => {
        fetchQuiz();
    }, [])


    const fetchQuiz = async () => {
        setDataDelete({})
        setDataUpdate({})
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        }
    }

    const handleClickBtnUpdate = (quiz) => {
        setShowModalUpdateQuiz(true);
        setDataUpdate(quiz);
    }

    const handleClickBtnDelete = (quiz) => {
        setShowModalDeleteQuiz(true);
        setDataDelete(quiz);
    }


    return (
        <>
            <div>List Quizzess: </div>
            <div>
                <table className="table table-hover table-bordered my-2">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Type</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listQuiz && listQuiz.length > 0 &&
                            listQuiz.map((quiz, index) => (
                                <tr key={`table-quiz-${index}`}>
                                    <th scope="row">{quiz.id}</th>
                                    <td>{quiz.name}</td>
                                    <td>{quiz.description}</td>
                                    <td>{quiz.difficulty}</td>
                                    <td style={{ display: "flex", gap: "15px" }}>
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => handleClickBtnUpdate(quiz)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleClickBtnDelete(quiz)}

                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <ModalUpdateQuiz
                show={showModalUpdateQuiz}
                setShow={setShowModalUpdateQuiz}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                fetchQuiz={fetchQuiz}
            />
            <ModalDeleteQuiz
                show={showModalDeleteQuiz}
                setShow={setShowModalDeleteQuiz}
                fetchQuiz={fetchQuiz}
                dataDelete={dataDelete}
            />
        </>
    )
}
export default TableQuiz; 