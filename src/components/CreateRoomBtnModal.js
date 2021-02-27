import React from 'react'
import {
    Alert,
    Button,
    ControlLabel,
    Form,
    FormControl,
    FormGroup,
    Icon,
    Modal,
    Schema
} from 'rsuite'
import firebase from 'firebase/app'
import { useModalState } from '../misc/customhooks'
import { database } from '../misc/firebase'

const { StringType } = Schema.Types

const modal = Schema.Model({
    name: StringType().isRequired('Chat name is required'),
    description: StringType().isRequired('Description is required')
})

const INITIAL_FORM = {
    name: '',
    description: ''
}

export default function CreateRoomBtnModal() {
    const { isOpen, open, close } = useModalState()
    const [fromValue, setFromValue] = React.useState(INITIAL_FORM)
    const [isloading, setIsLoading] = React.useState(false)
    const fromRef = React.useRef()

    const onFormChange = React.useCallback((value) => {
        setFromValue(value)
    }, [])

    const onSubmit = async () => {
        if (fromRef.current.check()) {
            return
        }
        setIsLoading(true)

        const newRoomdata = {
            ...fromValue,
            createAt: firebase.database.ServerValue.TIMESTAMP
        }

        try {
            await database.ref('rooms').push(newRoomdata)
            setIsLoading(false)
            setFromValue(INITIAL_FORM)
            close()
            Alert.info(`${fromValue.name}has been created`, 4000)
        } catch (err) {
            setIsLoading(false)
            Alert.error(err.message, 4000)
        }
    }
    return (
        <div className="mt-1">
            <Button
                block
                color="green"
                onClick={open}
            >
                <Icon icon="creative" />
                Create new chat room

                <Modal
                    show={isOpen}
                    onHide={close}
                >
                    <Modal.Header>
                        <Modal.Title>
                            New Chat room
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form
                            fluid
                            onClick={onFormChange}
                            fromValue={fromValue}
                            modal={modal}
                            ref={fromRef}
                        >
                            <FormGroup>
                                <ControlLabel>
                                    Room name
                                </ControlLabel>
                                <FormControl
                                    name="name"
                                    placeholder="Enter chat room name..."
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>
                                    Description
                                </ControlLabel>
                                <FormControl
                                    componentClass="textarea"
                                    row={5}
                                    name="Description"
                                    placeholder="Enter room discription..."
                                />
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer
                        block
                        appearance="primary"
                        onClick={onSubmit}
                        disabled={isloading}>
                        <Button block appearance="primary">
                            create new chat room
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Button>
        </div>
    )
}
