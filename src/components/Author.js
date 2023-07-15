import React, { Component } from 'react'

import { WEBSITEPATH } from './Variable';

class Author extends Component {
    constructor (props) {
        super (props)

        this.state = {
            id: this.props.info.id,
            name: this.props.info.name,
            avatar: this.props.info.avatar,
            telegramLink: this.props.info.telegramLink,
            boostyLink: this.props.info.boostyLink,
            otherLinks: this.props.info.otherLinks
        }
    }

    render () {
        if (this.props === null) return null;
        const authorLink = WEBSITEPATH + "/catalog?sort=up&author=" + this.state.id;

        let otherLinks = [];
        for (const link of this.state.otherLinks) {
            otherLinks.push (
                <a href={link}>{link}</a>
            )
        }

        return (
            <div class="author-card">
                <img class='author-avatar' src={this.state.avatar} alt="author-card"></img>
                <div class='author-name'>
                    <a href={authorLink} >{this.state.name}</a>
                </div>
                
                <div class='author-icons'>
                    <a href={this.state.boostyLink} class='boosty-icon' target='_blank' rel="noopener noreferrer"></a>
                    <a href={this.state.telegramLink} class='telegram-icon' target='_blank' rel="noopener noreferrer"></a>
                </div>
                <div class='author-links'>
                    {otherLinks}
                </div>
            </div>
        )
    }
}

export default Author;