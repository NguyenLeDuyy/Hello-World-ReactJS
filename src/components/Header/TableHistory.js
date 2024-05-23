import { useEffect, useState } from "react";
import { getHistory } from './../../service/apiServices';
import moment from 'moment';
const TableQuiz = (props) => {

    const [histories, setHistories] = useState({});

    useEffect(() => {
        fetchHistory();
    }, [])


    const fetchHistory = async () => {
        let res = await getHistory();
        console.log("check res history: ", res)
        if (res && res.EC === 0) {
            setHistories(res.DT.data);
        }
    }

    return (
        <>
            <div>List Quizzess: </div>
            <div>
                <table className="table table-hover table-bordered my-2">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Quiz Name</th>
                            <th scope="col">Total Question</th>
                            <th scope="col">Total Correct</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {histories && histories.length > 0 &&
                            histories.map((history, index) => (
                                <tr key={`table-quiz-${index}`}>
                                    <th scope="row">{history.id}</th>
                                    <td>Group 10 Test</td>
                                    <td>{history.total_questions}</td>
                                    <td>{history.total_correct}</td>
                                    <td>{
                                        moment(history.createdAt).utc().format('DD/MM/YYYY hh:mm:ss A')
                                    }</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default TableQuiz; 