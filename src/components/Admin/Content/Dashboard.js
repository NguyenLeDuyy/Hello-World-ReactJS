import { useState, useEffect } from 'react';
import { getOverView } from '../../../service/apiServices';
import './Dashboard.scss';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const Dashboard = (props) => {

    const [dataOverView, setDataOverView] = useState([])
    const [dataChart, setDataChart] = useState([]);

    useEffect(() => {
        fetchDataOverView();
    }, [])

    const fetchDataOverView = async () => {
        const res = await getOverView();
        if (res && res.EC === 0) {
            setDataOverView(res.DT);
            // process chart data
            let Qz, Qs, As = 0;
            Qz = res?.DT?.others?.countQuiz ?? 0;
            Qs = res?.DT?.others?.countQuestions ?? 0;
            As = res?.DT?.others?.countAnswers ?? 0;
            const data = [
                {
                    "name": "Quizzes",
                    "Qz": Qz,
                },
                {
                    "name": "Questions",
                    "Qs": Qs,
                },
                {
                    "name": "Answers",
                    "As": As,
                }
            ]

            setDataChart(data);
        }
        console.log("check res: ", res)
    }

    console.log("check dataOverView: ", dataOverView)
    return (
        <div className="dashboard-container">
            <div className='title'>
                Analytics DashBoard
            </div>
            <div className='content'>
                <div className='c-left'>
                    <div className='child'>
                        <span className='text-1'>Total Users</span>
                        <span className='text-2'>

                            {dataOverView && dataOverView.users ?
                                <> {dataOverView.users.total} </>
                                : <>0</>
                            }
                        </span>

                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Quizzes</span>
                        <span className='text-2'>
                            {dataOverView && dataOverView.others ?
                                <> {dataOverView.others.countQuiz} </>
                                : <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Questions</span>
                        <span className='text-2'>
                            {dataOverView && dataOverView.others ?
                                <> {dataOverView.others.countQuestions} </>
                                : <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Answers</span>
                        <span className='text-2'>
                            {dataOverView && dataOverView.others ?
                                <> {dataOverView.others.countAnswers} </>
                                : <>0</>
                            }
                        </span>
                    </div>
                </div>
                <div className='c-right'>
                    <ResponsiveContainer width="95%" height="100%">
                        <BarChart data={dataChart}>
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <XAxis dataKey="name" />
                            {/* <YAxis /> */}
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Qz" fill="#8884d8" />
                            <Bar dataKey="Qs" fill="#82ca9d" />
                            <Bar dataKey="As" fill="#D88985" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;