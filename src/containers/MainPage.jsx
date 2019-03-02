import React, { useContext } from 'react';
import styled from '@emotion/styled';
import FeedItems from '../components/FeedItems';
import URLContext from '../context/url-context';
let context;

const MainPageContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    grid-area: main;
    border-left: 3px solid black;
    margin-top: 20px;
`;

const MainPage = (props) => {
    context = useContext(URLContext);

    console.log("The selectedLink is  -->", context.selectedLink)
    console.log("Main Component Changed changed **",props.location.pathname === '/'+ context.selectedLink.id)
    return (
        <MainPageContainer>

            {
                context.selectedLink && context.selectedLink.id ?  
                    props.location.pathname === '/'+ context.selectedLink.id ? (
                <>
                    <h2 style={{ margin: '40px 0', width: '90%' }}>
                        {context.selectedLink.name}
                    </h2>
                    {context.data && context.data.items &&
                        context.data.items.map((item) => {
                            return ( <FeedItems
                                key={item.guid}
                                link={item.link}
                                title={item.title}
                                date={item.pubDate.slice(0,10)}
                                content={item.content}
                            />
                        )})}
                </>
            ): context.updateSelectedLink(props.location.pathname.substring(1)): 
            console.log("hey")
        }
        </MainPageContainer>
    );
};

export default MainPage;
