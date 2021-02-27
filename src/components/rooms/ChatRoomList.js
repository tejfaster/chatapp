import React from 'react'
import { Nav } from 'rsuite'
import Roomitem from './Roomitem'

export default function ChatRoomList(props) {
    const {aboveElHeight} = props
    return (
        <Nav
        appearance="subtle"
        vertical
        reversed
        className="Overflow-y-scroll custom-scroll"
        style={{
            height: `calc(100% -${aboveElHeight}px)`
        }}
        >   
        <Nav.Item>
            <Roomitem/>
        </Nav.Item>
        </Nav>
    )
}
