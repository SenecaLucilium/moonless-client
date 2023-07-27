import React from 'react';

import "../styles/post.css";
import { WEBSITEPATH } from './Variable';

function Post (props) {
    if (props.meta === undefined) return null;

    const articleLink = WEBSITEPATH + '/article/' + props.meta.id;
    const catalogLink = WEBSITEPATH + '/catalog?';

    let tagsList = []
    for (const tag of props.meta.tags) {
        tagsList.push (<a className="post-tag-link" href={catalogLink + "tags=" + tag} key={"post-"+tag}><span className="post-tag">{tag}</span></a>);
    }
    let countriesList = []
    for (const country of props.meta.country) {
        countriesList.push (<a className="post-country-link" href={catalogLink + "country=" + country} key={"post-"+country}><span className="post-country-tag">{country}</span></a>)
    }

    return (
        <div className="post">
            <div className="post-info">
                <div className="post-views">
                    <img src="https://images.freeimages.com/fic/images/icons/2232/wireframe_mono/48/eye.png" alt="Просмотры"></img>
                    <span className="post-view-count">{props.meta.views}</span>
                </div>
                <div className="post-author">{props.meta.realName}</div>
                <div className="post-date">{props.meta.date}</div>
            </div>
            <div className="post-title">
                <div className="post-tags">
                    {tagsList}
                    {countriesList}
                </div>
                <a className="post-name" href={articleLink}>{props.meta.name}</a>
            </div>
        </div>
    )
}

export default Post;