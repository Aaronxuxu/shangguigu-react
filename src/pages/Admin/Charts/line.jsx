//  线形路由
import React, { useEffect } from "react";
import { Card, Button } from "antd";
import ReactECharts from "echarts-for-react";
import "echarts/i18n/langFR";

const UpdateTitle = () => {
  return <Button type="primary">更新</Button>;
};
const Line = () => {
  const option = {
    title: {
      text: "ECharts 入门示例",
    },
    toolbox: {
      feature: {
        saveAsImage: {},
        dataZoom: {},
        restore: {},
      },
    },
    tooltip: {},
    legend: {
      data: ["销量"],
    },
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "line",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  };
  useEffect(() => {
    console.log();
  }, []);
  return (
    <Card title={<UpdateTitle />}>
      <Card title="柱状图一">
        <ReactECharts
          option={option}
          style={{ height: 400 }}
          opts={{ locale: "FR" }}
        />
        ;
      </Card>
    </Card>
  );
};
export default Line;
