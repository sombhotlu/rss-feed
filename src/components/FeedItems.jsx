import styled from '@emotion/styled';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import renderHTML from 'react-render-html';

const ContentContainer = styled.div`
    border: 1px solid black;
    box-shadow: 4px 4px 3px 0px #ccc;
    margin-bottom: 30px;
    padding: 10px;
    width: 90%;
    height: 12.6rem;
    overflow: hidden;
    position: relative;

    &:hover {
        box-shadow: 6px 6px 3px 0px #ccc;
    }
`;


const FeedItems = ({ title, date, content, link }) => {
    return (
        <ContentContainer> 
            <p>
                <span style={{ fontSize: '18px', textDecoration: 'underline' }}>
                    {title}
                </span> - {date}
            </p>
            {renderHTML(content)}
            <a  target="_blank" rel="noopener noreferrer" href={link} 
                css={css`
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 10px;
                    width: 100%;
                    text-align: end;
                    margin: 0;
                    padding: 5px 0;
                    background-image: linear-gradient(to bottom, transparent, #e8ebef);
                `}>
                <span style={{padding: "10px"}}>More...</span>
            </a>
        </ContentContainer>
    );
};

export default FeedItems;
