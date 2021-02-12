import React from 'react'
import firebase from 'firebase/app'
import { Container, Grid, Row, Panel, Col, Button, Icon,Alert } from 'rsuite'
import { auth , database} from '../misc/firebase'

export default function SignIn() {

    const signInWithProvider = async(provider) => {
        try{
            const {additionalUserInfo,user} = await auth.signInWithPopup(provider)
            // console.log("result",result)
            if(additionalUserInfo.isNewUser){
               await database.ref(`/profiles/${user.uid}`).set({
                    name:user.displayName,
                    createdAt : firebase.database.ServerValue.TIMESTAMP
                })
            }
            Alert.success('Succesfully Signed')
        }
        catch(error){
            Alert.error(error.message,4000)
        }
      
     
    }
    const onFacebookSignIn = () => {
        signInWithProvider(new firebase.auth.FacebookAuthProvider())
    }
    const onGoogleSignIn = () => {
        signInWithProvider(new firebase.auth.GoogleAuthProvider())
    }

    return (
        <Container>
            <Grid className="mt-page">
                <Row>
                    <Col xs={24} md={12} mdOffset={6}>
                        <Panel>
                            <div className="text-center">
                                <h2>Welcome to Chat</h2>
                                <p>Progressive chat platfrom fro neophytes</p>
                            </div>
                            <div className="mt-3">
                                <Button block color="blue" onClick={onFacebookSignIn}>
                                    <Icon icon="facebook" />
                                </Button>

                                <Button block color="green" onClick={onGoogleSignIn}>
                                    <Icon icon="google" />
                                </Button>
                            </div>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        </Container>
    )
}
