import * as d3 from "d3";
import React, { useRef, useEffect } from "react";
import { ChartProps } from "../shared/Type";

const xOffset = 55;
const yOffset = 10;

const BarChart = ({ chartData, chartHeader, height, width }: ChartProps) => {
	const d3Container = useRef(null);

	/* The useEffect Hook is for running side effects outside of React,
       for instance inserting elements into the DOM using D3 */
	useEffect(() => {
		if (chartData !== undefined && d3Container.current) {
			const svg = d3.select(d3Container.current);

			// Bind D3 data
			const update = svg
				.append("g")
				.attr("transform", `translate(${xOffset}, ${yOffset})`);

			const xScale = d3.scaleBand().range([0, width - (xOffset + 10)]);
			const yScale = d3.scaleLinear().range([height - 40, 0]);
			const total = chartData.map((item: any) => parseInt(item[9]));
			xScale.domain(chartData.map((item: any) => item[0]));
			yScale.domain([Math.min(...total), Math.max(...total)]);

			update
				.append("g")
				.attr("transform", `translate(0,${height - 40})`)
				.call(d3.axisBottom(xScale));

			update
				.append("g")
				.call(
					d3
						.axisLeft(yScale)
						.tickFormat((yAxisValue: any) => "$" + yAxisValue)
						.ticks(10)
				)
				.append("text")
				.attr("y", 6)
				.attr("dy", "0.71em")
				.attr("text-anchor", "end")
				.text("value");

			// Remove old D3 elements
			update.exit().remove();
		}
	}, [chartData, d3Container.current]);

	return (
		<svg
			className="d3-component"
			width={width}
			height={height}
			style={{ backgroundColor: "white" }}
			ref={d3Container}
		/>
	);
};

export default BarChart;
