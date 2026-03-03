let x = 10

let nome:string = "ana"
let numero:number = 12
let vetor:number[] = [1,2,3,4,5,6]

let nomes:string[] = ["ana","elisa"]

console.log(nome)


let bol:boolean = true;

bol = false 

const variavel:any = "oi"

const a:undefined = undefined;


const obj:{id:number,nome:string,idade:number} ={
    id : 1,
    nome : "Ana",
    idade: 31
}
type Pessoa = {id:number,nome:string,idade:number}

const p:Pessoa ={
    id:10,
    nome:"blaakjsdlk",
    idade: 45
}


obj.nome = "Elisa"

//obj = {
  //  id : 2,
  //  nome : "Ana",
    //idade: 31
//}


const ksksk = [0,1,2,3,4]
ksksk [0] = 10
//ksksk = [0,1,2,3,4]

let asdf =[0,1,2,3,4]
asdf = [0,1,2,3,4] 


let outraletra: number| string = 10;
outraletra = "Ana" 


//Funções em JavaScript/typrscript
const f = function (variavel:number):number{      //Função Implicita
   return 10
}

const f3 = f(10)


console.log(`O valor de x é ${f3}`)
console.log("O valor de x é"+f3.toString())