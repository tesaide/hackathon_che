import React from 'react';
import { Collapse } from 'antd';

const Spliiter = ({ placesTable, placesMap }) => {
  const items = [
    {
      key: '1',
      label: 'Таблиця локацій',
      children: (
        <div style={{ padding: '10px' }}>
          {placesTable}
        </div>
      ),
    },
    {
      key: '2',
      label: 'Карта локацій',
      children: (
        <div style={{ padding: '10px' }}>
          {placesMap}
        </div>
      ),
    },
  ];



  return (
    <Collapse items={items} defaultActiveKey={['1']}/>
  );
};

export default Spliiter;
