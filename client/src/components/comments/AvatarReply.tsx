import React from 'react'
import { Link } from 'react-router-dom'

import { IUser,RootStore } from '../../utils/TypeScript'
import { useSelector } from 'react-redux';

interface IProps {
  user: IUser
  reply_user?: IUser
}
const AvatarReply: React.FC<IProps> = ({ user, reply_user }) => {
  const { darkMode } = useSelector((state: RootStore) => state);
  const {isdarkMode}=darkMode;
  return (
    <div className="avatar_reply">
      <img src={user.avatar} alt="avatar" />

      <div className={`ms-1 text-${isdarkMode?'white':'black'}`}>
        <small>
          <Link to={`/profile/${user._id}`}
          style={{ textDecoration: 'none', }}>
            { user.name }
          </Link>
        </small>

        <small className={`reply-text text-${isdarkMode?'white':'black'}`}>
          Reply to <Link to={`/profile/${reply_user?._id}`}>
            { reply_user?.name }
          </Link>
        </small>
      </div>
    </div>
  )
}

export default AvatarReply
