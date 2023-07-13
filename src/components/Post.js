import React from 'react'
import "../styles/post.css"

function Post (props) {
    if (props.meta === undefined) return null;

    const articleLink = 'http://localhost:3000/article/' + props.meta.id;

    let tagsList = []
    for (const tag of props.meta.tags) {
        tagsList.push (<span>{tag}</span>);
    }

    console.log (props.meta.realName);

    return (
        <div class="post-card">
            <div class="post-card-image">
                <img src={props.meta.coverImage}></img>
            </div>
            <div class="post-card-info">
                <div class="post-card-tags">
                    {tagsList}
                </div>
                <a class="post-card-title" href={articleLink}>{props.meta.name}</a>
                <div class="post-card-author-date">
                    <span class="post-card-author">{props.meta.realName}</span>
                    <span class="post-card-date">{props.meta.date}</span>
                </div>
            </div>
        </div>
    )
}

export default Post;