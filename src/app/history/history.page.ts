import { Component, OnInit } from '@angular/core';
import { Data } from '../data';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone : false,
})
export class HistoryPage implements OnInit {

 history: any[] = [];
  expandedIndex: number | null = null;

  constructor(private data: Data, private navCtrl: NavController, private alertCtrl: AlertController) { }

  async ngOnInit() {
    await this.loadHistory();
  }

  async loadHistory() {
    this.history = await this.data.loadHistory();
  }

  toggleDetails(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }


  async clearAll() {
    const alert = await this.alertCtrl.create({
      header: 'Clear All History?',
      message: 'This will remove all saved matches permanently.',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { 
          text: 'Clear All', 
          cssClass: 'danger',
          handler: async () => {
            this.history = [];
            await this.data.saveHistory(this.history);
          }
        }
      ]
    });

    await alert.present();
  }



  goBack() {
    this.navCtrl.navigateRoot('/home');
}


async deleteGame(index: number) {
    const alert = await this.alertCtrl.create({
      header: 'Delete Match?',
      message: 'Are you sure you want to delete this match?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          cssClass: 'danger',
          handler: async () => {
            this.history.splice(index, 1);
            await this.data.saveHistory(this.history);
          }
        }
      ]
    });

    await alert.present();
  }
}
