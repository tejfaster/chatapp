import React from 'react'
import { Divider } from 'rsuite'
import DashboardToggle from './dashboard/DashboardToggle'
import CreateRoomBtnModal from './CreateRoomBtnModal'
import ChatRoomList from './rooms/ChatRoomList'


export default function Sidebar() {

    const topSidebarRef = React.useRef()
    const [height,setHeight] = React.useState(0)

    React.useEffect(()=>{
        if(topSidebarRef.current){
            setHeight(topSidebarRef.current.scrollHeight)
        }
    },[topSidebarRef])

    return (
        <div className='h=100 pt-2'>
           <div ref={topSidebarRef}>
            <DashboardToggle/>
            <CreateRoomBtnModal/>
            <Divider>Join conversation</Divider>
           </div>
           <ChatRoomList aboveElHeight={height}/>
        </div>
    )
}
