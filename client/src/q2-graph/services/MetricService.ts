export interface MetricPoint {
	hour: number;
	green: number;
	orange: number;
	blue: number;
}

export class MetricService {
	constructor(private readonly baseUrl: string = '/api/metrics') {}

	async daily(): Promise<MetricPoint[]> {
		const res = await fetch(`${this.baseUrl}/daily`);
		if (!res.ok) throw new Error('Failed to load metrics');
		const data = (await res.json()) as { items: MetricPoint[] };
		return data.items;
	}
}

export const metricService = new MetricService();
