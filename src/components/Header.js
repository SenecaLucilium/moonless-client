import "../styles/header.css"

export default function Header () {
    return (
        <div class='header'>
            <div class="headerImage"></div>
            <nav id="navbar">
                <ul>
                    <li><a href="/home">Безлуние</a></li>
                    <li><a href="/catalog">Каталог</a></li>
                    <li><a href="/authors">Авторы</a></li>
                </ul>
            </nav>
        </div>
    )
}