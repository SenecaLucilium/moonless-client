import Post from "../components/Post"
import { useEffect, useState } from 'react';

import "../styles/home.css";
import { APIPATH } from "../components/Variable";

export default function Home () {
    const [ meta, setMeta ] = useState (null);

    useEffect (() => {
        try {
            fetch (APIPATH).then (response => response.json()).then ( (data) => {
                setMeta (data);
            })
        }
        catch (e) {
            console.log ( "Error at fetching homepath: " + e);
        }
        
    }, []);

    if (meta == null) return null;

    return (
        <div classame="Home">
            <div className="home-message">
                <p>Безлуние - архив русскоязычных статей о политике, экономике, истории и другом.
                    Цель архива - собрать статьи из забытых или закрытых за пейволом источников от разных авторов.
                    Статьи публикуются с минимальной задержкой в месяц от времени публикации на ресурсе автора.
                </p>
                <p>Телеграмм канал -<a href="https://t.me/m00n1ess"> https://t.me/m00n1ess</a></p>
                <p>Последние поступления на сайте:</p>
            </div>
            <div className="post-containter">
                <Post meta={meta[0]} />
                <Post meta={meta[1]} />
                <Post meta={meta[2]} />
                <Post meta={meta[3]} />
                <Post meta={meta[4]} />
            </div>
        </div>
    )
}