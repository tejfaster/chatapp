import React from 'react'
import TimeAgo from 'timeago-react'

export default function Roomitem() {
    return (
        <div>
         <div className="d-flex justify-content-between align-items-center">
        <h3 className="text-disappear">Room name</h3>
        <TimeAgo
        datatime={new Date()}
        className="font-narmal text-black-45"
        />
         </div>
         <div className="d-flex align-item-center text-black-70">
             <span>No message yet...</span>
         </div>

        </div>
    )
}
