import { useState, useEffect } from "react";
import { getQuizByUser } from "../../service/apiServices"
import '../User/ListQuiz.scss'
import { useNavigate } from "react-router-dom";

const ListQuiz = () => {

    const navigate = useNavigate();

    const [arrQuiz, setArrQuiz] = useState([]);

    useEffect(() => {
        getQuizData();
    }, [])

    const getQuizData = async () => {
        const res = await getQuizByUser();
        if (res && res.EC === 0) {
            setArrQuiz(res.DT);
        }
    }

    return (

        <div className="list-quiz-container container">
            {arrQuiz && arrQuiz.length > 0 &&
                arrQuiz.map((quiz, index) => {
                    return (
                        <div key={`${index}-quiz`} className="card" style={{ width: "18rem" }}>
                            <img className="card-img-top" src={`data:image/jpeg; base64,${quiz.image}`} alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">Quiz &{index + 1}</h5>
                                <p className="card-text">{quiz.description}</p>
                                <button href="#" className="btn btn-primary"
                                    onClick={() => { navigate(`/quiz/${quiz.id}`) }}
                                >
                                    Start Now</button>
                            </div>
                        </div>
                    )

                })
            }
            {arrQuiz && arrQuiz.length === 0 &&
                <div>
                    You don't have any quiz now...
                </div>
            }

        </div>
    );
};

export default ListQuiz;