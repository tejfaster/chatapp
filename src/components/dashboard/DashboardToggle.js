import React from 'react'
import { Button,Drawer,Icon } from 'rsuite'
import { useModalState } from '../../misc/customhooks'
import Dashboard from '.'

export default function DashboardToggle() {

    const {isOpen,close,open} = useModalState()

console.log(isOpen)
    return (
        <>
        <Button block color='blue' onClick={open}>
        <Icon icon="dashboard"/>
        </Button>
        <Drawer full show={isOpen} onHide={close} placement="left">
            <Dashboard/>
        </Drawer>
        </>
    )
}
