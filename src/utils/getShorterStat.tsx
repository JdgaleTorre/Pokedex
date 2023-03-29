export default function getShorterStat(stat: string) {
  let shortStat = "";

  switch (stat) {
    case "attack":
      shortStat = "ATK";
      break;
    case "defense":
      shortStat = "DEF";
      break;
    case "special-attack":
      shortStat = "SpA";
      break;
    case "special-defense":
      shortStat = "SpD";
      break;
    case "speed":
      shortStat = "SP";
      break;
    default:
      shortStat = stat;
      break;
  }
  console.log(shortStat);
  return shortStat;
}
