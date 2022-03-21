import React, {Component, CSSProperties, FormEvent} from "react";
import Form from "react-bootstrap/Form";
import {categoryMap} from "./model/CategoryMap";
import FontAwesome from "react-fontawesome";
import "@fortawesome/fontawesome-free/css/all.css";

export class CategorySelect extends Component<any> {

    private formRef = React.createRef<HTMLFormElement>();

    state = {categoryIds: this.props.categoryIds};

    _renderCategory(entry: any) {
        const {categoryIds} = this.state;
        const resetCss : CSSProperties = {paddingLeft: 0, marginBottom: 3};
        const marginBottom : CSSProperties = {marginBottom: 0};
        return <Form.Check  type="checkbox" key={entry.id} className="form-group" style={resetCss}>
            <Form.Check.Input
                id={`name${entry.id}`}
                name={`name${entry.id}`}
                type="checkbox"
                defaultChecked={categoryIds.filter((id: string) => id === entry.code.toString()).length !== 0}
                value={entry.code}
                autoComplete={'off'}
            />
            <div className="btn-group">
                <label htmlFor={`name${entry.id}`} className="btn btn-secondary border" style={marginBottom}>
                    <span className="check-positive"><FontAwesome name='check'/></span>
                    <span className="check-negative"></span>
                </label>
                <label htmlFor={`name${entry.id}`} className="btn btn-outline- border" style={marginBottom}>
                    {entry.categorytext.toLocaleLowerCase()}
                </label>
            </div>
            {/*<Form.Check.Label htmlFor={entry.id} className="form-control">{entry.categorytext.toLocaleLowerCase()}</Form.Check.Label>*/}
        </Form.Check>
    }

    private handleChange = (e: FormEvent) => {
        let current = this.formRef.current;
        if (!current) {
            return
        }
        let tempState = this.state.categoryIds;
        const row = e.target as HTMLFormElement;
        if (row.checked && !this.state.categoryIds.includes(row.value)) {
            tempState = this.state.categoryIds.concat(row.value);
            this.setState({categoryIds: tempState});
        }
        if (!row.checked && this.state.categoryIds.includes(row.value)) {
            tempState = this.state.categoryIds.filter((x:Number) => row.value !== x);
            this.setState({categoryIds: tempState});
        }
        this.props.handleSubmit(tempState);
    };

    render() {
        return <div className={'col-12'}>
            <h3>Kategorienauswahl</h3>
            <form ref={this.formRef} onChange={this.handleChange} onSubmit={this.handleSubmit}>
                {categoryMap.map(c => this._renderCategory(c))}
            </form>
            {/*<div>Ausgewählte Category Ids: {this.state.categoryIds.join(", ")}</div>*/}
        </div>
    }

    private handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const elements = (e.target as HTMLFormElement).elements;
        const indexArray = [...Array.from(elements)].filter((e: any) => e.checked).map(e => (e as any).value);
        this.setState({categoryIds: indexArray});
        this.props.handleSubmit(indexArray);
    }
}