import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Loader, Nav } from 'rsuite'
import { useRooms } from '../../context/rooms.context'
import Roomitem from './Roomitem'

export default function ChatRoomList(props) {
    const { aboveElHeight } = props

    const rooms = useRooms()
    const location = useLocation()

    return (
        <Nav
            appearance="subtle"
            vertical
            reversed
            className="Overflow-y-scroll custom-scroll"
            style={{
                height: `calc(100% -${aboveElHeight}px)`
            }}
            activeKey={location.pathname}
        >
            {!rooms && (<Loader center vertical content="Loading" speed="slow" size="md" />)}
            {rooms && rooms.length > 0 && rooms.map(room => (
                <Nav.Item
                    componentClass={Link}
                    to={`/chat/${room.id}`}
                    key={room.id}
                    eventKey={`/chat/${room.id}`}
                >
                    <Roomitem room={room} />
                </Nav.Item>
            ))}

        </Nav>
    )
}
