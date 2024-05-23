import { useState } from "react";


const PasswordNotComplete = (props) => {

    const [password, setPassword] = useState(''); // Add state for password
    const handleSubmitUpdatePassword = () => {
        alert('me')
    }

    return (
        <>
            <div className="col-md-5 password">
                <label className="form-label">Current Password</label>
                <input type="password"
                    className="form-control"
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <div className="col-md-5 password">
                <label className="form-label">New Password</label>
                <input type="password"
                    className="form-control"
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <div className="col-md-5 password">
                <label className="form-label">Confirm Password</label>
                <input type="password"
                    className="form-control"
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <button className="btn btn-warning" onClick={() => { handleSubmitUpdatePassword() }}>
                Update
            </button>
        </>
    )
}
export default PasswordNotComplete;