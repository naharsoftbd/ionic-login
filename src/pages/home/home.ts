import { Component, ViewChild } from "@angular/core";
import { NavController, App, Platform, ActionSheetController } from "ionic-angular";
import { AuthService } from "../../providers/auth-service";
import { Common } from "../../providers/common";

import { Welcome } from '../welcome/welcome';
import { ScheduleAppointmentPage } from '../schedule-appointment/schedule-appointment';

@Component({ selector: "page-home", templateUrl: "home.html" })
export class HomePage {
  @ViewChild("updatebox") updatebox;
  public userDetails: any;
  public resposeData: any;
  public dataSet: any;
  public noRecords: boolean;
  userPostData = {
    user_id: "",
    token: "",
    feed: "",
    feed_id: "",
    lastCreated: ""
  };

  constructor(
    public common: Common,
    //private alertCtrl: AlertController,
    public navCtrl: NavController,
    public app: App,
    public authService: AuthService,
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController
  ) {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data;
    console.log(this.userDetails.user_id);
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
    this.userPostData.lastCreated = "";
    this.noRecords = false
   
  }

  
  converTime(time) {
    let a = new Date(time * 1000);
    return a;
  }

  backToWelcome() {
    this.navCtrl.setRoot(Welcome)
  }

  logout() {
    //Api Token Logout

    localStorage.clear();
    setTimeout(() => this.backToWelcome(), 3000);
  }
  goToAppointments(){
      this.navCtrl.push(ScheduleAppointmentPage)
  }
 
}
