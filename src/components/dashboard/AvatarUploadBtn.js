/* eslint-disable arrow-body-style */
import React, { useState, useRef } from 'react'
import { Alert, Button, Modal } from 'rsuite'
import AvatarEditor from 'react-avatar-editor'
import { useModalState } from '../../misc/customhooks'
import { useProfile } from '../../context/profile.context'
import { storage,database } from '../../misc/firebase'
import ProfileAvatar from '../ProfileAvatar'


const fileInputType = ".png, .jpeg, .jpg"

const acceptedFileType = ['image/png', 'image/jpeg', 'image/pjpeg'];
const isvalidFile = (file) => acceptedFileType.includes(file.type)

const getBlob = (canvas) => {
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) {
                resolve(blob)
            } else {
                reject(new Error('File process error'))
            }
        })
    })
}

export default function AvatarUploadBtn() {
    const { isOpen, open, close } = useModalState()
    const [img, setImg] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const avatarEditorRef = useRef()
    const { profile } = useProfile

    const onFileInputChange = (ev) => {
        const currFiles = ev.target.files

        if (currFiles.length === 1) {
            const file = currFiles[0];
            if (isvalidFile) {
                setImg(file)
                open()
            } else {
                Alert.warning(`Wrong file selected ${file.type}`, 4000)
            }
        }
    }

    const onUploadClick = async () => {
        const canvas = avatarEditorRef.current.getImageScaledToCanvas()

        setIsLoading(true)        
        try {

            const blob = await getBlob(canvas)
            const avatarFileRef = storage.ref(`/profile/${profile.uid}`).child('avatar')
            const uploadAvatarResult = await avatarFileRef.put(blob, {
                cacheControl: `public,max-age=${3600 * 24 * 3}`
            })

            const downloadURL = await uploadAvatarResult.ref.getDownloadURL()
            const userAvatarRef = database.ref(`/profile/${profile.uid}`).child('avatar')
            
            userAvatarRef.set(downloadURL)
            setIsLoading(false)
            Alert.info('Avatar has been uploaded',4000)

        } catch (err) {
            setIsLoading(false)
            Alert.error(err.message,4000)
        }

    }

    return (
        <div className='mt-3 text-center'>
            <ProfileAvatar src={profile.avatar} name={profile.name}/>
            <div>
                <label
                    htmlFor="avatar-upload"
                    className="d-block cursor-pointer padded">
                    Select new avatar
                   <input
                        id="avatar-upload"
                        type="file"
                        className="d-none"
                        accept={fileInputType}
                        onChange={onFileInputChange}
                    />
                </label>
                <Modal show={isOpen} onHide={close}>
                    <Modal.Header>
                        <Modal.Title>
                            Adjust and upload new Avatar
                       </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='d-flex justify-content-center align-items-center h-100'>
                            {
                                img &&
                                <AvatarEditor
                                    ref={avatarEditorRef}
                                    image={img}
                                    width={200}
                                    height={200}
                                    border={10}
                                    color={[255, 255, 255, 0.6]} // RGBA
                                    scale={1.2}
                                    rotate={0}
                                />
                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button block appearance="ghost" onClick={onUploadClick} disabled={isLoading} >
                            Upload new avatar
                       </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}
