import * as d3 from "d3";
import React, { FC, useRef, useEffect } from "react";
import { ChartProps } from "../shared/Type";

const BarChart = ({ chartData, height, width }: ChartProps) => {
	const d3Container = useRef(null);

	/* The useEffect Hook is for running side effects outside of React,
       for instance inserting elements into the DOM using D3 */
	useEffect(() => {
		if (chartData && d3Container.current) {
			const svg = d3.select(d3Container.current);

			// Bind D3 data
			const update = svg.append("g").selectAll("text").data(chartData);

			// Enter new D3 elements
			update
				.enter()
				.append("text")
				.attr("x", (d, i) => i * 50)
				.attr("y", 40)
				.style("font-size", 20)
				.text((d: any) => d);

			// Update existing D3 elements
			update.attr("x", (d, i) => i * 40).text((d: any) => d);

			// Remove old D3 elements
			update.exit().remove();
		}
	}, [chartData, d3Container.current]);

	return (
		<svg
			className="d3-component"
			width={width}
			height={height}
			ref={d3Container}
		/>
	);
};

export default BarChart;
