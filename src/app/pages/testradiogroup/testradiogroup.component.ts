import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-testradiogroup',
  templateUrl: './testradiogroup.component.html',
  styleUrls: ['./testradiogroup.component.scss']
})
export class TestradiogroupComponent implements OnInit {
  Form:FormGroup;
  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  jour:any[]=[
    {
      jr:'lundi',
      formName:'lun'
    },
    {
      jr:'mardi',
      formName:'mar'
    },
    {
      jr:'mercredi',
      formName:'mer'
    },
    {
      jr:'jeudi',
      formName:'jeu'
    },
    {
      jr:'vendredi',
      formName:'ven'
    },
    {
      jr:'samedi',
      formName:'sam'
    },
  ]
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {

    this.Form=this.fb.group({
      lun:[''],
      mar:[''],
      mer:[''],
      jeu:[''],
      ven:[''],
      sam:[''],
    });
  }

  change()
  {
    console.log(this.Form.value);
  }
}
