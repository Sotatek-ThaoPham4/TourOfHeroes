import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';
import {Armour} from '../interfaces/armour';
import {ARMOURS} from '../data/mock-armour';

@Injectable({ providedIn: 'root' })
export class ArmourService {

  public constructor() { }

  public getArmours(): Observable<Armour[]> {
    const armours = of(ARMOURS);
    return armours;
  }
}

