import React, { useState, useEffect, useContext } from 'react';
import { Button } from '../components/Button';
import styled from '@emotion/styled';
import URLContext from '../context/url-context';

let timeoutvar;

// padding: 20px 0 0 20px;
// padding: 20px 0 0 20px;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    grid-area: input;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-top: 20px;
    flex-direction: column;
    border-top: 3px solid black;
    grid-area: button;
`;

const Input = styled.input`
    height: 20px;
    width: 150px;
    padding: 5px;
    font-size: 14px;
    margin-right: 10px;

    ::placeholder {
        font-size: 14px;
    }
`;

const SearchButton = styled.button`
    border: 1px solid black;
    height: 2.4rem;
    width: 2.5rem;
    border-radius: 5px;
    background-color: white;
    padding: 5px;
`;

const Message = styled.div`
    font-size: 12px;
    color: ${(props) => (props.primary ? 'green' : 'red')};
`;

const SideBar = () => {
    const [links, setLinks] = useState(["https://api.rss2json.com/v1/api.json?rss_url=https://aws.amazon.com/blogs/big-data/feed/"]);
    const [inputLink, setInputLink] = useState('');
    const [message, setMessage] = useState('');
    // const [selectedLink, setSelectedLink] = useState('');
    const context = useContext(URLContext);


    useEffect(() => {
   
            let newLinks = JSON.parse(localStorage.getItem('link'));
            if (newLinks) setLinks(newLinks);

    }, []);


    let messageDiv = message ? (
        message === 'Link Added Successfully' ? (
            <Message primary>{message}</Message>
        ) : (
            <Message>{message}</Message>
        )
    ) : null;

    const inputChangeHandler = (event) => {
        setInputLink(event.currentTarget.value);
    };

    const addLinkHandler = () => {
        console.log("The timeoutvar  -->", timeoutvar)
        if (links.includes(inputLink)) {
            clearTimeout(timeoutvar);
            setMessage('Link Already Present');
            timeoutvar = setTimeout( function() {  setMessage('')}, 5000);
        } else {
            clearTimeout(timeoutvar);
            setLinks([inputLink, ...links]);
            localStorage.setItem('link', JSON.stringify([inputLink, ...links]));
            setMessage('Link Added Successfully');
            timeoutvar = setTimeout(function() {  setMessage('')}, 5000);
        }
    };

    const removeLinkHandler = (removeLink) => {
        let newLinks = [...links];
        console.log('remove link is -->', newLinks, removeLink);
        let removeIndex = newLinks.findIndex((link) => {
            return link === removeLink;
        });
        console.log('The removeIndex is  ==>', removeIndex);
        newLinks.splice(removeIndex, 1);
        console.log('Now the new Links is -->', newLinks);
        setLinks(newLinks);
        localStorage.setItem('link', JSON.stringify(newLinks));
    };

    return (
        <>
            <InputContainer>
                <Input
                    type="text"
                    onChange={inputChangeHandler}
                    value={inputLink}
                    placeholder="Enter the URL here"
                />
                <SearchButton onClick={addLinkHandler}>
                    <span role="img" aria-label="search">
                        &#x1F50E;
                    </span>
                </SearchButton>
            </InputContainer>
            <ButtonContainer>
                {messageDiv}
                {links.map((link) =>  (
                    <Button active={ link === context.selectedLink} onClick={ () => context.setSelectedLink(link)} key={link}>
                        <span>{link}</span>
                        <span onClick={() => removeLinkHandler(link)}> x </span>
                    </Button>
                ))}
            </ButtonContainer>
        </>
    );
};

export default SideBar;
