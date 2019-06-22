import React, {Component, FormEvent} from 'react';

export interface QueryData {
    timeFrom: number;
    baseUrl: string;
    categoryIds: number[];
    commonPrefix: string;
    distance: number;
    locationId: number;
    dateTo: string;
    location: string;
    dateFrom: string
};

//[].slice.call(document.getElementsByName('categoryIds[]')).map((f,i) => {return "{ id:"+i + ", categorytext: '"+ f.labels[0].innerText.replace(/\n/,'').replace(/\[.*\]/,'')+"' , code : '"+ f.value +"'},";}).join('\n');
const categoryMap = [
    {id: 0, categorytext: 'AUSSTELLUNGEN', code: '115'},
    {id: 1, categorytext: 'FÜHRUNGEN', code: '116'},
    {id: 2, categorytext: 'WEITERE AUSSTELLUNGEN', code: '117'},
    {id: 3, categorytext: 'BALLETT & TANZ', code: '4'},
    {id: 4, categorytext: 'COMEDY', code: '10'},
    {id: 5, categorytext: 'KABARETT', code: '103'},
    {id: 6, categorytext: 'LESUNGEN', code: '8'},
    {id: 7, categorytext: 'OPER & OPERETTE', code: '6'},
    {id: 8, categorytext: 'THEATER', code: '3'},
    {id: 9, categorytext: 'WEITERE BÜHNENKUNST', code: '9'},
    {id: 10, categorytext: 'Essen & Trinken (manuell)', code: '122'},
    {id: 11, categorytext: 'Weiteres Familien & Kinder', code: '86'},
    {id: 12, categorytext: 'Feste', code: '107'},
    {id: 13, categorytext: 'Festivals', code: '13'},
    {id: 14, categorytext: 'Film Kino Tv (manuell)', code: '18'},
    {id: 15, categorytext: 'Kongresse, Konferenzen und Tagungen (manuell)', code: '54'},
    {id: 16, categorytext: 'Country & Folk', code: '94'},
    {id: 17, categorytext: 'Elektro', code: '21'},
    {id: 18, categorytext: 'Gospel & Chöre', code: '105'},
    {id: 19, categorytext: 'HipHop, RnB, Soul & Funk', code: '20'},
    {id: 20, categorytext: 'Indie & Alternative', code: '93'},
    {id: 21, categorytext: 'Jazz, Blues, Swing & Chanson', code: '22'},
    {id: 22, categorytext: 'Klassik', code: '82'},
    {id: 23, categorytext: 'Pop', code: '55'},
    {id: 24, categorytext: 'Punkrock, Metal & Hardcore', code: '106'},
    {id: 25, categorytext: 'Rock', code: '23'},
    {id: 26, categorytext: 'Singer/Songwriter', code: '120'},
    {id: 27, categorytext: 'Weltmusik', code: '98'},
    {id: 28, categorytext: 'Weitere Konzerte', code: '25'},
    {id: 29, categorytext: 'Musicals', code: '29'},
    {id: 30, categorytext: 'Shows & Varieté', code: '30'},
    {id: 31, categorytext: 'Zirkus', code: '31'},
    {id: 32, categorytext: 'Weitere Musicals & Shows', code: '32'},
    {id: 33, categorytext: 'Party (manuell)', code: '33'},
    {id: 34, categorytext: 'Religion & Spiritualität (manuell)', code: '40'},
    {id: 35, categorytext: 'Ausflugsfahrten', code: '43'},
    {id: 36, categorytext: 'Bootstouren', code: '45'},
    {id: 37, categorytext: 'Hafenrundfahrten', code: '44'},
    {id: 38, categorytext: 'Stadtrundgänge & Führungen', code: '49'},
    {id: 39, categorytext: 'Weitere Rundgänge & Fahrten', code: '46'},
    {id: 40, categorytext: 'Seminare, Kurse & Workshops (manuell)', code: '47'},
    {id: 41, categorytext: 'Radtouren', code: '36'},
    {id: 42, categorytext: 'Vorträge und Diskussionsrunden (manuell)', code: '51'}
];

function getCodeByText(ids: string[]) {
    if (ids.length === 0) {
        return '';
    }
    return '&' + ids.map(c => 'categoryIds%5B%5D=' + c).join('&');
}

function convert(data: QueryData) {

    function helper(key: (keyof QueryData)) {
        const value = data[key];
        return `&${key}=${value}`;
    }

    const allKeys: Set<(keyof QueryData)> = new Set(Object.keys(data) as (keyof QueryData)[]);
    const processKeys: Set<(keyof QueryData)> = new Set(['timeFrom', 'distance', 'locationId', 'dateTo', 'location', 'dateFrom'] as (keyof QueryData)[]);
    const justCopyKeys: Set<(keyof QueryData)> = new Set([...Array.from(allKeys)].filter(x => !processKeys.has(x)));

    let qdata: any = {};
    processKeys.forEach(k => qdata[k] = helper(k));
    justCopyKeys.forEach(k => qdata[k] = data[k]);

    return qdata;
}

export class MyLink extends Component<any> {

    state = {
        categoryIds: this.props.data.categoryIds.map((x: any) => x.toString())
    };

    handleSubmit(ids: string[]) {
        console.log(ids)
        this.setState({categoryIds: ids});
    }

    render() {
        console.log("render");
        const {
            timeFrom,
            baseUrl,
            categoryIds,
            commonPrefix,
            distance,
            locationId,
            dateTo,
            location,
            dateFrom
        } = convert(this.props.data);
        const url = baseUrl + commonPrefix + dateFrom + dateTo + timeFrom + locationId + location + distance + getCodeByText(this.state.categoryIds);
        console.log(url)
        return <div>
            <CategorySelect categoryIds={this.state.categoryIds} handleSubmit={this.handleSubmit.bind(this)}/>
            <a href={url} target="_blank">{url}</a>
        </div>
    }
}

export class CategorySelect extends Component<any> {

    private formRef = React.createRef<HTMLFormElement>();

    state = {categoryIds: this.props.categoryIds}

    _renderCategory(entry: any) {
        const {categoryIds} = this.state;
        return <div key={entry.id}>
            <input type="checkbox"
                   id={entry.id}
                   defaultChecked={categoryIds.filter((id: any) => id === entry.id.toString()).length !== 0}
                   value={entry.code}/>
            <label htmlFor={entry.id}>{entry.categorytext}</label>
        </div>
    }

    private handleChange = (e: FormEvent) => {
        let current = this.formRef.current;
        if (!current) {
            return
        }
        current.dispatchEvent(new Event("submit"));
    }

    render() {
        return <div>
            <form ref={this.formRef} onChange={this.handleChange} onSubmit={this.handleSubmit}>
                {categoryMap.map(c => this._renderCategory(c))}
            </form>
        </div>
    }

    private handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let elements = e.target as HTMLFormElement;
        const indexArray = [...Array.from(elements)].filter((e: any) => e.checked).map(e => (e as any).value);
        this.setState({categoryIds: indexArray})
        this.props.handleSubmit(indexArray);
    }
}