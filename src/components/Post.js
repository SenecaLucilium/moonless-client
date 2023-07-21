import React from 'react';

import "../styles/post.css";
import { WEBSITEPATH } from './Variable';

function Post (props) {
    if (props.meta === undefined) return null;

    const articleLink = WEBSITEPATH + '/article/' + props.meta.id;
    const catalogLink = WEBSITEPATH + '/catalog?';

    let tagsList = []
    for (const tag of props.meta.tags) {
        tagsList.push (<a href={catalogLink + "tags=" + tag} key={"post-"+tag}><span>{tag}</span></a>);
    }
    let countriesList = []
    for (const country of props.meta.country) {
        countriesList.push (<a href={catalogLink + "countries=" + country} key={"post-"+country}><span>{country}</span></a>)
    }

    return (
        <div class="post-card">
            <div class="post-card-image">
                <img src={props.meta.coverImage} alt="post-card"></img>
            </div>
            <div class="post-card-info">
                <div class="post-card-filters">
                    <div class="post-card-tags">
                        {tagsList}
                    </div>
                    <div class="post-card-countries">
                        {countriesList}
                    </div>
                </div>
                
                <a class="post-card-title" href={articleLink}>{props.meta.name}</a>
                <div class="post-card-author-date">
                    <span class="post-card-author">{props.meta.realName}</span>
                    <span class="post-card-date">{props.meta.date}</span>
                    <span class="post-card-views">Просмотров: {props.meta.views}</span>
                </div>
            </div>
        </div>
    )
}

export default Post;