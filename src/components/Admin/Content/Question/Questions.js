import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import './Questions.scss'
import { TbCodePlus, TbCodeMinus } from "react-icons/tb";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'
import Lightbox from "react-awesome-lightbox";
import { getAllQuizForAdmin, postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion } from "../../../../service/apiServices";

// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
// ];

const Questions = (props) => {

    const [selectedQuiz, setSelectedQuiz] = useState({})

    const [questions, setQuestions] = useState(
        [
            {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }
        ]
    )

    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataImagePreview, setDataImagePreivew] = useState({
        title: '',
        url: ''
    })

    const [listQuiz, setListQuiz] = useState([])

    useEffect(() => {
        fetchQuiz();
    }, [])

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })
            setListQuiz(newQuiz);
        }
    }

    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false,
                    }
                ]
            }
            setQuestions([...questions, newQuestion])
        }

        if (type === 'REMOVE') {
            let questionsClone = _.cloneDeep(questions);
            questionsClone = questionsClone.filter(question => question.id !== id)
            setQuestions(questionsClone)
        }
    }

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions);
        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false,
            }
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers.push(newAnswer);
            setQuestions(questionsClone);
        }
        if (type === 'REMOVE') {
            let questionsClone = _.cloneDeep(questions);
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== answerId)
            setQuestions(questionsClone);
        }


    }

    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionsClone = _.cloneDeep(questions);
            let index = questionsClone.findIndex(item => item.id === questionId);
            if (index > - 1) {
                questionsClone[index].description = value;
                setQuestions(questionsClone);
            }
        }
    }

    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > - 1 && event.target && event.target.files && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0];
            questionsClone[index].imageName = event.target.files[0].name;
            setQuestions(questionsClone);
        }
    }

    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > - 1) {
            questionsClone[index].answers =
                questionsClone[index].answers.map(answer => {
                    if (answer.id === answerId) {
                        if (type === 'INPUT')
                            answer.description = value;
                        if (type === 'CHECKBOX')
                            answer.isCorrect = value;
                    }
                    return answer;
                })
            setQuestions(questionsClone);
        }
    }

    const handleSubmitQuestionForQuiz = async () => {
        //todo
        //validate data

        //submit questions
        // postCreateNewQuestionForQuiz
        await Promise.all(questions.map(async (question) => {
            const q = await postCreateNewQuestionForQuiz(
                +selectedQuiz.value,
                question.description,
                question.imageFile);
            //submit answers
            await Promise.all(question.answers.map(async (answer) => {
                await postCreateNewAnswerForQuestion(
                    answer.description, answer.isCorrect, q.DT.id
                )
            }))
        }));

    }

    const handlePreviewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > - 1) {
            setDataImagePreivew({
                url: URL.createObjectURL(questionsClone[index].imageFile),
                title: questionsClone[index].imageName
            });
            setIsPreviewImage(true);
        }
    }

    return (
        <div className="questiosn-container">
            <div className="title">
                Manage Questions
            </div>
            <hr />
            <div className='add-new-question'>
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select Quiz: </label>
                    <Select className='select-quiz'
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>
                <div className='mt-3 mb-2'>
                    Add questions:
                </div>

                {
                    questions && questions.length > 0
                    && questions.map((question, index) => {
                        return (
                            <div key={question.id} className='q-main mb-4'>
                                <div className='questions-content'>
                                    <div className="form-floating description">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="name@example.com"
                                            value={question.description}
                                            onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)}
                                        />
                                        <label htmlFor={`question-${index}`} >
                                            Question {index + 1}'s description
                                        </label>
                                    </div>
                                    <div className='group-upload'>
                                        <label htmlFor={`${question.id}`}>
                                            <RiImageAddFill className='lable-upload' />
                                        </label>
                                        <input
                                            id={`${question.id}`}
                                            onChange={(event) => handleOnChangeFileQuestion(question.id, event)}
                                            type={'file'}
                                            hidden />
                                        <span>{question.imageName ?
                                            <span style={{ cursor: 'pointer' }}
                                                onClick={() => handlePreviewImage(question.id)}>{question.imageName}</span>
                                            :
                                            'No file has been uploaded'}
                                        </span>
                                    </div>
                                    <div className='btn-add'>
                                        <span onClick={() => { handleAddRemoveQuestion('ADD', '') }}>
                                            <TbCodePlus className='icon-add' />
                                        </span>
                                        {questions.length > 1 &&
                                            <span onClick={() => { handleAddRemoveQuestion('REMOVE', question.id) }}>
                                                <TbCodeMinus className='icon-remove' />
                                            </span>
                                        }
                                    </div>
                                </div>
                                {
                                    question.answers && question.answers.length > 0
                                    && question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className='answers-content'>
                                                <input
                                                    className="form-check-input iscorrect"
                                                    type="checkbox"
                                                    checked={answer.isCorrect}
                                                    onChange={(event) => handleAnswerQuestion('CHECKBOX', answer.id, question.id, event.target.checked)}
                                                />
                                                <div className="form-floating answer-name">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="name@example.com"
                                                        value={answer.description}
                                                        onChange={(event) => handleAnswerQuestion('INPUT', answer.id, question.id, event.target.value)}
                                                    />
                                                    <label htmlFor={`answer-${index}`} >Answers {index + 1}</label>
                                                </div>
                                                <div className='btn-group'>
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', question.id, '')}>
                                                        <AiFillPlusCircle className='icon-add' />
                                                    </span>
                                                    {question.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}>
                                                            <AiFillMinusCircle className='icon-remove' />
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })

                }
                {
                    questions && questions.length > 0 &&
                    <div>
                        <button
                            onClick={() => handleSubmitQuestionForQuiz()}
                            className='btn btn-warning'>Save Questions</button>
                    </div>
                }

                {
                    isPreviewImage &&
                    <Lightbox
                        image={dataImagePreview.url}
                        title={dataImagePreview.title}
                        onClose={() => setIsPreviewImage(false)}
                    />
                }
            </div>


        </div >
    )
}
export default Questions;