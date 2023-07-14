import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import "../styles/article.css"

export default function Article (props) {
    const { id } = useParams ();

    const [ meta, setMeta ] = useState (null);
    const [ content, setContent ] = useState (null);

    useEffect ( () => {
        fetch ("http://localhost:5000/article/" + id).then ( (response) => (response.json()) ).then ( (jsonRes) => {
            setMeta (jsonRes.meta);
            setContent (jsonRes.content);
        }).catch ( (err) => {
            console.log ("Error at fetching an article: " + err);
        })
    }, [])

    if (meta == null && content == null) return null;

    let spanTags = [];
    for (const tag of meta.tags) {
        spanTags.push (<span>{tag}</span>)
    }

    return (
        <div class="article-page">
            <div class='meta-info'>
                <div class='post-card-tags'>
                    {spanTags}
                </div>
                <h1 class='article-title'>{meta.name}</h1>
                <div class='article-author-date'>
                    <span class='article-author'>{meta.realName}</span>
                    <span class='article-date'>{meta.date}</span>
                </div>
            </div>
            <div class='article-content'>
                <ReactMarkdown children={content} />
            </div>
        </div>
    )
}