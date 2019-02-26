import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import GlobalState from './context/GlobalState';
import SideBar from './containers/SideBar';
import MainPage from './containers/MainPage';

const pagelayout = css`
    display: grid;
    width: 100vw;
    height: 100vh;
    grid-gap: 0px 5px;
    grid-template-columns: 1fr 4fr;
    grid-template-rows: [row-1-start] 8rem [row-1end row-2-start] auto [row-2-end];
    grid-template-areas:
        'input main'
        'button main';
`;

const App = () => (
    <GlobalState>
        <div css={pagelayout}>
            <SideBar />
            <MainPage />
        </div>
    </GlobalState>
);

export default App;
