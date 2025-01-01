import WebSocket = require("ws");
import { COINS, Number} from "./types";
import { GameManager } from "./GameManager";
import {MULTIPLIER} from "./userManager";
export class User {
    id: number;
    name: string;
    ws: WebSocket;
    balance: number;
    locked: number;


    constructor(id: number, name: string, ws: WebSocket) {
        this.id = id;
        this.name = name;
        this.ws = ws;
        this.balance = 1000;
    }

    bet(amount: COINS, betNumber: Number, clientId: string) {

        this.balance -= amount
        this.locked += amount
        const response = GameManager.getInstance().bet(amount, betNumber, this.id)
        if(response){
            this.ws.send(JSON.stringify({type: 'bet', amount, balance: this.balance, locked: this.locked}))
        }   else {
            this.ws.send(JSON.stringify({type: 'bet-undo', amount, balance: this.balance, locked: this.locked}))
        }
       
    }

    won(amount: number, output: Number) {
        this.balance += amount * MULTIPLIER
        this.locked -= amount * MULTIPLIER
    }

    lost(amount: number) {
        this.balance -= amount 
        this.locked += amount
    }
}