import React, { useEffect, useRef, useCallback } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux'
import { checkImage, imageUpload } from '../../utils/ImageUpload'
import { ALERT } from '../../redux/types/alertType'
import { useSelector } from "react-redux";
import { RootStore } from "../../utils/TypeScript";


interface IProps {
    setBody: (value: string) => void
    body: string
}

const Quill: React.FC<IProps> = ({ setBody, body }) => {

    const dispatch = useDispatch()
    const quillRef = useRef<ReactQuill>(null)

    const modules = {
        toolbar: { container }, clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false
        }
        // , imageResize: {
        //     parchment: Quill.import('parchment'),
        //     displaySize: true
        // }
    }

    // Custom image
    const handleChangeImage = useCallback(() => {
        const input = document.createElement('input')
        input.type = "file"
        input.accept = "image/*"
        input.click()
        input.onchange = async () => {
            const files = input.files
            if (!files) return dispatch({
                type: ALERT, payload: { errors: 'File does not exist.' }
            });
            const file = files[0]
            const check = checkImage(file)
            if (check) return dispatch({ type: ALERT, payload: { errors: check } });
            dispatch({ type: ALERT, payload: { loading: true } })
            const photo = await imageUpload(file)
            let quill = quillRef.current;
            const range = quill?.getEditor().getSelection()?.index
            if (range !== undefined) {
                quill?.getEditor().insertEmbed(range, 'image', `${photo.url}`)
            }
            dispatch({ type: ALERT, payload: { loading: false } })
        }
    }, [dispatch])

    useEffect(() => {
        const quill = quillRef.current;
        if (!quill) return;

        let toolbar = quill.getEditor().getModule('toolbar')
        toolbar.addHandler('image', handleChangeImage)
    }, [handleChangeImage])

    const { darkMode } = useSelector((state: RootStore) => state);
    const { isdarkMode } = darkMode;

    return (
        <div>
            <ReactQuill theme="snow"
                modules={modules}
                placeholder="Write somethings..."
                value={body}
                onChange={e => setBody(e)}
                ref={quillRef}
                id="createblog"
                style={{color:isdarkMode?'black':'white'}}
            />
        </div>
    )
}

let container = [
    [{ 'font': [] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript

    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
    [{ 'align': [] }],

    ['clean', 'link', 'image', 'video']
]
export default Quill