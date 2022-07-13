import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IUser,RootStore } from '../../utils/TypeScript'

interface IProps {
  user: IUser
}

const AvatarComment: React.FC<IProps> = ({ user }) => {
  const { auth,darkMode } = useSelector((state: RootStore) => state);
  const {isdarkMode}=darkMode;
  return (
    <div className="avatar_comment">
      <img src={user.avatar} alt="avatar" />

      <small className={`d-block text-break `}>
        <Link to={`/profile/${user._id}`} className={`text-${isdarkMode?'white':'black'}`}>
          {user.name}
        </Link>
      </small>
    </div>
  )
}

export default AvatarComment
