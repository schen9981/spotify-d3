/* basic bar graph made with d3.js */

data = [100, 324, 903, 4, 300]

update(data)

setTimeout(function() { update([100, 324, 903, 4, 10]) }, 3000)
setTimeout(function() { update([100, 324, 4, 10]) }, 6000)
setTimeout(function() { update([100, 324, 4, 10, 500, 44]) }, 9000)


function update(updated_data) {
	/* select chart container, gets the divs, bind updated_data to each data point */
	data_bind = d3.select(".chart").selectAll("div").data(updated_data) 

	data_bind.exit().remove()

	/* compare new updated data to the last data that I received, and see if there is anything new */
	data_bind
		.enter()
		.append("div")
			.style("width", function(d) { return d.toString() })
			.style("height", "40")
			.text(function(d) { return d.toString() })
			.transition()
				.duration(1000)
				.style("width", function(d) { return d.toString() })
			
			data_bind
			.transition()
				.duration(1000)
				.style("width", function(d) { return d.toString() })

}