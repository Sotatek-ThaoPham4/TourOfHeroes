import {Weapon} from './weapon';
import {Armour} from './armour';

export interface Hero {
  id: number;
  name: string;
  health: number;
  weapon: Weapon;
  armour: Armour;
  imageSrc: string;
}
