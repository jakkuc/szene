import React, {Component} from 'react';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import {getDateString} from "./App";
import {CategorySelect} from "./CategorySelect";

export interface QueryData {
    timeFrom: number;
    baseUrl: string;
    categoryIds: number[];
    commonPrefix: string;
    distance: number;
    locationId: number;
    dateTo?: string;
    location: string;
    dateFrom?: string;
}

function getCodeByText(ids: string[]) {
    if (ids.length === 0) {
        return '';
    }
    return '&' + ids.map(c => 'categoryIds%5B%5D=' + c).join('&');
}

export class MainPage extends Component<any> {

    state = {
        categoryIds: this.props.data.categoryIds.map((x: any) => x.toString()),
        dateFrom: this.props.data.dateFrom || new Date(),
        dateTo: this.props.data.dateTo || new Date()
    };

    handleSubmit(ids: string[]) {
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
            <div className={'container mt-3 mb-3'}>
            <div className={'row'}>
                <div className={"col-sm-6 col-12 align-self-start text-md-left"}>
                    <h3>Startdatum</h3>
                    <DatePicker
                        selected={this.state.dateFrom}
                        onChange={this.dateFromChange.bind(this)}
                        dateFormat="yyyy-MM-dd"
                    />
                </div>
                <div className={"col-sm-6 col-12 align-self-end text-md-right"}>
                    <h3>Enddatum</h3>
                    <DatePicker
                        selected={this.state.dateTo}
                        onChange={this.dateToChange.bind(this)}
                        dateFormat="yyyy-MM-dd"
                    />
                </div>
            </div>
            </div>
            <div className={'text-center m-4'}>
                <a className={'btn btn-primary'} href={url} target="_blank">Zur Szene Hamburg</a>
            </div>
        </div>
    }

    private dateFromChange(dateFrom: Date) {
        this.setState({dateFrom});
    }

    private dateToChange(dateTo: Date) {
        this.setState({dateTo})
    }
}

