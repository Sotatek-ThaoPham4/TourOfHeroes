import { Hero } from '../interfaces/hero';

export const HEROES: Hero[] = [
  { id: 1, name: 'Dr. Nice', health: 100, imageSrc: 'assets/images/hero-1.jpeg', weapon: {id: 1, name: 'War hammer', damage: 20}, armour: {id: 1, name: 'Iron Armor', health: 240}},
  { id: 2, name: 'Bombasto', health: 100, imageSrc: 'assets/images/hero-2.jpeg', weapon: {id: 2, name: 'Longbow', damage: 15}, armour: {id: 2, name: 'Leather Vest', health: 150} },
  { id: 3, name: 'Celeritas', health: 100, imageSrc: 'assets/images/hero-3.jpeg', weapon: {id: 3, name: 'Short Sword', damage: 40}, armour: {id: 3, name: 'Steel Plate', health: 300} },
  { id: 4, name: 'Magneta', health: 100, imageSrc: 'assets/images/hero-4.jpeg', weapon: {id: 4, name: 'Dagger', damage: 10}, armour: {id: 4, name: 'Chain mail', health: 20} },
  { id: 5, name: 'RubberMan', health: 100, imageSrc: 'assets/images/hero-5.jpg', weapon: {id: 5, name: 'Staff', damage: 30}, armour: {id: 5, name: 'Scale Armor', health: 100} },
  { id: 6, name: 'Dynama', health: 100, imageSrc: 'assets/images/hero-6.jpg', weapon: {id: 6, name: 'Crossbow', damage: 25}, armour: {id: 6, name: 'Plate Mail', health: 175} },
  { id: 7, name: 'Dr. IQ', health: 100, imageSrc: 'assets/images/hero-7.jpg', weapon: {id: 2, name: 'Longbow', damage: 15}, armour: {id: 3, name: 'Steel Plate', health: 300} },
  { id: 8, name: 'Magma', health: 100, imageSrc: 'assets/images/hero-8.jpg', weapon: {id: 4, name: 'Dagger', damage: 10}, armour: {id: 5, name: 'Scale Armor', health: 100} },
  { id: 9, name: 'Tornado', health: 100, imageSrc: 'assets/images/hero-9.jpg', weapon: {id: 3, name: 'Short Sword', damage: 40}, armour: {id: 1, name: 'Iron Armor', health: 240} }
];
