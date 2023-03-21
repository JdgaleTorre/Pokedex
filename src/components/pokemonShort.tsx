export default function PokemonShort({
  index,
  name,
}: {
  index: number;
  name: string;
}) {
  return (
    <div className="bg-slate-50 w-56 h-28 rounded-lg m-2 flex flex-auto flex-col justify-center text-center">
      <div className="font-light text-gray-400 text-xs">{`No. ${index}`}</div>
      <div className="font-bold text-lg mt-2 capitalize">{name}</div>
    </div>
  );
}
