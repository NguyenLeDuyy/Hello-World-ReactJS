import _ from 'lodash'

const Question = (props) => {
    const { data, index } = props;
    if (_.isEmpty(data)) {
        return (<></>)
    }
    return (
        <>
            {data.image &&
                <div className='q-image'>
                    <img src={`data:image/jpeg; base64,${data.image}`} />
                </div>
            }
            <div className="question">Question {index + 1}: {data.quesDescription}?</div>
            <div className="answer">
                {data.answer && data.answer.length > 0 &&
                    data.answer.map((a, index) => {
                        return (
                            <div>
                                <div
                                    key={`answer-${index}`}
                                    className="a-child">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox" value="" />
                                        <label className="form-check-label">
                                            {a.description}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

            </div>
        </>
    )
}
export default Question;