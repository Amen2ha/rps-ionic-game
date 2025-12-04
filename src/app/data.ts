import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class Data {
  
   constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

    async saveHistory(history: GameHistory[]) {
      await this.storage.set('rpsHistory', history);
    }

    async loadHistory(): Promise<GameHistory[]> {
      const history = await this.storage.get('rpsHistory');
      return history || [];
    }
}




interface Round {
  player: string;
  cpu: string;
  winner: string;
}

interface GameHistory {
  result: string;
  score: string;
  time: string;
  rounds: Round[];
}
