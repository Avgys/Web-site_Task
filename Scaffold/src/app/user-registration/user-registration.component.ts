import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


/*export class HeroDetailComponent implements OnInit {

  hero?: Hero;
  constructor(private route: ActivatedRoute,
    private location: Location,
    private heroService: HeroService) { }

  getHero(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  save(){
    if (this.hero){
      this.heroService.update(this.hero).subscribe(() => this.goBack());
    }
  }

  goBack(){
    this.location.back();
  }

  ngOnInit(): void {
    this.getHero();
  }

}
*/