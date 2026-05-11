import { FilePdfOutlined, ReloadOutlined } from '@ant-design/icons';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { MetricPoint, metricService } from '../services/MetricService';
import * as S from '../styles/DailyGraph.styles';

const COLOR = {
	green: '#34c759',
	orange: '#f5a623',
	blue: '#0071e3',
} as const;

const LABEL = {
	green: 'สีเขียว',
	orange: 'สีส้ม',
	blue: 'สีน้ำเงิน',
} as const;

interface ChartRow extends MetricPoint {
	label: string;
}

export default function DailyGraph() {
	const [data, setData] = useState<MetricPoint[]>([]);
	const [loading, setLoading] = useState(true);
	const [exporting, setExporting] = useState(false);
	const chartRef = useRef<HTMLDivElement>(null);

	const load = () => {
		setLoading(true);
		metricService
			.daily()
			.then(setData)
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		load();
	}, []);

	const chartData = useMemo<ChartRow[]>(
		() =>
			data.map((d) => ({
				...d,
				label: `${String(d.hour).padStart(2, '0')}:00`,
			})),
		[data],
	);

	const handleExport = async () => {
		if (!chartRef.current || loading || data.length === 0) return;
		setExporting(true);
		try {
			await new Promise((resolve) => requestAnimationFrame(resolve));
			const canvas = await html2canvas(chartRef.current, {
				backgroundColor: '#ffffff',
				scale: 2,
			});
			const img = canvas.toDataURL('image/png');
			const pdf = new jsPDF({ orientation: 'landscape', unit: 'px' });
			const pageWidth = pdf.internal.pageSize.getWidth();
			const pageHeight = pdf.internal.pageSize.getHeight();
			const ratio = canvas.height / canvas.width;
			const w = pageWidth - 40;
			const h = w * ratio;
			const y = Math.max(20, (pageHeight - h) / 2);
			pdf.addImage(img, 'PNG', 20, y, w, h);
			pdf.save('daily-graph.pdf');
		} finally {
			setExporting(false);
		}
	};

	return (
		<>
			<S.Header>
				<S.Title>Daily Graph</S.Title>
				<S.Actions>
					<S.RefreshButton onClick={load} disabled={loading}>
						<ReloadOutlined spin={loading} />
						Refresh
					</S.RefreshButton>
					<S.ExportButton
						onClick={handleExport}
						disabled={loading || exporting || data.length === 0}
					>
						<FilePdfOutlined />
						{exporting ? 'Exporting...' : 'Export PDF'}
					</S.ExportButton>
				</S.Actions>
			</S.Header>

			<S.Card>
				<S.ScaleBar>
					<S.ScaleItem $color={COLOR.green}>
						<S.ScaleName>Value A</S.ScaleName>
						<S.ScaleRange>0 – 100</S.ScaleRange>
					</S.ScaleItem>
					<S.ScaleItem $color={COLOR.orange}>
						<S.ScaleName>Value</S.ScaleName>
						<S.ScaleRange>−100 – 100</S.ScaleRange>
					</S.ScaleItem>
					<S.ScaleItem $color={COLOR.blue}>
						<S.ScaleName>Value B</S.ScaleName>
						<S.ScaleRange>0 – 10</S.ScaleRange>
					</S.ScaleItem>
				</S.ScaleBar>

				<S.ChartWrap ref={chartRef}>
					{loading && data.length === 0 ? (
						<S.LoadingText>Loading chart...</S.LoadingText>
					) : (
						<ResponsiveContainer width="100%" height="100%">
							<AreaChart
								data={chartData}
								margin={{ top: 16, right: 24, left: 8, bottom: 16 }}
							>
								<defs>
									<linearGradient
										id="fillGreen"
										x1="0"
										y1="0"
										x2="0"
										y2="1"
									>
										<stop
											offset="0%"
											stopColor={COLOR.green}
											stopOpacity={0.2}
										/>
										<stop
											offset="100%"
											stopColor={COLOR.green}
											stopOpacity={0}
										/>
									</linearGradient>
									<linearGradient
										id="fillOrange"
										x1="0"
										y1="0"
										x2="0"
										y2="1"
									>
										<stop
											offset="0%"
											stopColor={COLOR.orange}
											stopOpacity={0.22}
										/>
										<stop
											offset="100%"
											stopColor={COLOR.orange}
											stopOpacity={0}
										/>
									</linearGradient>
									<linearGradient
										id="fillBlue"
										x1="0"
										y1="0"
										x2="0"
										y2="1"
									>
										<stop
											offset="0%"
											stopColor={COLOR.blue}
											stopOpacity={0.18}
										/>
										<stop
											offset="100%"
											stopColor={COLOR.blue}
											stopOpacity={0}
										/>
									</linearGradient>
								</defs>

								<CartesianGrid
									stroke="#eef0f3"
									strokeDasharray="4 4"
									vertical={false}
								/>

								<XAxis
									dataKey="label"
									tick={{ fontSize: 10, fill: '#86868b' }}
									axisLine={false}
									tickLine={false}
									interval={0}
									padding={{ left: 8, right: 8 }}
									dy={6}
								/>

								<YAxis
									yAxisId="green"
									domain={[0, 100]}
									ticks={[0, 50, 100]}
									hide
									padding={{ top: 16, bottom: 16 }}
								/>
								<YAxis
									yAxisId="orange"
									domain={[-100, 100]}
									ticks={[-100, 0, 100]}
									hide
									padding={{ top: 16, bottom: 16 }}
								/>
								<YAxis
									yAxisId="blue"
									domain={[0, 10]}
									ticks={[0, 5, 10]}
									hide
									padding={{ top: 16, bottom: 16 }}
								/>

								<Tooltip
									content={<CustomTooltip />}
									cursor={{
										stroke: '#cbd5e1',
										strokeWidth: 1,
										strokeDasharray: '3 3',
									}}
								/>

								<Area
									yAxisId="green"
									type="monotone"
									dataKey="green"
									name="Value A"
									stroke={COLOR.green}
									strokeWidth={2}
									fill="url(#fillGreen)"
									dot={{
										r: 2.5,
										fill: COLOR.green,
										stroke: 'white',
										strokeWidth: 1,
									}}
									activeDot={{
										r: 5,
										stroke: 'white',
										strokeWidth: 2,
									}}
								/>
								<Area
									yAxisId="orange"
									type="monotone"
									dataKey="orange"
									name="orange"
									legendType="none"
									stroke={COLOR.orange}
									strokeWidth={2}
									fill="url(#fillOrange)"
									dot={{
										r: 2.5,
										fill: COLOR.orange,
										stroke: 'white',
										strokeWidth: 1,
									}}
									activeDot={{
										r: 5,
										stroke: 'white',
										strokeWidth: 2,
									}}
								/>
								<Area
									yAxisId="blue"
									type="monotone"
									dataKey="blue"
									name="Value B"
									stroke={COLOR.blue}
									strokeWidth={2}
									fill="url(#fillBlue)"
									dot={{
										r: 2.5,
										fill: COLOR.blue,
										stroke: 'white',
										strokeWidth: 1,
									}}
									activeDot={{
										r: 5,
										stroke: 'white',
										strokeWidth: 2,
									}}
								/>
							</AreaChart>
						</ResponsiveContainer>
					)}
				</S.ChartWrap>
			</S.Card>
		</>
	);
}

interface TooltipItem {
	dataKey?: string;
	value?: number;
}

interface CustomTooltipProps {
	active?: boolean;
	payload?: TooltipItem[];
	label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
	if (!active || !payload || !payload.length) return null;
	const get = (key: 'green' | 'orange' | 'blue') =>
		payload.find((p) => p.dataKey === key)?.value ?? '-';

	return (
		<S.TooltipBox>
			<S.TooltipTime>{label}</S.TooltipTime>
			<S.TooltipRow>
				<S.TooltipLabel $color={COLOR.green}>{LABEL.green}</S.TooltipLabel>
				<S.TooltipValue>{get('green')}</S.TooltipValue>
			</S.TooltipRow>
			<S.TooltipRow>
				<S.TooltipLabel $color={COLOR.orange}>{LABEL.orange}</S.TooltipLabel>
				<S.TooltipValue>{get('orange')}</S.TooltipValue>
			</S.TooltipRow>
			<S.TooltipRow>
				<S.TooltipLabel $color={COLOR.blue}>{LABEL.blue}</S.TooltipLabel>
				<S.TooltipValue>{get('blue')}</S.TooltipValue>
			</S.TooltipRow>
		</S.TooltipBox>
	);
}
