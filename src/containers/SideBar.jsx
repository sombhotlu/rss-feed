import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import styled from '@emotion/styled';
import URLContext from '../context/url-context';

// padding: 20px 0 0 20px;
// padding: 20px 0 0 20px;

const NavLinkStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    color: 'black',
    textDecoration: 'none',
    alignItems: 'center',
    padding: '10px',
    gridArea: 'button',
    margin: '10px',
    borderRadius: '5px',
    border: '1px solid black',
    background: 'white',
} 

const NavLinkActiveStyle = {
    background: "linear-gradient(#ffffff, #c9c7c7)",
    boxShadow: "2px 3px 4px #ccc",
}

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
    const [inputLink, setInputLink] = useState('');

    const context = useContext(URLContext);

    let messageDiv = context.message ? (
        context.message === 'Link Added Successfully' ? (
            <Message primary>{context.message}</Message>
        ) : (
            <Message>{context.message}</Message>
        )
    ) : null;

    const inputChangeHandler = (event) => {
        setInputLink(event.currentTarget.value);
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
                <SearchButton onClick={() => context.addLinkHandler(inputLink)}>
                    <span role="img" aria-label="search">
                        &#x1F50E;
                    </span>
                </SearchButton>
            </InputContainer>
            <ButtonContainer>
                {messageDiv}
                {context.links.map((link, index) =>{ 
                    // console.log("The link is -->", link);
                    return (
                        <NavLink
                            exact={true}
                            style={NavLinkStyle}
                            activeStyle={NavLinkActiveStyle}
                            to={"/" + link.id}
                            onClick={() => context.setSelectedLink(link)}
                            key={link.id}>
                            <span style={{ wordBreak: 'break-word' }}>{link.name}</span>&nbsp;
                            <span onClick={() => context.removeLinkHandler(link)}>
                                X
                            </span>
                        </NavLink>
                )})}
            </ButtonContainer>
        </>
    );
};

export default SideBar;
