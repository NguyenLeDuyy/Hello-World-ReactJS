import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getQuesByQuizId } from "../../service/apiServices";
import _ from "lodash";
import './DetailQuiz.scss'
import Question from "./Question";

const DetailQuiz = () => {
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;

    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);

    const handlePre = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1)
    }
    const handleNext = () => {
        if (dataQuiz && index + 1 < dataQuiz.length)
            setIndex(index + 1)

    }

    const handleCheckBox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz); //react hook doesn't merge state
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if (question && question.answers) {
            question.answers = question.answers.map(item => {
                if (item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
        }
        // console.log('question.questionId: ', question.questionId)
        // console.log('questionId: ', questionId)
        let index = dataQuizClone.findIndex(item => +item.questionId === +question.questionId)
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone)
        }
    }

    useEffect(() => {
        fetchQuestions();
    }, [quizId])

    const fetchQuestions = async () => {
        const res = await getQuesByQuizId(Number(quizId))
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = [];
                    let quesDescription, image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            quesDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                    })
                    return { questionId: key, answers, quesDescription, image } // ghi kiểu này bằng answer: answer
                })
                .value()
            console.log("check data: ", data)
            setDataQuiz(data);
        }
    }
    console.log("check dataquiz", dataQuiz)
    return (
        <div className="detail-quiz-container .container">
            <div className="left-content col-7">
                <div className="title">
                    Quiz {quizId}: {location?.state?.quizTitle}
                    <hr />
                </div>
                <div className="q-body">
                    <img />
                </div>
                <div className="q-content">
                    <Question
                        index={index}
                        handleCheckBox={handleCheckBox}
                        data={dataQuiz && dataQuiz.length > 0
                            ?
                            dataQuiz[index]
                            : []} />
                </div>
                <div className="footer">
                    <button className="btn btn-primary"
                        onClick={() => handlePre()}
                    >Prev</button>
                    <button className="btn btn-secondary"
                        onClick={() => handleNext()}
                    >Next</button>
                    <button className="btn btn-warning"
                        onClick={() => handleNext()}
                    >Finish</button>
                </div>
            </div>
            <div className="right-content col-5">
                count down
            </div>
        </div >
    );
};

export default DetailQuiz;