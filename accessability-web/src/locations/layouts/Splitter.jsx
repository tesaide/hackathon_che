import React from 'react';
import { Collapse } from 'antd';

function Spliiter({ locationTable, locationMap }) {
  const items = [
    {
      key: '1',
      label: 'Таблиця локацій',
      children: (
        <div style={{ padding: '10px' }}>
          {locationTable}
        </div>
      ),
    },
    {
      key: '2',
      label: 'Карта локацій',
      children: (
        <div style={{ padding: '10px' }}>
          {locationMap}
        </div>
      ),
    },
  ];

  return (
    <Collapse items={items} defaultActiveKey={['1']} />
  );
}

export default Spliiter;
