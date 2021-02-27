import React from 'react'
import { Row, Grid, Col } from 'rsuite'
import Sidebar from '../components/Sidebar'

export default function Home() {
    return (
        <Grid fluid className='h-100'>
            <Row className='h-100'>
                <Col className='h-100'>
                    <Sidebar />
                </Col>
            </Row>
        </Grid>
    )
}
