import React from 'react';
import './App.css';
import {MyLink, QueryData} from "./MyLink";


const App: React.FC = () => {
  const data : QueryData = {
    baseUrl: 'https://hamburgwhl.infomaxnet.de/whl-kalender/',
    commonPrefix: '?form=search&widgetToken=YDV9T5VKk9s.&searchType=filter',
    dateFrom: '2019-06-22',
    dateTo: '2019-06-22',
    timeFrom: 18,
    locationId: 24,
    location: 'Hamburg',
    distance: 25,
    categoryIds: []
  };
  return (
    <div className="App">
      <MyLink data={data} />
    </div>
  );
}

export default App;
