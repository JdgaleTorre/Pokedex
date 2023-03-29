import Image from "next/image";

export default function PokemonShort({
  index,
  name,
  sprite,
}: {
  index: number;
  name: string;
  sprite: string;
}) {
  return (
    <div className="bg-white my-8 mx-3 w-[230px] h-28 rounded-lg flex flex-auto flex-col justify-center text-center items-center relative shadow-lg cursor-pointer hover:border border-gray-500 group">
      <Image
        className="absolute -top-14 transition-all group-hover:scale-125"
        src={sprite}
        alt={`${index}-${name}`}
        width={96}
        height={96}
      />
      <div className="font-bold text-gray-400 text-xs my-1">{`No. ${index}`}</div>
      <div className="font-bold text-lg mt-2 capitalize">{name}</div>
    </div>
  );
}
