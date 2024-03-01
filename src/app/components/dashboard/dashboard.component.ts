import {Component, OnDestroy, OnInit} from '@angular/core';
import {Hero} from '../../interfaces/hero';
import {HeroService} from '../../services/hero.service';
import Konva from 'konva';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit, OnDestroy {
  public heroes: Hero[] = [];
  public canvas!: HTMLCanvasElement;
  public stage!: Konva.Stage;
  public layer!: Konva.Layer;
  public canvasHeroes: { hero: Hero, initialPosition: { x: number, y: number }, position: { x: number, y: number } }[] = [];
  public battleCompleted = false;
  public battleMessage = '';
  public intervalId: any;
  public battleInProgress = false;
  protected _subscription: Subscription;

  constructor(private __heroService: HeroService) {
    this._subscription = new Subscription();
  }

  public ngOnInit(): void {
    this.getHeroes();
    this.initializeCanvas();
  }

  public getHeroes(): void {
    const getHeroesSubscription = this.__heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
    this._subscription.add(getHeroesSubscription);
  }

  private initializeCanvas(): void {
    this.canvas = document.getElementById('container') as HTMLCanvasElement;
    this.stage = new Konva.Stage({
      container: 'container',
      width: 750,
      height: 500
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
  }

  public toggleHero(hero: Hero): void {
    const index = this.canvasHeroes.findIndex(h => h.hero.id === hero.id);
    if (index !== -1) {
      this.canvasHeroes.splice(index, 1);
      this.redrawCanvas();
    } else {
      const initialPosition = { x: Math.random() * 600, y: Math.random() * 450 };
      this.canvasHeroes.push({ hero, initialPosition, position: { ...initialPosition } });
      this.drawHero(hero, initialPosition);
    }
  }

  private redrawCanvas(): void {
    this.layer.destroyChildren();
    this.canvasHeroes.forEach(heroData => {
      this.drawHero(heroData.hero, heroData.position);
    });
    this.layer.batchDraw();
  }

  private drawHero(hero: Hero, position: { x: number, y: number }): void {
    const imageObj = new Image();
    imageObj.src = hero.imageSrc;
    imageObj.onload = () => {
      const konvaImage = new Konva.Image({
        image: imageObj,
        x: position.x,
        y: position.y,
        width: 150,
        height: 150,
        draggable: true
      });

      if (hero.health < 50) {
        konvaImage.stroke('red');
        konvaImage.strokeWidth(5);
      }

      konvaImage.on('click', () => {
        this.changeWeapon(hero);
      });
      this.layer.add(konvaImage);
      this.layer.batchDraw();
    };
  }

  private changeWeapon(hero: Hero): void {
    // Implement your logic for changing weapon here
  }

  public startBattle(): void {
    if (this.intervalId || this.battleCompleted) {
      clearInterval(this.intervalId);
    }
    this.battleCompleted = false;
    this.battleInProgress = true;

    this.intervalId = setInterval(() => {
      this.attack();
      if (this.battleCompleted) {
        clearInterval(this.intervalId);
        this.battleInProgress = false;
      }
    }, 1000);
  }

  private attack(): void {
    if (this.canvasHeroes.length < 2) {
      this.battleMessage = 'You need at least 2 heroes on the stage to start the attack';
      return;
    }
    this.battleMessage = 'Battle is ongoing...';

    this.canvasHeroes.forEach(attackerData => {
      const attacker = attackerData.hero;
      this.canvasHeroes.forEach(targetData => {
        const target = targetData.hero;
        if (attacker.id !== target.id) {
          target.health -= attacker.weapon.damage;
          if (target.health <= 0) {
            const index = this.canvasHeroes.findIndex(heroData => heroData.hero.id === target.id);
            this.canvasHeroes.splice(index, 1);
            this.redrawCanvas();
            if (this.canvasHeroes.length === 1) {
              this.battleCompleted = true;
            }
          }
        }
      });
    });

    if (this.battleCompleted) {
      this.battleMessage = 'Battle is completed';
    }
  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }
}
