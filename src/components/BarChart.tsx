import * as d3 from "d3";
import React, { useRef, useEffect, useState } from "react";
import { ChartProps } from "../shared/Type";

const margin = { top: 30, right: 20, bottom: 30, left: 60 };
const minimumValueOffset = 3000;
const targetNetworth = 15000;

const BarChart = ({ chartData, height, width }: ChartProps) => {
	const d3Container = useRef(null);
	const [selection, setSelection] = useState([]);

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

		const xScale = d3.scaleBand().range([0, width]).round(true).padding(0.25);
		const yScale = d3.scaleLinear().range([height, 0]);
		const total = chartData.map((item: any) => parseFloat(item[9]));

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
					.tickFormat((yAxisValue: any) => "$" + yAxisValue.toLocaleString())
					.ticks(8)
			)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Frequency");

		const onMouseOver = function (this: any, d: any, i: any) {
			const ref = this;
			setSelection(i);

			d3.select(ref)
				.transition() // adds animation
				.duration(200)
				.attr("fill", "orange")
				.attr("width", xScale.bandwidth() + 1);
		};

		const onMouseOut = function (this: any, d: any, i: any) {
			const ref = this;
			setSelection([]);

			d3.select(ref)
				.transition() // adds animation
				.duration(200)
				.attr("width", xScale.bandwidth())
				.attr("fill", barColor(i[9]));
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
			.attr("fill", (d: any): any => barColor(d[9]))
			.attr("height", (d: any): any => height - yScale(d[9]));
		barGroup
			.append("text")
			.text((d: any) => `$ ${numberStringToLocale(d[9])}`)
			.attr("font-size", 10)
			.attr("font-weight", "bold")
			.attr("class", "text")
			.attr("x", (d: any): any => xScale(d[0]))
			.attr("y", (d: any): any => yScale(d[9]) - 8);

		// Remove old D3 elements
		update.exit().remove();
	};

	const numberStringToLocale = (num: string): string => {
		return parseFloat(num).toLocaleString();
	};

	const barColor = (value: string): string =>
		parseFloat(value) > targetNetworth
			? "rgb(0, 42, 58)"
			: "rgba(220,20,60,.75)";

	const renderInfo = () => {
		const textX = margin.left + margin.right;
		const textY = margin.left;
		return (
			<g className="info">
				<text
					x={textX}
					y={textY - 20}
					fontWeight="bold"
					fontSize="14px"
					fill="rgb(0, 42, 58)">
					Target Net Worth: ${targetNetworth.toLocaleString()}
				</text>
				{selection.length > 0 ? (
					<text
						x={textX}
						y={textY}
						fontWeight="bold"
						fontSize="14px"
						fill={barColor(selection[9])}>
						Net Worth for {selection[0]} was $
						{numberStringToLocale(selection[9])}
					</text>
				) : (
					<React.Fragment />
				)}
			</g>
		);
	};

	return (
		<svg
			className="d3-component"
			width={width + margin.left + margin.right}
			height={height + margin.top + margin.bottom}
			style={{ backgroundColor: "white" }}
			ref={d3Container}>
			{renderInfo()}
		</svg>
	);
};

export default BarChart;
