import { Component, OnInit } from '@angular/core';

import { Hero } from '../../interfaces/hero';
import { HeroService } from '../../services/hero.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  public heroes: Hero[] = [];
  protected _subscription: Subscription;

  constructor(private __heroService: HeroService) {
    this._subscription = new Subscription();
  }

  public ngOnInit(): void {
    this.getHeroes();
  }

  public getHeroes(): void {
    const getHeroesSubscription = this.__heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
    this._subscription.add(getHeroesSubscription);
  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe()
  }
}
