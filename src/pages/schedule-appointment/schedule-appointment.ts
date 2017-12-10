import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController,  App, Platform, ToastController } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";
import { Common } from "../../providers/common";
import {CalendarComponent} from "ap-angular2-fullcalendar/src/calendar/calendar";


import { Welcome } from '../welcome/welcome';

/**
 * Generated class for the ScheduleAppointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import * as jQuery from 'jquery';
var today = new Date(); 
var todays = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + ("0" + today.getDate()).slice(-2); 

var events = []; //The array*/
@IonicPage()
@Component({
  selector: 'page-schedule-appointment',
  templateUrl: 'schedule-appointment.html',
})
export class ScheduleAppointmentPage {
   public dremail;
   appointment : any;
  constructor(public common: Common,
    //private alertCtrl: AlertController,
    public navCtrl: NavController,
    public app: App,
    public authService: AuthService,
    public platform: Platform,private toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    this.dremail =  JSON.parse(localStorage.getItem('userData'));
    
    this.authService.getAppointments(this.dremail.email,'appointments').then((result) =>{
    this.appointment = result;
     if (events.length < this.appointment.length) { for (let i = 0; i < this.appointment.length; i++) { events.push( {id:JSON.stringify(this.appointment[i].patient_id),title: JSON.stringify(this.appointment[i].first_name + ' ' + this.appointment[i].last_name), start: this.appointment[i].appdate.toString().replace(" ","T")}); } }
       }, (err) => {
      alert(this.dremail.user_id);
    });
  }
  
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
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
      this.navCtrl.setRoot(ScheduleAppointmentPage)
  }
  
  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;
 
  changeCalendarView(view) {
    this.myCalendar.fullCalendar('changeView', view);
  }
  
  calendarOptions:Object = {
       
        defaultDate:  todays,
        defaultView: jQuery(window).width() < 768 ? 'agendaDay' : 'month',
        eventLimit: true, // allow "more" link when too many events
        events: function(start, end, timezone, callback) {
                setTimeout (() => {
                    callback(events);
                     }, 1000);        
        },
      
    header: {
        left: 'prev,next today myCustomButton',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
    },eventClick: function(calEvent, jsEvent, view) {
        //alert(calEvent.id);
        //return false;
        //router.navigate(['/patient-profile/'+calEvent.id]);
    },
    eventRender: function(event, element) {
        //element.attr("ng-reflect-router-link",element.attr("href").toString().replace("e/","e,"));
        element.attr("data-id",event.id);
    }
   /* customButtons: {
        myCustomButton: {
            text: 'Book An Appoinment',
            click: function() {
                jQuery('#myModalHorizontal').modal();
            }
        }
    },*/
      
      };
}
