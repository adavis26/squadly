import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-squad',
  templateUrl: './squad.component.html',
  styleUrls: ['./squad.component.css']
})
export class SquadComponent implements OnInit {

  @ViewChild('squadContainer', { static: true }) squadContainer: ElementRef;

  public selectedSquad;

  public squads = [
    {
      squad_id: 1,
      squad_name: 'boys'
    },
    {
      squad_id: 2,
      squad_name: 'jawns'
    },
    {
      squad_id: 3,
      squad_name: 'pals'
    }
  ];

  constructor() { }

  ngOnInit() {
    this.selectedSquad = this.squads[0];
  }

  // public setWidth(): number {
  //   const squadLength: number = this.squads.length;
  //   const containerWidth: number = this.squadContainer.nativeElement.offsetWidth;
  //   let output;

  //   switch (squadLength) {
  //     case 1:
  //       output = 'col-12';
  //       break;
  //     case 2:
  //       output = 'col-6';
  //       break;
  //     case 3:
  //       output = 'col-4';
  //       break;
  //     case 4:
  //       output = 'col-3';
  //       break;
  //   }
  //   return output;
  // }

  public setSelectedSquad(squad){
    this.selectedSquad = squad;
  }
}
