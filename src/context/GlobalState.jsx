import React, { Component } from 'react';
import axios from 'axios';
import URLContext from './url-context';

class GlobalState extends Component {
    state = {
        selectedLink: 'https://api.rss2json.com/v1/api.json?rss_url=https://aws.amazon.com/blogs/big-data/feed/',
        data: {}
    };

    componentDidMount() {
        axios.get(this.state.selectedLink)
        .then( response => {
            console.log("The response is -->", response);
            
            this.setState({ data: response.data})
        })
        .catch( error => {
            console.log("Something went wrong !!")
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if( prevState.selectedLink !== this.state.selectedLink)
        axios.get(this.state.selectedLink)
        .then( response => {
            console.log("The response is -->", response);
            
            this.setState({ data: response.data})
        })
        .catch( error => {
            console.log("Something went wrong !!")
        })
    }

    selectedLinkChangeHandler = (link) => {
        this.setState({ selectedLink: link });
    };


    render() {
        return (
            <URLContext.Provider
                value={{
                    data: this.state.data,
                    selectedLink: this.state.selectedLink,
                    setSelectedLink: this.selectedLinkChangeHandler
                }}>
                {this.props.children}
            </URLContext.Provider>
        );
    }
}

export default GlobalState;
