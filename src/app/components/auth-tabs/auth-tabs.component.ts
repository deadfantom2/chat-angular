import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'app-auth-tabs',
  templateUrl: './auth-tabs.component.html',
  styleUrls: ['./auth-tabs.component.css']
})
export class AuthTabsComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const tabsSelector = document.querySelector('.tabs');
    M.Tabs.init(tabsSelector, {}); //methodes: duration=> deplacement de la ligne rouge, onShow, swipeable
  }
}
