import "../styles/nopage.css";

export default function Home () {
    document.title = "404";
    return (
        <div class='nopage-message'>
            <p>Error 404</p>
        </div>
    )
}