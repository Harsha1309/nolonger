import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../redux/actions/notificationAction";
import { INotification, RootStore } from "../../utils/TypeScript";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Pagination from "../global/Pagination";
import { Link, useHistory } from "react-router-dom";
TimeAgo.addLocale(en);

const Notification = () => {
    const timeAgo = new TimeAgo("en-US");
    const { auth, notification } = useSelector((state: RootStore) => state);
    const [msg, setMsg] = useState<INotification[]>();
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        if (auth.access_token) {
            dispatch(getNotifications(auth));
        }
    }, [dispatch, history, auth]);

    useEffect(() => {
        document.getElementById("closebtn")?.click();
    }, [history.location.pathname]);

    useEffect(() => {
        setMsg(notification.data)
    }, [notification]);
    return (
        <>
            <div
                className="modal fade"
                id="modalPush"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-notify modal-info" role="document">
                    <div className="modal-content">
                        <div className="modal-header d-flex">
                            <h5 className="modal-title" id="staticBackdropLabel1">
                                Notifications
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                id="closebtn"
                            ></button>
                        </div>
                        <div
                            className="modal-body example"
                            style={{ maxHeight: "65vh", overflow: "scroll" }}
                        >
                            {msg?.length === 0 ?
                                <div className="text-center">
                                    <div>
                                        <i className="fas fa-bell fa-4x"></i>
                                    </div>
                                    <h5>No Notifications</h5>
                                </div> : <div className="list-group">

                                    {msg?.map((data, index) => (

                                        <Link
                                            key={index}
                                            to={data.url ? data.url : '#'}
                                            className="list-group-item list-group-item-action list-group-item-info mb-1" aria-current="true"
                                        >
                                            <div className="d-flex w-100 justify-content-between">
                                                <h5 className="mb-1">{data.msg}</h5>
                                                <small>{timeAgo.format(new Date(data.createdAt))}</small>
                                            </div>
                                            <p className="mb-1">{data.desc}</p>

                                        </Link>

                                    ))}

                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Notification;
