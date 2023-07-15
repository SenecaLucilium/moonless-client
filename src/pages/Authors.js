import { useEffect, useState } from 'react'

import Author from '../components/Author.js'

import "../styles/authors.css"
import { APIPATH } from '../components/Variable';

export default function Authors () {
    const [ info, setInfo ] = useState (null);

    useEffect (() => {
        fetch (APIPATH + "/authors").then (response => response.json()).then ( (data) => {
            setInfo (data);
        })
    }, []);

    if (info == null) return null;

    let variableList = [];
    for (const author of info) {
        variableList.push (<Author info={author} />)
    }

    return (
        <div class='author-page'>
            <div class='author-message'>
                <p>Не забывайте поддерживать авторов статей, публикуемых на сайте. Подписывайтесь на их ресурсы, кидайте донаты на бусти или другие сервисы.</p>
            </div>
            <div class='author-list'>
                {variableList}
            </div>
        </div>
        
    )
}