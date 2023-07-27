import React, { Component } from 'react'
import { APIPATH } from '../components/Variable';

class Author extends Component {
    constructor (props) {
        super (props)

        this.state = {
            id: this.props.info.id,
            name: this.props.info.name,
            mainLink: this.props.info.mainLink,
            otherLink: this.props.info.otherLink,
            articlesCounter: null,
            tagsCounter: null,
            viewsCounter: null
        }
    }

    componentDidMount () {
        fetch (APIPATH + "/author/" + this.state.id).then ( (result) => (result.json()) ).then ( (info) => {
            this.setState ( {articlesCounter: info.articlesCounter, tagsCounter: info.tagsCounter, viewsCounter: info.viewsCounter} );
        });
    }

    render () {
        if (this.props === null) return null;

        return (
            <div className="author">
                <div className="author-info">
                    <a className="author-name" href={this.state.mainLink}>{this.state.name}</a>
                    <a className="author-alternative-link" href={this.state.otherLink}>({this.state.otherLink})</a>
                </div>
                <div className="author-counters">
                    <div className="author-counter">
                        <img src="https://images.freeimages.com/fic/images/icons/2232/wireframe_mono/48/text_letter_t.png" alt="Количество постов"></img>
                        <span>{this.state.articlesCounter}</span>
                    </div>
                    <div className="author-counter">
                        <img src="https://images.freeimages.com/fic/images/icons/2232/wireframe_mono/48/paragraph.png" alt="Количество тегов"></img>
                        <span>{this.state.tagsCounter}</span>
                    </div>
                    <div className="author-counter">
                        <img src="https://images.freeimages.com/fic/images/icons/2232/wireframe_mono/48/eye.png" alt="Количество просмотров"></img>
                        <span>{this.state.viewsCounter}</span>
                    </div>
                </div>
            </div>
        )
            {/* // <div class="author-card">
            //     <img class='author-avatar' src={this.state.avatar} alt="author-card"></img>
            //     <div class='author-name'>
            //         <a href={authorLink} >{this.state.name}</a>
            //     </div>
                
            //     <div class='author-icons'>
            //         <a href={this.state.boostyLink} class='boosty-icon' target='_blank' rel="noopener noreferrer"></a>
            //         <a href={this.state.telegramLink} class='telegram-icon' target='_blank' rel="noopener noreferrer"></a>
            //     </div>
            //     <div class='author-links'>
            //         {otherLinks}
            //     </div>
            // </div> */}
    }
}

export default Author;