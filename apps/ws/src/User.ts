import WebSocket = require("ws");
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

    bet(amount: COINS) {
        this.balance -= amount
        this.locked += amount
        this.ws.send(JSON.stringify({type: 'bet', amount, balance: this.balance, locked: this.locked}))
    }
}