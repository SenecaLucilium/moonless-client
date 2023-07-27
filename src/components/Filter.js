import { Component } from 'react';

import "../styles/filter.css";
import { WEBSITEPATH } from './Variable';

function CheckboxTagsList (props) {
    let checkboxList = [];

    for (const tag of props.tags) {
        checkboxList.push (
            <label key={tag}><input type="checkbox" name={tag} id={tag} />{tag}</label>
        );
    }
    return (
        <div className="filter-select-options">
            {checkboxList}
        </div>
    )
}

function CheckboxCountriesList (props) {
    let checkboxList = [];

    for (const country of props.countries) {
        checkboxList.push (
            <label key={country}><input type="checkbox" name={country} id={country} />{country}</label>
        );
    }
    return (
        <div className="filter-select-options">
            {checkboxList}
        </div>
    )
}

function RadioAuthorsList (props) {
    let radioList = [];

    for (const author of props.authors) {
        radioList.push (
            <label key={author.id}><input type="radio" name="author" value={author.id} id={author.id} />{author.realName}</label>
        )   
    }

    return (
        <div className="filter-select-options">
            {radioList}
        </div>
    )
}

class Filter extends Component {
    constructor (props) {
        super (props);
    }

    componentDidMount () {
        if (this.props.filter.time === "down") {
            this.timeFilter ();
        }
        else if (this.props.filter.views === "up") {
            this.viewsFilter ();
        }
        else if (this.props.filter.views === "down") {
            this.viewsFilter ();
            this.viewsFilter ();
        }

        const hiddenTags = document.getElementsByClassName ("filter-select-options");

        const authorElems = hiddenTags[0].getElementsByTagName ("input");
        for (const elem of authorElems) {
            if (this.props.filter.author === elem.id) elem.checked = true;
        }

        const tagElems = hiddenTags[1].getElementsByTagName ("input");
        for (const elem of tagElems) {
            for (const tag of this.props.filter.tags) {
                if (tag === elem.id) elem.checked = true;
            }
        }

        const countryElems = hiddenTags[2].getElementsByTagName ("input");
        for (const elem of countryElems) {
            for (const country of this.props.filter.countries) {
                if (country === elem.id) elem.checked = true;
            }
        }
    }

    toggleFilter () {
        const filterBlock = document.getElementById ("filterBlock");
        const filterButtonText = document.getElementById ("filterButtonText");
        const filterButtonIcon = document.getElementById ("filterButtonIcon");

        if (filterBlock.style.display === "flex") {
            filterBlock.style.display = "none";
            filterButtonText.innerText = "Фильтр";
            filterButtonIcon.src = "https://images.freeimages.com/fic/images/icons/2232/wireframe_mono/48/filter.png";
        }
        else {
            filterBlock.style.display = "flex";
            filterButtonText.innerText = "Закрыть";
            filterButtonIcon.src = "https://images.freeimages.com/fic/images/icons/2232/wireframe_mono/48/delete.png";
        }
    }

    viewsFilter () {
        const elemButton = document.getElementById ("sortViewsButton");
        if (elemButton.innerText === "Неактивна") {
            elemButton.innerText = "Сначала популярные";
            document.getElementById ("sortTimeButton").innerText = "Неактивна";
        }
        else if (elemButton.innerText === "Сначала популярные") {
            elemButton.innerText = "Сначала непопулярные";
        }
        else {
            elemButton.innerText = "Сначала популярные";
        }
    }

    timeFilter () {
        const elemButton = document.getElementById ("sortTimeButton");
        if (elemButton.innerText === "Неактивна") {
            elemButton.innerText = "Сначала новые";
            document.getElementById ("sortViewsButton").innerText = "Неактивна";
        }
        else if (elemButton.innerText === "Сначала новые") {
            elemButton.innerText = "Сначала старые";
        }
        else {
            elemButton.innerText = "Сначала новые";
        }
    }

    applyFilters () {
        let filterURL = new URL (WEBSITEPATH + "/catalog");

        const elemTimeButton = document.getElementById ("sortTimeButton");
        if (elemTimeButton.innerText === "Сначала старые") filterURL.searchParams.append ("time", "down");
        else if (elemTimeButton.innerText === "Сначала новые") filterURL.searchParams.append ("time", "up");

        const elemViewsButton = document.getElementById ("sortViewsButton");
        if (elemViewsButton.innerText === "Сначала непопулярные") filterURL.searchParams.append ("views", "down");
        else if (elemViewsButton.innerText === "Сначала популярные")filterURL.searchParams.append ("views", "up");

        const hiddenTags = document.getElementsByClassName ("filter-select-options");
        
        const authorElems = hiddenTags[0].getElementsByTagName ("input");
        for (const elem of authorElems) {
            if (elem.checked === true && elem.id !== "All") {
                filterURL.searchParams.append ("author", elem.id);
                break;
            }
        }

        const tagElems = hiddenTags[1].getElementsByTagName ("input");
        for (const elem of tagElems) {
            if (elem.checked === true) {
                filterURL.searchParams.append ("tags", elem.id);
            }
        }

        const countryElems = hiddenTags[2].getElementsByTagName ("input");
        for (const elem of countryElems) {
            if (elem.checked === true) {
                filterURL.searchParams.append ("country", elem.id);
            }
        }

        window.location = filterURL;
    }

    render () {
        let fetchAuthors = [ { id: "All", realName: "Все" } ];
        let fetchTags = [];
        let fetchCountries = [];

        for (const article of this.props.filter.meta) {
            let flagIncludes = false;
            for (const author of fetchAuthors) {
                if (author.id === article.author) {
                    flagIncludes = true;
                    break;
                }
            }
            if (!flagIncludes) fetchAuthors.push ( { id: article.author, realName: article.realName } )
            
            fetchTags = fetchTags.concat (article.tags);
            fetchCountries = fetchCountries.concat (article.country);
        }

        let fetchSet = new Set (fetchTags);
        fetchTags = Array.from (fetchSet);
        fetchTags = fetchTags.sort();

        fetchSet = new Set (fetchCountries);
        fetchCountries = Array.from (fetchSet);
        fetchCountries = fetchCountries.sort();

        return (
            <div className="filter">
                <button className="filter-button" onClick={ () => { this.toggleFilter() } }>
                    <span className="filter-button-text" id="filterButtonText">Фильтр</span>
                    <img className="filter-button-icon" id="filterButtonIcon" src="https://images.freeimages.com/fic/images/icons/2232/wireframe_mono/48/filter.png" alt="Фильтр"></img>
                </button>
                <div className="filter-block" id="filterBlock">
                    <button className="filter-accept-button" onClick={ () => { this.applyFilters() } }>Применить</button>
                    <button className="filter-sort-button" onClick={ () => { this.timeFilter() } } id="sortTimeButton">Сначала новые</button>
                    <button className="filter-sort-button" onClick={() => { this.viewsFilter() } } id="sortViewsButton">Неактивна</button>
                    <div className="filter-select">
                        <div className="filter-select-label">Выберите автора</div>
                        <RadioAuthorsList authors={fetchAuthors} />
                    </div>
                    <div className="filter-select">
                        <div className="filter-select-label">Выберите теги</div>
                        <CheckboxTagsList tags={fetchTags }/>
                    </div>
                    <div className="filter-select">
                        <div className="filter-select-label">Выберите страны</div>
                        <CheckboxCountriesList countries={fetchCountries} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Filter;