import Dropdown from "react-bootstrap/Dropdown";
import React from "react";

export function MyDropdown(props: { onSelect: (eventKey: any) => void, caption: string, options: number[] }) {
    return <div className={'m-2'}>
        <Dropdown onSelect={props.onSelect}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {props.caption}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {props.options.map(o => <Dropdown.Item key={o} eventKey={o}>{'' + o}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown></div>
}