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
        <div class="tag-options">
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
        <div class="tag-options">
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
        <div class="tag-options">
            {radioList}
        </div>
    )
}

class Filter extends Component {
    constructor (props) {
        super (props);
    }

    componentDidMount () {
        if (this.props.filter.sort === "down") {
            this.sortButton ();
        }

        const hiddenTags = document.getElementsByClassName ("select-tag");

        hiddenTags[0].style.display = 'inline-block';
        const tagElems = hiddenTags[0].getElementsByTagName ("input");

        for (const elem of tagElems) {
            for (const tag of this.props.filter.tags) {
                if (tag === elem.id) elem.checked = true;
            }
        }

        hiddenTags[1].style.display = 'inline-blocks';
        const countryElems = hiddenTags[1].getElementsByTagName ("input");

        for (const elem of countryElems) {
            for (const country of this.props.filter.countries) {
                if (country === elem.id) elem.checked = true;
            }
        }

        hiddenTags[2].style.display = 'inline-blocks';
        const authorElems = hiddenTags[2].getElementsByTagName ("input");

        for (const elem of authorElems) {
            if (this.props.filter.author == elem.id) elem.checked = true;
        }
    }

    sortButton () {
        console.log ('nah');
        const elemButton = document.getElementById ("sortButton");
        if (elemButton.innerText === "Сначала новые") {
            console.log ("that")
            elemButton.innerText = "Сначала старые";
        }
        else {
            console.log ("this")
            elemButton.innerText = "Сначала новые";
        }
    }

    applyFilters () {
        let filterURL = new URL (WEBSITEPATH + "/catalog");

        const elemButton = document.getElementById ("sortButton");
        if (elemButton.innerText === "Сначала старые") filterURL.searchParams.append ("sort", "down");
        else filterURL.searchParams.append ("sort", "up");

        const hiddenTags = document.getElementsByClassName ("select-tag");

        hiddenTags[0].style.display = 'inline-blocks';
        const tagElems = hiddenTags[0].getElementsByTagName ("input");

        for (const elem of tagElems) {
            if (elem.checked === true) {
                filterURL.searchParams.append ("tags", elem.id);
            }
        }

        hiddenTags[1].style.display = 'inline-blocks';
        const countryElems = hiddenTags[1].getElementsByTagName ("input");

        for (const elem of countryElems) {
            if (elem.checked === true) {
                filterURL.searchParams.append ("countries", elem.id);
            }
        }

        hiddenTags[2].style.display = 'inline-blocks';
        const authorElems = hiddenTags[2].getElementsByTagName ("input");

        for (const elem of authorElems) {
            if (elem.checked === true && elem.id !== "All") {
                filterURL.searchParams.append ("author", elem.id);
                break;
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
            <div class="filter">
                <div class="filter-section">
                    <label>Порядок сортировки:</label>
                    <button class="filter-button" onClick={ () => { this.sortButton() } } id="sortButton">Сначала новые</button>
                </div>

                <div class="filter-section">
                    <label for="tag-select">Теги:</label>
                    <div class="select-tag">
                        <div class="selected-tags">Выберите теги</div>
                        <CheckboxTagsList tags={fetchTags} />
                    </div>
                </div>

                <div class="filter-section">
                    <label for="tag-select">Страны:</label>
                    <div class="select-tag">
                        <div class="selected-tags">Выберите страны</div>
                        <CheckboxCountriesList countries={fetchCountries} />
                    </div>
                </div>


                <div class="filter-section">
                    <label for="tag-select">Автор:</label>
                    <div class="select-tag">
                        <div class="selected-tags">Выберите автора</div>
                        <RadioAuthorsList authors={fetchAuthors} />
                    </div>
                </div>
                <button class="apply-button" onClick={ () => { this.applyFilters() } } type="button" id="applyButton">Применить фильтры</button>

                <div class="filter-section">
                    <div class="filter-container">
                        <label>Количество статей: {this.props.filter.meta.length}</label>
                        <label>Количество авторов: {fetchAuthors.length - 1}</label>
                        <label>Количество тегов: {fetchTags.length}</label>
                    </div>
                </div>
            </div>
        )
    }
}

export default Filter;