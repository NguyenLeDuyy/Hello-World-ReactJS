import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuesByQuizId } from "../../service/apiServices";
import _ from "lodash";

const DetailQuiz = () => {
    const params = useParams();
    const quizId = params.id;

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
                    let answer = [];
                    let quesDescription, image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            quesDescription = item.description;
                            image = item.image;
                        }
                        answer.push(item.answers);
                    })
                    return { questionId: key, answer, quesDescription, image } // ghi kiểu này bằng answer: answer
                })
                .value()
            console.log("check data: ", data)
        }
    }
    return (
        <div>
            Detail Quiz
        </div>
    );
};

export default DetailQuiz;