import React, {Component} from 'react';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import {getDateString} from "./App";
import {CategorySelect} from "./CategorySelect";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import {MyDropdown} from "./MyDropdown";
import Dropdown from "react-bootstrap/Dropdown";

export interface QueryData {
    timeFrom: number;
    baseUrl: string;
    categoryIds: string[];
    commonPrefix: string;
    distance: number;
    locationId: number;
    dateTo?: Date;
    location: string;
    dateFrom?: Date;
}

function getCodeByText(ids: string[]) {
    if (ids.length === 0) {
        return '';
    }
    return '&' + ids.map(c => 'categoryIds%5B%5D=' + c).join('&');
}

interface MainPageProps {
    data: QueryData,
    useCookies: boolean
}

interface MainPageState {
    dateFrom: Date,
    dateTo: Date,
    categoryIds: string[],
    timeFrom: number,
    distance: number
}

const cookieName = 'szeneFilter';

export class MainPage extends Component<MainPageProps, MainPageState> {

    state: MainPageState = {
        categoryIds: this.parseArray(Cookies.get(cookieName)) || this.props.data.categoryIds,
        dateFrom: this.props.data.dateFrom || new Date(),
        dateTo: this.props.data.dateTo || new Date(),
        timeFrom: this.props.data.timeFrom || 0,
        distance: this.props.data.distance || 10
    };

    private clearCookie() {
        Cookies.remove(cookieName);
    }

    parseArray(array: string | undefined) {
        if (!this.props.useCookies) {
            return undefined;
        }
        if (array) {
            return array.split(",");
        }
        return undefined;
    }

    handleSubmit(ids: string[]) {
        if (this.props.useCookies) {
            Cookies.set(cookieName, ids.join(","), {expires: 2000});
        }
        this.setState({categoryIds: ids});
    }

    helper(key: (keyof QueryData), data: QueryData) {
        let value;
        switch (key) {
            case "dateFrom":
                value = getDateString(this.state.dateFrom);
                break;
            case "dateTo":
                value = getDateString(this.state.dateTo);
                break;
            case "timeFrom":
                value = this.state.timeFrom;
                break;
            case "distance":
                value = this.state.distance;
                break;
            default:
                value = data[key];
        }
        return `&${key}=${value}`;
    }

    convert(data: QueryData) {

        const allKeys: Set<(keyof QueryData)> = new Set(Object.keys(data) as (keyof QueryData)[]);
        const processKeys: Set<(keyof QueryData)> = new Set(['timeFrom', 'distance', 'locationId', 'location', 'dateFrom', 'dateTo'] as (keyof QueryData)[]);
        const justCopyKeys: Set<(keyof QueryData)> = new Set([...Array.from(allKeys)].filter(x => !processKeys.has(x)));

        let qdata: any = {};
        processKeys.forEach(k => qdata[k] = this.helper(k, data));
        justCopyKeys.forEach(k => qdata[k] = data[k]);

        return qdata;
    }

    render() {
        const {
            timeFrom,
            baseUrl,
            // categoryIds,
            commonPrefix,
            distance,
            locationId,
            dateTo,
            location,
            dateFrom
        } = this.convert(this.props.data);
        const url = baseUrl + commonPrefix + dateFrom + dateTo + timeFrom + locationId + location + distance + getCodeByText(this.state.categoryIds);
        return <div>
            <CategorySelect categoryIds={this.state.categoryIds} handleSubmit={this.handleSubmit.bind(this)}/>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={"col-sm-6 col-12 align-self-start text-md-left mt-3 mb-3"}>
                        <h3>Startdatum</h3>
                        <DatePicker
                            selected={this.state.dateFrom}
                            onChange={this.dateFromChange.bind(this)}
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>
                    <div className={"col-sm-6 col-12 align-self-end text-md-right mt-3 mb-3"}>
                        <h3>Enddatum</h3>
                        <DatePicker
                            selected={this.state.dateTo}
                            onChange={this.dateToChange.bind(this)}
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>
                </div>
                <div className={'container'}>
                    <div className={'row justify-content-center'}>
                        <MyDropdown onSelect={(eventKey: any) => {
                            this.setState({timeFrom: eventKey})
                        }} caption={`Ab ${this.state.timeFrom} Uhr?`} options={[0, 10, 14, 18, 20, 22]}/>
                        <MyDropdown onSelect={(eventKey: any) => {
                            this.setState({distance: eventKey})
                        }} caption={`${this.state.distance} km weit weg?`}
                                    options={[1, 5, 10, 15, 20, 25, 30, 40, 50]}/>
                    </div>
                </div>
            </div>
            <div className={'text-center m-4'}>
                <a className={'btn btn-primary'} href={url} target="_blank">Zu Hamburg Tourismus</a>
            </div>
            {this._renderClearCookie()}
        </div>
    }

    private _renderClearCookie() {
        if (this.props.useCookies) {
            return null;
        }
        return <div className={'text-right'}>
            <Button className={'btn-secondary'} onClick={this.clearCookie.bind(this)}>Clear Cookie</Button>
        </div>
    }

    private dateFromChange(dateFrom: Date) {
        this.setState({dateFrom});
    }

    private dateToChange(dateTo: Date) {
        this.setState({dateTo})
    }
}

