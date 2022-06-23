import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { IParams, RootStore } from '../../utils/TypeScript'

import UserInfo from '../../components/profile/UserInfo'
import OtherInfo from '../../components/profile/OtherInfo'
import Other from '../../components/profile/Other'
import Info from '../../components/profile/Info'

const Profile = () => {
  const { slug }: IParams = useParams()
  const { auth } = useSelector((state: RootStore) => state)

  return (
    <div className="row my-3">
      <div className="col-md-5 mb-3">
        {
          auth.user?._id === slug
            ? <UserInfo />
            : <OtherInfo id={slug} />
        }
      </div>

      <div className="col-md-7">
        {
          auth.user?._id === slug
            ? <Info />
            : <Other id={slug} />
        }
      </div>
    </div>
  )
}

export default Profile
