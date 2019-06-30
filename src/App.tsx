import React from 'react';
import './App.css';
import {MainPage, QueryData} from "./MainPage";
import CookieConsent from "react-cookie-consent";

export function getDateString(date?: Date) {
    const today = date ? date : new Date();
    const year = today.getFullYear().toString();
    const month = (today.getMonth() + 1).toString();
    const day = today.getDate().toString();
    return `${year}-${to2digitString(month)}-${to2digitString(day)}`;
}

function to2digitString(number: string) {
    return number.length === 2 ? number : `0${number}`;
}

interface AppProps {
    categoryIds?: string[],
    useCookies: boolean
}


const App: React.FC<AppProps> = ({categoryIds, useCookies}) => {
    const data: QueryData = {
        baseUrl: 'https://hamburgwhl.infomaxnet.de/whl-kalender/',
        commonPrefix: '?form=search&widgetToken=YDV9T5VKk9s.&searchType=filter',
        // dateFrom: undefined,
        // dateTo: undefined,
        timeFrom: 0,
        locationId: 24,
        location: 'Hamburg',
        distance: 25,
        categoryIds: categoryIds || []
    };
    let _renderCookieConsent = <CookieConsent
        location="top"
        buttonText="Ok"
        cookieName="cookieConsent"
        // style={{ background: "#2B373B" }}
        buttonStyle={{backgroundColor: "#007bff", fontSize: "13px"}}
        expires={150}
    >
        This website uses cookies to memorize the filter settings.
    </CookieConsent>;
    return (
        <div className="App">
            {useCookies ? _renderCookieConsent : null}
            <MainPage data={data} useCookies={useCookies}/>
        </div>
    );
};

export default App;
