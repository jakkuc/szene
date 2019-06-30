import React, {Component, FormEvent} from "react";
import {InputGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {categoryMap} from "./model/CategoryMap";

export class CategorySelect extends Component<any> {

    private formRef = React.createRef<HTMLFormElement>();

    state = {categoryIds: this.props.categoryIds};

    _renderCategory(entry: any) {
        const {categoryIds} = this.state;
        return <InputGroup key={entry.id}>
            <InputGroup.Prepend>
                <InputGroup.Checkbox
                    defaultChecked={categoryIds.filter((id: any) => id === entry.code.toString()).length !== 0}
                    aria-label="Checkbox for following text input"
                    value={entry.code}
                />
            </InputGroup.Prepend>
            <Form.Control
                readOnly
                id={entry.id}
                value={entry.categorytext.toLocaleLowerCase()}/>
        </InputGroup>
    }

    private handleChange = (e: FormEvent) => {
        let current = this.formRef.current;
        if (!current) {
            return
        }
        current.dispatchEvent(new Event("submit"));
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
        let elements = e.target as HTMLFormElement;
        const indexArray = [...Array.from(elements)].filter((e: any) => e.checked).map(e => (e as any).value);
        this.setState({categoryIds: indexArray})
        this.props.handleSubmit(indexArray);
    }
}