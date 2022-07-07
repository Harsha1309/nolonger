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

const Onlytick: React.FC<IProps> = ({ role }) => {
    return (
        <span>
            {
                role === "user" && <i className="fas fa-check-circle text-danger"></i>
            } {
                role === "garnet" && <i className="fas fa-check-circle text-success "></i>
            } {
                role === "seer" && <i className="fas fa-check-circle text-info"></i>
            } {
                role === "scholar" && <i className="fas fa-check-circle text-primary"></i>
            }
        </span>
    );
};

export default Onlytick;
