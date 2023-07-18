import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import "../styles/article.css"
import { APIPATH, WEBSITEPATH } from '../components/Variable';

export default function Article (props) {
    const { id } = useParams ();

    const [ meta, setMeta ] = useState (null);
    const [ content, setContent ] = useState (null);

    useEffect ( () => {
        fetch ( APIPATH + "/article/" + id).then ( (response) => (response.json()) ).then ( (jsonRes) => {
            setMeta (jsonRes.meta);
            setContent (jsonRes.content);
        }).catch ( (err) => {
            console.log ("Error at fetching articlepath: " + err);
        })
    }, [])

    if (meta == null || content == null) return null;

    const catalogLink = WEBSITEPATH + "/catalog?"

    let spanTags = [];
    for (const tag of meta.tags) {
        spanTags.push (<a href={catalogLink + "tags=" + tag} key={tag}><span>{tag}</span></a>)
    }
    let spanCountires = [];
    for (const country of meta.country) {
        spanCountires.push (<a href={catalogLink + "countries=" + country} key={country}><span>{country}</span></a>)
    }

    document.title = meta.name;

    return (
        <div class="article-page">
            <div class='meta-info'>
                <div class="post-card-filters">
                    <div class="post-card-tags">
                        {spanTags}
                    </div>
                    <div class="post-card-countries">
                        {spanCountires}
                    </div>
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