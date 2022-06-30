import { useParams } from 'react-router-dom'

import { IParams } from '../../utils/TypeScript'

import CreateBlog from '../create_blog'

const UpdateDraft = () => {
    const { slug } = useParams<IParams>()

    return <CreateBlog id={slug} draft={true} />
}

export default UpdateDraft
