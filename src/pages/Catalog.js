import Filter from "../components/Filter"
import CatalogList from "../components/CatalogList"
import { Component } from 'react'

import "../styles/catalog.css"

class Catalog extends Component {
    constructor (props) {
        super (props)

        this.state = {
            meta: null,
            sort: "up",
            author: null,
            tags: null
        }
    }

    fetchFilter (meta) {
        const parsedUrl = new URL (window.location.href);
        let filterState = {
            meta: meta,
            sort: "up",
            author: null,
            tags: []
        }

        if (parsedUrl.searchParams.get ("sort") != null) {
            filterState.sort = parsedUrl.searchParams.get ("sort");
        }
        if (parsedUrl.searchParams.get ("author") != null || parsedUrl.searchParams.get ("author") != "Все") {
            filterState.author = parsedUrl.searchParams.get ("author");
        }
        if (parsedUrl.searchParams.getAll ("tags") != null) {
            filterState.tags = parsedUrl.searchParams.getAll ("tags");
        }

        return filterState;
    }

    componentDidMount () {
        try{
            fetch ("/catalog").then (response => response.json()).then ( (data) => {
                this.setState (this.fetchFilter (data));
            })
        }
        catch (e) {
            console.log ("Error at displaying a catalog page: " + e);
        }
    }

    filterMeta () {
        let resultMeta = [];

        let authorsMeta = [];
        for (const article of this.state.meta) {
            if (this.state.author == null || this.state.author == article.author) {
                authorsMeta.push (article);
            }
        }

        if (this.state.tags.length == 0) {
            resultMeta = authorsMeta;
        }
        else {
            let tagsMeta = [];
            for (const tag of this.state.tags) {
                for (const article of authorsMeta) {
                    if (article.tags.includes (tag)) tagsMeta.push (article);
                }

                resultMeta = resultMeta.concat (tagsMeta);
                tagsMeta = [];
            }
        }

        let resultSet = new Set (resultMeta);
        resultMeta = Array.from (resultSet);

        resultMeta.sort ( (a, b) => {
            let a1 = a.date.split(".");
            let b1 = b.date.split(".");
            return new Date (+b1[2], b1[1] - 1, +b1[0]) - new Date (+a1[2], a1[1] - 1, +a1[0]);
        })

        if (this.state.sort == "down") {
            resultMeta = resultMeta.reverse();
        }

        return resultMeta;
    }

    render () {
        if (this.state.meta === null) return null;

        const resultMeta = this.filterMeta ();

        console.log (resultMeta);

        return (
            <div className="Catalog">
                <Filter meta={this.state.meta} />
                <CatalogList meta={resultMeta} />
            </div>
        )
    }
}

export default Catalog;