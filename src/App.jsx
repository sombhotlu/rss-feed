import {useContext, useEffect} from 'react'
import { Switch, Route, withRouter } from 'react-router-dom';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import MainPage from './containers/MainPage';
import SideBar from './containers/SideBar';
import URLContext from './context/url-context';

const pagelayout = css`
    width: 100%;
    height: 100%;
    display: grid;
    height: 100vh;
    grid-gap: 0px 5px;
    grid-template-columns: 25% 75%;
    grid-template-rows: [row-1-start] 8rem [row-1end row-2-start] auto [row-2-end];
    grid-template-areas:
        'input main'
        'button main';
`;

const App = (props) => {

    let context = useContext(URLContext)

    console.log("App Component changed **", props, props.location.pathname)
    return (
            <div css={pagelayout}> 
                <SideBar />
                <Switch>
                    <Route path="/:code" component={MainPage} />
                    <Route path="/" component={MainPage} />
                </Switch>
            </div>
    );
};

export default withRouter(App);
