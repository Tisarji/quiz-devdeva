import * as S from '../styles/Skeleton.styles';

export function SkeletonCard() {
	return (
		<S.Card>
			<S.Block $h={14} $w="70%" />
			<S.Block $h={10} $w="40%" />
			<S.Block $h={20} $w="100%" />
			<S.Block $h={6} $w="100%" />
		</S.Card>
	);
}

export function SkeletonColumn({ count = 2 }: { count?: number }) {
	return (
		<>
			{Array.from({ length: count }).map((_, i) => (
				<SkeletonCard key={i} />
			))}
		</>
	);
}
