export interface MetricPoint {
	hour: number;
	green: number;
	orange: number;
	blue: number;
}

export class Metric {
	hour: number;
	green: number;
	orange: number;
	blue: number;

	constructor(props: MetricPoint) {
		this.hour = props.hour;
		this.green = props.green;
		this.orange = props.orange;
		this.blue = props.blue;
	}

	toJSON(): MetricPoint {
		return {
			hour: this.hour,
			green: this.green,
			orange: this.orange,
			blue: this.blue,
		};
	}
}
