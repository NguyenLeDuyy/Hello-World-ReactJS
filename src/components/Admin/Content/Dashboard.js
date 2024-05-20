import './Dashboard.scss';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const Dashboard = (props) => {

    const data = [
        {
            "name": "Page A",
            "uv": 4000,
            "pv": 2400
        },
        {
            "name": "Page B",
            "uv": 3000,
            "pv": 1398
        },
        {
            "name": "Page C",
            "uv": 2000,
            "pv": 9800
        },
        {
            "name": "Page D",
            "uv": 2780,
            "pv": 3908
        },
        {
            "name": "Page E",
            "uv": 1890,
            "pv": 4800
        },
        {
            "name": "Page F",
            "uv": 2390,
            "pv": 3800
        },
        {
            "name": "Page G",
            "uv": 3490,
            "pv": 4300
        }
    ]

    return (
        <div className="dashboard-container">
            <div className='title'>
                Analytics DashBoard
            </div>
            <div className='content'>
                <div className='c-left'>
                    <div className='child'>Total Users</div>
                    <div className='child'>Total Quizess</div>
                    <div className='child'>Total Questions</div>
                    <div className='child'>Total Answers</div>
                </div>
                <div className='c-right'>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart width={"100%"} height={"100%"} data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="pv" fill="#8884d8" />
                            <Bar dataKey="uv" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;