import {Component, OnDestroy, OnInit} from '@angular/core';
import {Armour} from '../../interfaces/armour';
import {Subscription} from 'rxjs';
import {ArmourService} from '../../services/armour.service';

@Component({
  selector: 'app-armour',
  templateUrl: './armour.component.html',
  styleUrl: './armour.component.css'
})
export class ArmourComponent implements OnInit, OnDestroy {
  public armours: Armour[] = [];
  protected _subscription: Subscription;

  constructor(private armourService: ArmourService) {
    this._subscription = new Subscription();
  }

  public ngOnInit(): void {
    this.getArmours();
  }

  public getArmours(): void {
    const getArmoursSubscription = this.armourService.getArmours()
      .subscribe(armours => this.armours = armours);
    this._subscription.add(getArmoursSubscription);
  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }


}
