import React from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Legend, Guide } from 'bizcharts';
import DataSet from '@antv/data-set';

export default function DonutChart() {
  const { DataView } = DataSet;
  const { Html } = Guide;

  // MOCK 数据，实际业务按需进行替换
  const data = [
    {
      item: '当日计算费用',
      count: 40,
    },
    {
      item: '当日存储费用',
      count: 21,
    },
  ];
  const dv = new DataView();
  dv.source(data).transform({
    type: 'percent',
    field: 'count',
    dimension: 'item',
    as: 'percent',
  });
  const cols = {
    percent: {
      formatter: (val) => {
        val = `${val * 100}%`;
        return val;
      },
    },
  };
  return (
    <div>
      <Chart height={240} data={dv} scale={cols} padding={[10]} forceFit>
        <Coord type="theta" radius={0.8} innerRadius={0.7} />
        <Axis name="percent" />
        <Legend position="bottom" />
        <Tooltip
          showTitle={false}
          itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
        />
        <Guide>
          <Html
            position={['50%', '50%']}
            html="<div style=&quot;color:#8c8c8c;font-size:14px;text-align: center;width: 10em;&quot;>总费用(万元)<br><span style=&quot;color:#262626;font-size:24px&quot;>691.34</span></div>"
            alignX="middle"
            alignY="middle"
          />
        </Guide>
        <Geom
          type="intervalStack"
          position="percent"
          color="item"
          tooltip={[
            'item*percent',
            (item, percent) => {
              percent = `${percent * 100}%`;
              return {
                name: item,
                value: percent,
              };
            },
          ]}
          style={{
            lineWidth: 1,
            stroke: '#fff',
          }}
        />
      </Chart>
    </div>
  );
}
