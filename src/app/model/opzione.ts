import { Sondaggio } from "./sondaggio";

export class Opzione {
    id!:number;
    sondaggio!:Sondaggio;
    descrizione!:string;
    count!: number;
    isAlreadyScelta: boolean = false;
}