import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  RootStore,
  InputChange,
  FormSubmit,
  IBalance
} from "../../utils/TypeScript";

import NotFound from "../global/NotFound";

import { updateUser, resetPassword } from "../../redux/actions/userAction";
import { getAPI, patchAPI } from "../../utils/FetchData";
import Loading from "../global/Loading";
import { ALERT } from "../../redux/types/alertType";

const Monetary = () => {

  const { auth } = useSelector((state: RootStore) => state);
  const [balance, setBalance] = useState<IBalance>();
  const [mobilenumber, setMobilenumber] = useState('')
  const [withdraw, setWithdraw] = useState(0)
  const dispatch = useDispatch();
  const el1 = document.querySelector('#withdraw')
  useEffect(() => {

    getAPI('balance', auth.access_token).then((res) => {
      setBalance({ "_id": res.data.user, "balance": res.data.balance, "referalbalance": res.data.referalbalance, "blogbalance": res.data.blogbalance });

    })
  }, [])



  const handleSubmit = () => {
    if (auth.access_token && mobilenumber.length === 10 && withdraw >= 1 && balance && withdraw <= balance.balance) {
      dispatch({ type: ALERT, payload: { loading: true } })

      patchAPI('secure_withdraw', { mobilenumber, withdraw }, auth.access_token).then((res) => {
        setBalance({ "_id": res.data.balance.user, "balance": res.data.balance.balance, "referalbalance": res.data.balance.referalbalance, "blogbalance": res.data.balance.blogbalance });
        var close = document.getElementById('moneyclose');
        close?.click();
        dispatch({ type: ALERT, payload: { loading: false } })
        dispatch({ type: ALERT, payload: { success: "Withdraw request accepted you will receive Amount with in 1 Hour." } })

      }).catch((err) => {
        dispatch({ type: ALERT, payload: { loading: false } })
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
        var close = document.getElementById('moneyclose');
        close?.click();
      })
    }
    else {
      dispatch({ type: ALERT, payload: { errors: "Check paytm number or withdraw balance.Minimum withdraw balance is 1 Maximum up to" + balance?.balance } })
    }
    // if (password && auth.access_token)
    //   dispatch(resetPassword(password, cf_password, auth.access_token));
  };


  if (!balance) return <Loading />;

  return (
    <div style={{ zIndex: '100' }}>

      <div><button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Balance :</button>
        <ul className="dropdown-menu">
          <li><a className="dropdown-item position-relative" href="#">Referal : <span style={{ left: 104, position: 'absolute' }}><i className="fas fa-rupee-sign"></i>{balance?.referalbalance.toFixed(2)}</span></a></li>
          <li><a className="dropdown-item position-relative" href="#">Bounty :<span style={{ left: 104, position: 'absolute' }}><i className="fas fa-rupee-sign"></i>{balance?.blogbalance.toFixed(2)}</span></a></li>
          <li><hr className="dropdown-divider" /></li>
          <li><a className="dropdown-item position-relative" href="#">Withdrawn :<span style={{ left: 104, position: 'absolute' }}><i className="fas fa-rupee-sign"></i>{(balance?.referalbalance + balance?.blogbalance - balance?.balance).toFixed(2)}</span></a></li>
          <li><a className="dropdown-item position-relative" href="#">Remaining :<span style={{ left: 104, position: 'absolute' }}><i className="fas fa-rupee-sign"></i>{balance?.balance.toFixed(2)}</span></a></li>
        </ul>{' '}
        <input style={{
          width: 80,
          outline: 0,
          borderWidth: '0 0 2px',
          borderColor: 'blue',
          textAlign: 'center'

        }} value={`Rs. ${balance?.balance.toFixed(2)}`} readOnly />

        {' '}<button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">Withdraw</button>
      </div>



      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" >
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Withdraw Form :</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="moneyclose"></button>
            </div>
            <div className="modal-body">
              <div className="alert alert-primary" role="alert">
                Minumum withdraw amount is <b className="fas fa-rupee-sign">100.00</b>
              </div>
              <div className="mb-3 row">
                <label htmlFor="balance" className="col-sm-2 col-form-label">Balance</label>
                <div className="col-sm-10">
                  <input type="text" readOnly className="form-control-plaintext" id="balance" value={`Rs  ${balance.balance.toFixed(2)}`} name='balance' />
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Withdraw</label>
                <div className="col-sm-10">
                  <input onChange={e => setWithdraw(Number(e.target.value))} type="number" className="form-control" id="inputPassword" max={balance.balance} min={50} name='withdraw' placeholder="Enter Amount to withdraw" />
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="mobile" className="col-sm-2 col-form-label">Paytm : </label>
                <div className="col-sm-10">
                  <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">+91 </span>
                    <input onChange={e => setMobilenumber(e.target.value)} type="text" className="form-control" placeholder="Enter Paytm Connected Mobile number" id="mobile" aria-label="Username" aria-describedby="addon-wrapping" name="mobilenumber" />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button className="btn btn-primary" onClick={handleSubmit} id="withdraw" disabled={balance.balance < 100}>Withdraw</button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Monetary;


