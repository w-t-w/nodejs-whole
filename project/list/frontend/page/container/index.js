import {useState} from 'react';

import {List} from '../../../component/build/component_index';

function App() {
    const [renderData, setRenderData] = useState(window.renderData);
    const [sort, setSort] = useState(window.renderSort);
    const [filter, setFilter] = useState(window.renderFilter);

    return <List
        columns={renderData.columns}
        sort={sortType => {
            fetch(`./data?sort=${sortType}&filter=${filter}`)
                .then(res => res.json())
                .then(json => {
                    setSort(sortType);
                    setRenderData(json);
                });
        }}
        filter={filterType => {
            fetch(`./data?sort=${sort}&filter=${filterType}`)
                .then(res => res.json())
                .then(json => {
                    setFilter(filterType);
                    setRenderData(json);
                });
        }}
    />
}

export default App;