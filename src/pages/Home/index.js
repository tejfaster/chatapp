import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router'
import { Row, Grid, Col } from 'rsuite'
import Sidebar from '../../components/Sidebar'
import { RoomsProvider } from '../../context/rooms.context'
import { useMediaQuery } from '../../misc/customhooks'
import { Chat } from './Chat'


export default function Home() {
    const isDesktop = useMediaQuery('(min-width:992px)')
    const { isExact } = useRouteMatch()

    const canRenderSiderbar = isDesktop || isExact

    return (
        <RoomsProvider>
            <Grid fluid className='h-100'>
                <Row className='h-100'>
                    {
                        canRenderSiderbar &&
                        <Col className='h-100'>
                            <Sidebar />
                        </Col>
                    }

                    <Switch>
                        <Route exact path='/chat/:chatId'>
                            <Col xs={24} md={16} className='h-100'>
                                <Chat />
                            </Col>
                        </Route>
                        <Route>
                            {
                                isDesktop &&
                                <Col xs={24} md={16} className="h-100">
                                    <h6 className="text-center mt-page">Please select chat</h6>
                                </Col>
                            }
                        </Route>
                    </Switch>
                </Row>
            </Grid>
        </RoomsProvider>
    )
}
