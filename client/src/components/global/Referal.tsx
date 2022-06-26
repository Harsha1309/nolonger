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
            
            navigator.clipboard.writeText(`Hi, I just invited you to use the Pediageek ! 
    
            Step1: Click on the link below register using your email id.
            Step2: Write your first blog and post it.
            Step3: Get Rs.10-100 on your account instatntly and earn 21-25 per 100 views on your blog.
            
            Here is my referal link click on it to register. ${window.location.origin.toString()}/register?ref=${auth.user?._id}`);
        }
        else history.push('/register');
        var close = document.getElementById('close');
        close?.click();
    }
    const copy2 = () => {
        if (auth.access_token && auth.user) {
            navigator.clipboard.writeText(`Hi, I just invited you to use the Pediageek ! 

            Step1: Use my code during registration on the website. link: https://pediageek.com/register
            Step2: Write your first blog and post it.
            Step3: Get Rs.10-100 on your account instatntly and earn 21-25 per 100 viewson your blog.
            
            Here is my code eneter at the registrain referal id and check my name before submit. ${auth.user?._id}`);
        }
        else history.push('/register');
        var close = document.getElementById('close');
        close?.click();

    }
    return (
        <div id="carouselExampleControls" className="carousel slide mb-3 d-flex  justify-content-center bg-light py-2" data-bs-ride="carousel" >
            <div className="carousel-inner" >
                <div className="carousel-item active"  >
                    <img src="Refer_a_friend.png" className="d-block w-100" alt="Refer a friend" style={{ cursor: 'pointer', maxHeight: '80vh' }} data-bs-toggle="modal" data-bs-target="#exampleModal" />
                </div>
                <div className="carousel-item">
                    <img src="new_blog.png" className="d-block w-100" alt="Minimum withdraw 50." style={{ cursor: 'pointer', maxHeight: '80vh' }} onClick={handleClick} />
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
