import { Metric, MetricPoint } from '../models/Metric.js';

interface CurveParams {
	green: { mid: number; amp1: number; p1: number; freq2: number; amp2: number; p2: number };
	orange: { amp1: number; p1: number; freq2: number; amp2: number; p2: number };
	blue: { mid: number; amp1: number; p1: number; freq2: number; amp2: number; p2: number };
}

export class MetricService {
	daily(): MetricPoint[] {
		const params = this.randomParams();
		return Array.from({ length: 25 }, (_, hour) =>
			this.point(hour, params).toJSON(),
		);
	}

	private randomParams(): CurveParams {
		const r = (min: number, max: number) => min + Math.random() * (max - min);
		const TAU = Math.PI * 2;
		return {
			green: {
				mid: r(40, 60),
				amp1: r(25, 40),
				p1: r(-TAU, TAU),
				freq2: r(2, 5),
				amp2: r(4, 12),
				p2: r(-TAU, TAU),
			},
			orange: {
				amp1: r(45, 75),
				p1: r(-TAU, TAU),
				freq2: r(3, 6),
				amp2: r(15, 30),
				p2: r(-TAU, TAU),
			},
			blue: {
				mid: r(4, 6),
				amp1: r(2, 3.5),
				p1: r(-TAU, TAU),
				freq2: r(4, 7),
				amp2: r(0.8, 1.8),
				p2: r(-TAU, TAU),
			},
		};
	}

	private point(hour: number, p: CurveParams): Metric {
		const t = hour / 24;
		const TAU = Math.PI * 2;

		const green =
			p.green.mid +
			p.green.amp1 * Math.sin(TAU * t + p.green.p1) +
			p.green.amp2 * Math.sin(TAU * p.green.freq2 * t + p.green.p2);

		const orange =
			p.orange.amp1 * Math.sin(TAU * 2 * t + p.orange.p1) -
			p.orange.amp2 * Math.cos(TAU * p.orange.freq2 * t + p.orange.p2);

		const blue =
			p.blue.mid +
			p.blue.amp1 * Math.sin(TAU * 1.5 * t + p.blue.p1) +
			p.blue.amp2 * Math.sin(TAU * p.blue.freq2 * t + p.blue.p2);

		return new Metric({
			hour,
			green: clamp(Math.round(green), 0, 100),
			orange: clamp(Math.round(orange), -100, 100),
			blue: clamp(Math.round(blue), 0, 10),
		});
	}
}

function clamp(n: number, min: number, max: number): number {
	return Math.max(min, Math.min(max, n));
}
