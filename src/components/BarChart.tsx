import * as d3 from "d3";
import React, { useRef, useEffect } from "react";
import { ChartProps } from "../shared/Type";

const margin = { top: 20, right: 20, bottom: 30, left: 60 };
const minimumValueOffset = 2000;

const BarChart = ({ chartData, chartHeader, height, width }: ChartProps) => {
	const d3Container = useRef(null);

	/* The useEffect Hook is for running side effects outside of React,
       for instance inserting elements into the DOM using D3 */
	useEffect(() => {
		if (chartData !== undefined && d3Container.current) {
			const svg = d3.select(d3Container.current);

			renderChart(svg);
		}
	}, [chartData, d3Container.current]);

	const renderChart = (svgCanvas: any) => {
		const update = svgCanvas
			.append("g")
			.attr("transform", `translate(${margin.left}, ${margin.top})`);

		const xScale = d3.scaleBand().range([0, width]).round(true).padding(0.15);
		const yScale = d3.scaleLinear().range([height, 0]);
		const total = chartData.map((item: any) => parseInt(item[9]));

		xScale.domain(chartData.map((item: any) => item[0]));
		yScale.domain([
			Math.min(...total) - minimumValueOffset,
			Math.max(...total),
		]);

		update
			.append("g")
			.attr("transform", `translate(0,${height})`)
			.call(d3.axisBottom(xScale));

		update
			.append("g")
			.call(
				d3
					.axisLeft(yScale)
					.tickFormat((yAxisValue: any) => "$" + yAxisValue)
					.ticks(8)
			)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Frequency");

		const onMouseOver = function (this: any, d: any, i: any) {
			var ref = this;
			d3.select(ref)
				.transition() // adds animation
				.duration(100)
				.attr("fill", "orange")
				.attr("width", xScale.bandwidth() + 1);
		};
		const onMouseOut = function (this: any, d: any, i: any) {
			var ref = this;
			d3.select(ref).attr("class", "bar");
			d3.select(ref)
				.transition() // adds animation
				.duration(100)
				.attr("width", xScale.bandwidth())
				.attr("fill", "black");
		};
		const barGroup = update
			.selectAll(".bar-group")
			.data(chartData)
			.enter()
			.append("g")
			.attr("class", "bar-group");

		barGroup
			.append("rect")
			.attr("class", "bar")
			.on("mouseover", onMouseOver)
			.on("mouseout", onMouseOut)
			.attr("x", (d: any): any => xScale(d[0]))
			.attr("y", (d: any): any => yScale(d[9]))
			.attr("width", xScale.bandwidth())
			.attr("height", (d: any): any => height - yScale(d[9]));
		barGroup
			.append("text")
			.text((d: any) => `$ ${d[9]}`)
			.attr("font-size", 10)
			.attr("x", (d: any): any => xScale(d[0]))
			.attr("y", (d: any): any => yScale(d[9]) - 8);
		// Remove old D3 elements
		update.exit().remove();
	};

	return (
		<svg
			className="d3-component"
			width={width + margin.left + margin.right}
			height={height + margin.top + margin.bottom}
			style={{ backgroundColor: "white" }}
			ref={d3Container}
		/>
	);
};

export default BarChart;
