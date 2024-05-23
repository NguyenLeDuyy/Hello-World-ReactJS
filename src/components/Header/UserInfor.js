import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useState, useEffect } from 'react';
import _ from 'lodash'
import { TbCirclePlus } from "react-icons/tb";
import { postUpdateProfile } from "../../service/apiServices";
import { doUpdate } from "../../redux/action/userAction";


const UserInfor = (props) => {

    const dispatch = useDispatch();
    const account = useSelector(state => state.user.account);

    const [dataUpdate, setDataUpdate] = useState({}); // Add state for dataUpdate
    const [email, setEmail] = useState(''); // Add state for email
    const [username, setUsername] = useState(''); // Add state for username
    const [password, setPassword] = useState(''); // Add state for password
    const [role, setRole] = useState('USER'); // Add state for role
    const [image, setImage] = useState(''); // Add state for previewImage
    const [previewImage, setPreviewImage] = useState(''); // Add state for previewImage

    const { setShow } = props;

    useEffect(() => {
        if (account && !_.isEmpty(account)) {
            setEmail(account.email);
            setUsername(account.username);
            setRole(account.ROLE);
            setImage(account.image);
            if (account.image) {
                setPreviewImage(`data:image/jpeg;base64,${account.image}`)
            }
        }
    }, [account])

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
        else {
            // setPreviewImage("");
        }
    }

    const handleSubmitUpdateUser = async () => {

        let data = await postUpdateProfile(username, account.image);
        console.log("component res: ", data);
        if (data && data.EC == 0) {
            toast.success(data.EM)
            setShow(false);
            setUsername(data.DT.username);

            //chưa chắc đúng
            const updatedAccount = {
                ...account,
                username: data.DT.username,
                image: data.DT.image
            };
            dispatch(doUpdate(updatedAccount));

            if (data.DT.image) {
                setPreviewImage(`data:image/jpeg;base64,${data.DT.image}`);
            } else {
                setPreviewImage(''); // Clear preview if image is removed
            }
        }
        else if (data && data.EC != 0) {
            toast.error(data.EM)
        }
    }



    return (
        <>
            <form className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input type="email"
                        className="form-control"
                        value={email}
                        disabled
                        //= disabled={true}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Password</label>
                    <input type="password"
                        className="form-control"
                        value={password}
                        disabled
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Username</label>
                    <input type="text"
                        className="form-control"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Role</label>
                    <select className="form-select"
                        onChange={(event) => setRole(event.target.value)}
                        value={role}
                        disabled
                    >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>
                </div>
                <div className='col-md-12'>
                    <label className="form-label lable-upload" htmlFor='labelUpload'>
                        <TbCirclePlus /> Upload File Image</label>
                    <input type='file'
                        id="labelUpload"
                        hidden
                        onChange={(event) => handleUploadImage(event)}
                    />
                </div>

                <div className='col-md-12 img-preview'>
                    {previewImage ?
                        <img src={previewImage} />
                        :
                        <span>Preview-Image</span>
                    }

                </div>

            </form>

            <button className="btn btn-warning" onClick={() => { handleSubmitUpdateUser() }}>
                Update
            </button>
        </>
    )
}

export default UserInfor;