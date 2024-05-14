import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuesByQuizId } from "../../service/apiServices";

const DetailQuiz = () => {
    const params = useParams();
    const quizId = params.id;
    console.log("check params: ", params)

    const [arrQues, setarrQues] = useState([]);

    useEffect(() => {
        fetchQuestions();
    }, [quizId])

    const fetchQuestions = async () => {
        const res = await getQuesByQuizId(Number(quizId))
        console.log("check resp: ", res)
        setarrQues(res.DT)
    }

    return (
        <div>
            Detail Quiz
        </div>
    );
};

export default DetailQuiz;