/*eslint-disable*/
import React, { useCallback } from 'react'
import { Button, Drawer, Icon, Alert } from 'rsuite'
import { useMediaQuery, useModalState } from '../../misc/customhooks'
import { auth } from '../../misc/firebase'
import Dashboard from '.'

export default function DashboardToggle() {

    const { isOpen, close, open } = useModalState()
    const isMobile = useMediaQuery('(max-width:792px)')
    const onSignOut = useCallback(() => {
        auth.signOut();
        Alert.info('SignOut', 4000);
        close();
    }, [close])

    return (
        <>
            <Button block color='blue' onClick={open}>
                <Icon icon="dashboard" />
            </Button>
            <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
                <Dashboard  onSignOut={onSignOut}/>
            </Drawer>
        </>
    )
}
