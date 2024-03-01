import {Component, OnDestroy, OnInit} from '@angular/core';
import {Weapon} from '../../interfaces/weapon';
import {WeaponService} from '../../services/weapon.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrl: './weapons.component.css'
})
export class WeaponsComponent implements OnInit, OnDestroy {
  public weapons: Weapon[] = [];
  protected _subscription: Subscription;

  constructor(private __weaponService: WeaponService) {
    this._subscription = new Subscription();
  }

  public ngOnInit(): void {
    this.getWeapons();
  }

  public getWeapons(): void {
    const getWeaponsSubscription = this.__weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
    this._subscription.add(getWeaponsSubscription);
  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

}
