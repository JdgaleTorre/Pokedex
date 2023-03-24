export default function PokemonType({ type }: { type: string }) {
  return <div className={`bg-${type}`}>{type}</div>;
}
