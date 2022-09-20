import { Component, OnInit } from '@angular/core';
import { AppSettings, Settings } from 'src/app/app.settings';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public workingHours = [
    { day: "Lundi", hours: "8H30 À 18H30" },
    { day: "Mardi", hours: "8H30 À 18H30" },
    { day: "Mercredi", hours: "8H30 À 18H30" },
    { day: "Jeudi", hours: "8H30 À 18H30" },
    { day: "Vendredi", hours: "8H30 À 18H30" },
    { day: "Samedi", hours: "8H30 À 18H30" },
    { day: "Dimanche", hours: "8H30 À 18H30" }
  ]

  public settings: Settings;
  constructor(public appSettings:AppSettings) { 
    this.settings = this.appSettings.settings; 
  }

  ngOnInit(): void {
  }

}
