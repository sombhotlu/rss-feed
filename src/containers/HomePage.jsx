/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import SideBar from './SideBar';
import MainPage from './MainPage';

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
const HomePage = () => {
    return (
        
            <div css={pagelayout}>
                <SideBar />
                <MainPage />
            </div>
    )
}

export default HomePage