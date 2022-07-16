import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootStore } from "../../utils/TypeScript";
const Referal = () => {
    const { auth } = useSelector((state: RootStore) => state);
    const history = useHistory()

    const copy1 = () => {
        if (auth.access_token) {

            navigator.clipboard.writeText(`Hi, I just invited you to use the Pediageek ! 
    
            Step1: Click on the link below register using your email id.
            Step2: Write your first blog and post it.
            Step3: Get Rs.10-100 on your account instatntly and earn 21-25 per 100 views on your blog.
            
            Link. ${window.location.origin.toString()}/register?ref=${auth.user?._id}`);
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
            
            Id - ${auth.user?._id}`);
        }
        else history.push('/register');
        var close = document.getElementById('close');
        close?.click();
    }
    return (
        <div className="modal fade" id="referalmodal" tabIndex={-1} aria-labelledby="referalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="referalLabel">Referal Box</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close"></button>

                    </div>
                    <div className="modal-body row ">
                        <div>
                            <img src="https://www.pediageek.com/referal.png" alt="Refer and earn." className="position-relative w-100" />
                        </div>
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
    );
};

export default Referal;
