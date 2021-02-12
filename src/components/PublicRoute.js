import React from 'react'
import { Redirect,Route  } from 'react-router';


export default function PrivateRoute({children,...routeProps}) {

    const profile = false;

    if( profile){
        return <Redirect to='/Home' />
    }

    return (
        <Route {...routeProps}>
            {children}
        </Route>
    )
}
