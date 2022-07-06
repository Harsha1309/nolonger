import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IUser } from "../../utils/TypeScript";
import { addfollowing, removefollowing } from "../../redux/actions/userAction";
import { RootStore } from "../../utils/TypeScript";
import { ALERT } from "../../redux/types/alertType";
import { useHistory } from "react-router-dom";

export interface IProps {
    role: String;
}

const Tick: React.FC<IProps> = ({ role }) => {
    return (
        <div className="text-center">
            {
                role === "user" && <button type="button" className="btn btn-danger"> <b> Flipper </b><i className="fas fa-check-circle text-light fa-lg my-2 "></i></button>
            } {
                role === "garnet" && <button type="button" className="btn btn-success"> <b> Garnet </b><i className="fas fa-check-circle text-light fa-lg my-2 "></i></button>
            } {
                role === "seer" && <button type="button" className="btn btn-info"> <b> Sheer </b><i className="fas fa-check-circle text-light fa-lg my-2 "></i></button>
            } {
                role === "scholar" && <button type="button" className="btn btn-primary"> <b> Scholar </b><i className="fas fa-check-circle text-light fa-lg my-2 "></i></button>
            }
        </div>
    );
};

export default Tick;
