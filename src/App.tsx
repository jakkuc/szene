import React from 'react';
import './App.css';
import {MainPage, QueryData} from "./MainPage";

export function getDateString(date? : Date) {
  const today = date ? date : new Date();
  const year = today.getFullYear().toString();
  const month = (today.getMonth() +1).toString();
  const day = today.getDate().toString();
  return `${year}-${to2digitString(month)}-${to2digitString(day)}`;
}

function to2digitString(number : string) {
  return number.length === 2 ? number : `0${number}`;
}

const App: React.FC = () => {
  const data : QueryData = {
    baseUrl: 'https://hamburgwhl.infomaxnet.de/whl-kalender/',
    commonPrefix: '?form=search&widgetToken=YDV9T5VKk9s.&searchType=filter',
    // dateFrom: undefined,
    // dateTo: undefined,
    timeFrom: 18,
    locationId: 24,
    location: 'Hamburg',
    distance: 25,
    categoryIds: [8, 54, 82, 120, 40, 47, 51]
  };
  return (
    <div className="App">
      <MainPage data={data} />
    </div>
  );
};

export default App;
