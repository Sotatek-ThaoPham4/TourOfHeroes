import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';
import {Weapon} from '../interfaces/weapon';
import {WEAPONS} from '../data/mock-weapons';

@Injectable({ providedIn: 'root' })
export class WeaponService {

  public constructor() { }

  public getWeapons(): Observable<Weapon[]> {
    const weapons = of(WEAPONS);
    return weapons;
  }
}
