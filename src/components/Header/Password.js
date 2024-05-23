import { useState } from "react";
import { toast } from "react-toastify";
import { postChangePassword } from "../../service/apiServices";
import { useDispatch } from "react-redux";
import { doLogout } from "../../redux/action/userAction";

const Password = (props) => {

    const dispatch = useDispatch();

    const { setShow } = props;

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmitUpdatePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            setError("All fields are required.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New password and confirm password do not match.");
            return;
        }

        try {
            const data = await postChangePassword(currentPassword, newPassword);
            console.log("check data change pass: ", data)

            if (data && data.EC === 0) {
                toast.success(data.EM);
                // Clear form fields after successful update (optional)
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setError('');
                setShow(false);
                dispatch(doLogout());
            } else if (data && data.EC !== 0) {
                toast.error(data.EM);
                // Optionally, set an error message for specific API errors
            }
        } catch (error) {
            toast.error("An error occurred while updating the password.");
            console.error("Error updating password:", error);
        }
    };

    return (
        <>
            <div className="col-md-5 password">
                <label className="form-label">Current Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={currentPassword}
                    onChange={(e) => { setCurrentPassword(e.target.value); setError(''); }}
                />
            </div>
            <div className="col-md-5 password">
                <label className="form-label">New Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={newPassword}
                    onChange={(e) => { setNewPassword(e.target.value); setError(''); }}
                />
            </div>
            <div className="col-md-5 password">
                <label className="form-label">Confirm Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button className="btn btn-warning" onClick={handleSubmitUpdatePassword}>
                Update
            </button>
        </>
    );
};

export default Password;
