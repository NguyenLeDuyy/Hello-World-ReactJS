import { useEffect, useState } from "react";
// import { getAllQuizForAdmin } from "../../../../service/apiServices";


const TableQuiz = (props) => {

    const { listQuiz } = props;
    // const [listQuiz, setListQuiz] = useState([])



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
                                    <td>
                                        <button
                                            className="btn btn-warning mx-3"
                                            onClick={() => props.handleClickBtnUpdate(quiz)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => props.handleClickBtnDelete(quiz)}

                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default TableQuiz; 