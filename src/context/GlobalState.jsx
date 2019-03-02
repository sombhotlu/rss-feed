import React, { Component } from 'react';

import axios from 'axios';
import URLContext from './url-context';

let timeoutvar;

class GlobalState extends Component {
    state = {
        selectedLink: {},            
        links: [],
        message: '',
        errorMessage: '',
        // selectedLink: '',
        data: {}
    };

    // componentDidMount() {
    //     axios
    //         .get(this.state.selectedLink)
    //         .then((response) => {
    //             console.log('The response is -->', response);

    //             this.setState({ data: response.data });
    //         })
    //         .catch((error) => {
    //             console.log('The error is -->', error);
    //             console.log('Something went wrong !!');
    //             this.setState({ data: {} });
    //         });
    // }

    componentDidMount() {

        let newLinks = JSON.parse(localStorage.getItem('link'));
        // console.log("The new Links are -->", newLinks)
        if (newLinks)  this.setState({ links: newLinks})

    }

    componentDidUpdate(prevProps, prevState) {

        console.log('The selected link is -->', this.state.selectedLink);
        if(this.state.selectedLink && prevState.selectedLink )
        if (prevState.selectedLink.id !== this.state.selectedLink.id)
            axios
                .get(this.state.selectedLink.name)
                .then((response) => {
                    // console.log('The response is -->', response);

                    this.setState({ data: response.data });
                })
                .catch((error) => {
                    console.log('The error is -->',error.message);
                    this.setState(() => ({ data: {}}), () => {
                        alert(`CORS error for ${this.state.selectedLink.name}`)
                    });
                    
                });
    }

    selectedLinkChangeHandler = (link) => {
        this.setState({ selectedLink: link });
    };

    updateSelectedLink = (linkId) => {
        console.log("The state links are -->",this.state.links, typeof this.state.links[0].id , typeof linkId)

        const link = this.state.links.find( link => link.id == linkId);
        console.log("The link and linkId is -->", link, linkId)
        this.setState({ selectedLink: link})

    }

    addLinkHandler = (inputLink) => {
        console.log('The timeoutvar  -->', timeoutvar);
        if (this.state.links.find(link => link.name === inputLink)) {
            clearTimeout(timeoutvar);
            this.setState({ message: 'Link Already Present' }, () => {
                timeoutvar = setTimeout(() => {
                    this.setState({ message: '' });
                }, 5000);
            });
        } else {
            clearTimeout(timeoutvar);
            let newLink = {
                id: new Date().getTime(),
                name: inputLink
            }
            this.setState({ message: 'Link Added Successfully', links: [newLink, ...this.state.links] },
                () => {
                    localStorage.setItem(
                        'link',
                        JSON.stringify(this.state.links)
                    );
                    timeoutvar = setTimeout(() => {
                        this.setState({ message: '' });
                    }, 5000);
                }
            );
        }
    };

    removeLinkHandler = (removeLink) => {
        let newLinks = [...this.state.links];
        // console.log('remove link is -->', newLinks, removeLink);
        let removeIndex = newLinks.findIndex((link) => {
            return link.id === removeLink.id;
        });
        // console.log('The removeIndex is  ==>', removeIndex);
        newLinks.splice(removeIndex, 1);
        // console.log('Now the new Links is -->', newLinks);
        this.setState({ links: newLinks });
        localStorage.setItem('link', JSON.stringify(newLinks));
    };



    render() {
        console.log("Global State changed changed **")

        return (
        <URLContext.Provider
                value={{
                    data: this.state.data,
                    selectedLink: this.state.selectedLink,
                    setSelectedLink: this.selectedLinkChangeHandler,
                    setLinks: this.setLinksHandler,
                    removeLinkHandler: this.removeLinkHandler,
                    addLinkHandler: this.addLinkHandler,
                    message: this.state.message,
                    links: this.state.links,
                    updateSelectedLink: this.updateSelectedLink
                }}>

                {this.props.children}
            </URLContext.Provider>
        );
    }
}

export default GlobalState;
