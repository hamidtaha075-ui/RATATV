import StationCard from './StationCard';

export default function StationList({ stations, loading, empty }: { stations: any[]; loading?: boolean; empty?: string }) {
  if (loading) return <div className="loading">{empty ? '' : 'Loading...'}</div>;
  if (!stations || stations.length === 0) return <div className="empty">{empty || 'No stations'}</div>;
  return (
    <div className="station-grid">
      {stations.map((s) => (
        <StationCard key={s.id} station={s} />
      ))}
    </div>
  );
}
