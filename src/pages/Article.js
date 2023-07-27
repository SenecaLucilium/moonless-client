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
        spanTags.push (<a className="article-meta-tag-link" href={catalogLink + "tags=" + tag} key={tag}><span className="article-meta-tag">{tag}</span></a>)
    }
    let spanCountires = [];
    for (const country of meta.country) {
        spanCountires.push (<a className="article-meta-country-link" href={catalogLink + "country=" + country} key={country}><span className="article-meta-country-tag">{country}</span></a>)
    }

    document.title = meta.name;

    return (
        <div class="article">
            <div class='article-meta'>
                <div class="article-meta-filters">
                    <div className="articles-meta-tags">
                        {spanTags}
                        {spanCountires}
                    </div>
                </div>
                <h1 class='article-meta-title'>{meta.name}</h1>
                <div class='article-meta-info'>
                    <span class='article-meta-author'>{meta.realName}</span>
                    <span class='article-meta-date'>{meta.date}</span>
                    <img src="https://images.freeimages.com/fic/images/icons/2232/wireframe_mono/48/eye.png" alt="Просмотры"></img>
                    <span className='article-meta-views'>{meta.views}</span>
                    
                </div>
            </div>
            <div className='article-content'>
                <ReactMarkdown children={content} />
            </div>
        </div>
    )
}