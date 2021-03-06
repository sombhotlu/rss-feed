import styled from '@emotion/styled';

export const Button = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    grid-area: button;
    margin: 10px;
    border-radius: 5px;
    border: 1px solid black;

    background: ${ props  => props.active ? "linear-gradient(#ffffff, #c9c7c7)": "white"};
    box-shadow: ${ props  => props.active ? "2px 3px 4px #ccc": "none"};
    border-bottom: ${ props  => props.active ? "2px solid grey": "1px solid black"};

    &:active {
        background: linear-gradient(#ffffff, #c9c7c7);
        box-shadow: 2px 3px 4px #ccc;
        border-bottom: 2px solid grey;
    }

    &:hover {
        background-color: #edeaea;
  
    }

`;
