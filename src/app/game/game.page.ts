import { Component, OnInit } from '@angular/core';
import { Data } from '../data';
import { AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

type Choice = 'rock' | 'paper' | 'scissors';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  standalone : false,
})
export class GamePage implements OnInit {

  constructor(private data: Data, private alertCtrl: AlertController,
     private navCtrl: NavController,  private translate: TranslateService) { }

  ngOnInit() {
    this.resultText = this.translate.instant('MAKE_YOUR_MOVE');
  }
  playerScore = 0;
  cpuScore = 0;

  round = 1;
  timer = 1;
  maxRounds = 3;

  playerIcon : any = { type: 'icon', value: 'help-outline' };
  cpuIcon : any = { type: 'icon', value: 'help-outline' };
  

  resultText = '';
  result: 'win' | 'lose' | 'draw' | '' = '';
  finalResult = "";
  list = false;

  play(playerChoice: Choice) {

    const choices: Choice[] = ['rock', 'paper', 'scissors'];
    const cpuChoice = choices[Math.floor(Math.random() * 3)];

    this.playerIcon = this.getIcon(playerChoice);
    this.cpuIcon = this.getIcon(cpuChoice);

    const outcome = this.getResult(playerChoice, cpuChoice);

    if (outcome === 'win') this.playerScore++;
    if (outcome === 'lose') this.cpuScore++;

    this.result = outcome;
    this.resultText =
      outcome === 'win' ? 'You Win!' :
      outcome === 'lose' ? 'You Lose!' :
      'Draw';

      if(this.round < this.maxRounds)
        this.round++;
      this.timer++;
          this.roundsHistory.push({
         player: playerChoice,
         cpu: cpuChoice,
         winner: outcome
      });
    if (this.timer > this.maxRounds) {
      setTimeout(() => this.endGame(), 800);
    }
  }

getIcon(choice: Choice) {
  if (choice === 'rock') {
    return { type: 'image', value: 'assets/emojis/hand-fist-solid-full.svg' };
  }

  if (choice === 'paper') {
    return { type: 'icon', value: 'document-outline' };
  }

  return { type: 'icon', value: 'cut-outline' };
}


  getResult(p: Choice, c: Choice): 'win' | 'lose' | 'draw' {
    if (p === c) return 'draw';
    if (
      (p === 'rock' && c === 'scissors') ||
      (p === 'paper' && c === 'rock') ||
      (p === 'scissors' && c === 'paper')
    ) return 'win';
    return 'lose';
  }

  roundsHistory: { player: Choice; cpu: Choice; winner: 'win' | 'lose' | 'draw' }[] = [];

  async endGame() {
 
     this.finalResult = this.playerScore > this.cpuScore ? '🏆 You Won the Match!' :
      this.playerScore < this.cpuScore ? '💀 You Lost the Match' :
      '🤝 Match Draw'

      const game = {
    result: this.playerScore > this.cpuScore ? 'Win' :
            this.playerScore < this.cpuScore ? 'Lose' : 'Draw',
    score: `${this.playerScore}/${this.cpuScore}`,
    time: new Date().toLocaleString(),
    rounds: this.roundsHistory
  };

  const history = await this.data.loadHistory();
  history.push(game);
  await this.data.saveHistory(history);

    this.reset();
  }

  reset() {
    this.list=true;
    this.playerScore = 0;
    this.cpuScore = 0;
    this.round = 1;
    this.timer = 1;
    this.playerIcon = { type: 'icon', value: 'help-outline' };
    this.cpuIcon = { type: 'icon', value: 'help-outline' };
    this.resultText = 'Make your move';
    this.result = '';
    this.history = [];
    this.roundsHistory = [];
  }

  clear()
  {
    this.list = false;
    this.finalResult= "";
  }




  history : any = [];

  async loadHistory() {
    this.history = await this.data.loadHistory();
  }


  async confirmBackHome() {
  const alert = await this.alertCtrl.create({
    header: 'Go Back Home?',
    message: 'Are you sure you want to leave? Your current session will be cleared.',
    buttons: [
      { text: 'Cancel', role: 'cancel' },
      { 
        text: 'Yes', 
        handler: () => {
          this.reset();
          this.clear();              
          this.navCtrl.navigateRoot('/home');
        } 
      }
    ]
  });

  await alert.present();
}
}
