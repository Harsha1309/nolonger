import { useSelector } from "react-redux";
import { RootStore } from "../../utils/TypeScript";


const Notification = () => {
    const { auth } = useSelector((state: RootStore) => state);
    return (
   <div></div>

    );
};

export default Notification;
