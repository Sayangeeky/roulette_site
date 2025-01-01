import { Bet, BetNumber, GameState } from "./types";
import { UserManager } from "@repo/common/types";

export class GameManager {
    bets: Bet[]
    state: GameState = GameState["game-over"]
    private constructor() {}
    private _lastWinner: BetNumber = BetNumber.One

    private static _instance: GameManager
    public static getInstance() {
        if(!this._instance) {
            this._instance = new GameManager()
        }
        return this._instance
    }

    public bet(amount: number, betNumber: BetNumber, id: number) {
        if(this.state === GameState["people-can-bet"]) {
            // Use betNumber as a value, not the enum type
            this.bets.push({id, amount, number: betNumber});
            return true;
        }
        return false;
    }
    
    public start() {
        this.state = GameState["people-cant-bet"]
    }

    public end(output: BetNumber) {
        this._lastWinner = output
        this.bets.forEach(bet => {
            if(bet.number === output) {
                UserManager.getInstance().won(bet.id, bet.amount, output)
            }   else {
                UserManager.getInstance().lost(bet.id, bet.amount)
            }
        })
    }
}