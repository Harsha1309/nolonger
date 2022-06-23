import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { RootStore } from "../../utils/TypeScript";
const Referal = () => {
    const { auth } = useSelector((state: RootStore) => state);
    const history = useHistory()
    const handleClick = () => {
        if (auth.access_token) history.push('/create_blog');
        else history.push('/register');
    }
    const copy1 = () => {
        if (auth.access_token) {
            navigator.clipboard.writeText(window.location.origin.toString()+'/register?ref=' + auth.user?._id);
        }
        else history.push('/register');
        var close = document.getElementById('close');
        close?.click();
    }
    const copy2 = () => {
        if (auth.access_token && auth.user) {
            navigator.clipboard.writeText(auth.user?._id);
        }
        else history.push('/register');
        var close = document.getElementById('close');
        close?.click();

    }
    return (
        <div id="carouselExampleControls" className="carousel slide mb-3 d-flex  justify-content-center bg-secondary py-2" data-bs-ride="carousel" >
            <div className="carousel-inner" style={{ maxWidth: 900 }}>
                <div className="carousel-item active"  >
                    <img src="Refer_a_friend.png" className="d-block w-100" alt="Refer a friend" style={{ cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#exampleModal" />
                </div>
                <div className="carousel-item">
                    <img src="new_blog.png" className="d-block w-100" alt="Minimum withdraw 50." style={{ cursor: 'pointer' }} onClick={handleClick} />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Referal Box</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close"></button>

                        </div>
                        <div className="modal-body row ">
                            <div className="col-6 text-center">
                                <button type="button" className="btn btn-outline-success" onClick={copy1}>Copy Link</button>
                                <br />
                                <small>Copy the link share on : </small>
                                <br />
                                <i className="fab fa-facebook-f"></i> <i className="fab fa-twitter"></i> <i className="fab fa-instagram"></i> <i className="fab fa-linkedin"></i> <i className="fab fa-whatsapp"></i>
                            </div>

                            <div className="col-6 text-center">
                                <button type="button" className="btn btn-outline-success" onClick={copy2} data-dismiss="modal">Copy Code</button>
                                <br />
                                copy code tell your friend to enter at Sign-up.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Referal;
