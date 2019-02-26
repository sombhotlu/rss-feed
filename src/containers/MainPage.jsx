import React, { useContext } from 'react';
import styled from '@emotion/styled';
import FeedItems from '../components/FeedItems';
import URLContext from '../context/url-context';

const MainPageContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    grid-area: main;
    align-content: center;
    border-left: 3px solid black;
    margin-top: 20px;
`;

const MainPage = () => {
    let context = useContext(URLContext);

    console.log("The context data is  -->", context.data.items)
    return (
        <MainPageContainer>
            {context.selectedLink.length ? (
                <>
                    <h2 style={{ margin: '40px 0', width: '90%' }}>
                        {context.selectedLink}
                    </h2>
                    {context.data && context.data.items &&
                        context.data.items.map((item) => {
                            console.log("The item title is -->",item.title)
                            return ( <FeedItems
                                title={item.title}
                                date={item.pubDate.slice(0,10)}
                                content={item.content}
                            />
                        )})}
                </>
            ) : null}
        </MainPageContainer>
    );
};

export default MainPage;
