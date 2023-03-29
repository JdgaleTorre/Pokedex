export default function PokemonType({ type }: { type: string }) {
  return (
    <div
      className={`bg-${type} capitalize rounded-lg py-1 px-2 mx-2 font-bold w-20 text-center`}
    >
      {type}
    </div>
  );
}
