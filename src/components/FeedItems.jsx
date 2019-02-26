import React from 'react';
import styled from '@emotion/styled'

const ContentContainer = styled.div`
    border: 1px solid black;
    box-shadow: 4px 4px 3px 0px #ccc;
    margin-bottom: 30px;
    padding: 10px;
    width: 90%;
`

const FeedItems = ({ title, date, content}) => {
    console.log("the title, date and content", title, date,content)
    return (
        <ContentContainer>
            <p><span style={{ fontSize:"18px", textDecoration: "underline"}}>{title}</span> -  {date}</p>
            <p>{content}
            </p>
        </ContentContainer>
    );
};

export default FeedItems;
