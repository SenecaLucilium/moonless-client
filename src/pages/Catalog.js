import { Component } from 'react';

import Filter from "../components/Filter";
import CatalogList from "../components/CatalogList";

import { APIPATH } from "../components/Variable";

class Catalog extends Component {
    constructor (props) {
        super (props)

        this.state = {
            meta: null,
            time: null,
            views: null,
            author: null,
            tags: null,
            countries: null
        }
    }

    fetchFilter (meta) {
        const parsedUrl = new URL (window.location.href);
        let filterState = {
            meta: meta,
            time: null,
            views: null,
            author: null,
            tags: [],
            countries: []
        }

        if (parsedUrl.searchParams.get ("time") !== null) {
            filterState.time = parsedUrl.searchParams.get ("time");
        }
        if (parsedUrl.searchParams.get ("views") !== null) {
            filterState.views = parsedUrl.searchParams.get ("views");
        }
        if (parsedUrl.searchParams.get ("author") !== null || parsedUrl.searchParams.get ("author") !== "Все") {
            filterState.author = parsedUrl.searchParams.get ("author");
        }
        if (parsedUrl.searchParams.getAll ("tags") !== null) {
            filterState.tags = parsedUrl.searchParams.getAll ("tags");
        }
        if (parsedUrl.searchParams.getAll ("country") !== null) {
            filterState.countries = parsedUrl.searchParams.getAll ("country");
        }

        return filterState;
    }

    componentDidMount () {
        try{
            fetch (APIPATH + "/catalog").then (response => response.json()).then ( (data) => {
                this.setState (this.fetchFilter (data));
            })
        }
        catch (e) {
            console.log ("Error at fetching catalogpath: " + e);
        }
    }

    filterMeta () {
        let resultMeta = [];

        let authorsMeta = [];
        for (const article of this.state.meta) {
            if (this.state.author === null || this.state.author === article.author) {
                authorsMeta.push (article);
            }
        }
        
        let afterTagsMeta = [];
        if (this.state.tags.length === 0) {
            afterTagsMeta = authorsMeta;
        }
        else {
            let tagsMeta = [];
            for (const tag of this.state.tags) {
                for (const article of authorsMeta) {
                    if (article.tags.includes (tag)) tagsMeta.push (article);
                }

                afterTagsMeta = afterTagsMeta.concat (tagsMeta);
                tagsMeta = [];
            }
        }

        if (this.state.countries.length === 0) {
            resultMeta = afterTagsMeta;
        }
        else {
            let countriesMeta = [];
            for (const country of this.state.countries) {
                for (const article of afterTagsMeta) {
                    if (article.country.includes (country)) countriesMeta.push (article);
                }

                resultMeta = resultMeta.concat (countriesMeta);
                countriesMeta = [];
            }
        }

        let resultSet = new Set (resultMeta);
        resultMeta = Array.from (resultSet);

        if (this.state.time !== null || this.state.views === null) {
            resultMeta.sort ( (a, b) => {
                let a1 = a.date.split(".");
                let b1 = b.date.split(".");
                return new Date (+b1[2], b1[1] - 1, +b1[0]) - new Date (+a1[2], a1[1] - 1, +a1[0]);
            })

            if (this.state.time === "down") {
                resultMeta = resultMeta.reverse();
            }
        }
        else {
            resultMeta.sort ( (a, b) => {
                return b.views - a.views;
            })

            if (this.state.views === 'down') {
                resultMeta = resultMeta.reverse();
            }
        }

        return resultMeta;
    }

    render () {
        if (this.state.meta === null) return null;

        const resultMeta = this.filterMeta ();
        document.title = "Каталог";
        return (
            <div className="Catalog">
                <Filter filter={this.state}/>
                <CatalogList meta={resultMeta} />
            </div>
        )
    }
}

export default Catalog;