import Desert from "../../../assets/planets/desert.png";
import Stratus from "../../../assets/planets/stratus.png";
import Rocky from "../../../assets/planets/rocky.png";
import Volcanic from "../../../assets/planets/volcanic.png";
import Mushroom from "../../../assets/planets/mushroom.png";
import Terra from "../../../assets/planets/terra.png";

export const planetClasses = [
  {
    class: 1,
    image: Rocky,
    range: '20',
    types: ['Rocky', 'Gooey', 'Ice', '???'],
    subline: 'Common',
    rarity: '10,000'
  },
  {
    class: 2,
    image: Stratus,
    range: '75',
    types: ['Stratus', 'Volcanic', 'Jungle', '???'],
    subline: 'Rare',
    rarity: '7,500'
  },
  {
    class: 3,
    image: Mushroom,
    range: '150',
    types: ['Mushroom', 'Rainbow', 'Savannah', '???'],
    subline: 'Weird',
    rarity: '5,000'
  },
  {
    class: 4,
    image: Terra,
    range: '250',
    types: ['Terra', 'Diamond', 'Rogue', '???'],
    subline: 'Valuable',
    rarity: '2,500'
  }
]

export const planetClassRanges = [
  {
    min: 20,
    max: 74,
    labels: [20, 38, 56, 74],
    defaultValue: 20
  },
  {
    min: 75,
    max: 149,
    labels: [75, 100, 125, 149],
    defaultValue: 75
  },
  {
    min: 150,
    max: 249,
    labels: [150, 185, 220, 249],
    defaultValue: 150
  },
  {
    min: 250,
    max: 1000,
    labels: [250, 500, 750, 1000],
    defaultValue: 250
  }
] 