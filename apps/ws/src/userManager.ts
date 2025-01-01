
    import { WebSocket } from "ws"
    import { outgoingMessage } from "./types"
    import { User } from "./User"
    let ID = 1

    export class UserManager {
        private _users: User[] = []
        private static _instance: UserManager

        private constructor() {

        }
        public static getInstance() {
            if(!this._instance) {
                this._instance = new UserManager()
            }
            return this._instance
        }
        addUser(ws: WebSocket, name: string) {
            let id = ID
            this._users.push({ ws, name , id: ID++})

            ws.on('close', () => this.removeUser(id))
            ID++
        }

        removeUser(id: number) {
            this._users.filter(x => x.id !== id)
        }
        /*
        *Broadcast message to all users who are connected
        *if user id is provided, message will not be sent to that user
        */
        broadcast(message: outgoingMessage, userId?: number) {
            this._users.forEach(({ws, id}) => {
            if(userId !== id) {
                ws.send(JSON.stringify(message))
            }
            })
        }

    }