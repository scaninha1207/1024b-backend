// let x = 10

// let nome:string = "ana"
// let numero:number = 12
// let vetor:number[] = [1,2,3,4,5,6]

// let nomes:string[] = ["ana","elisa"]

// console.log(nome)


// let bol:boolean = true;

// bol = false 

// const variavel:any = "oi"

// const a:undefined = undefined;


// const obj:{id:number,nome:string,idade:number} ={
//     id : 1,
//     nome : "Ana",
//     idade: 31
// }
// type Pessoa = {id:number,nome:string,idade:number}

// const p:Pessoa ={
//     id:10,
//     nome:"blaakjsdlk",
//     idade: 45
// }


// obj.nome = "Elisa"

// //obj = {
//   //  id : 2,
//   //  nome : "Ana",
//     //idade: 31
// //}


// const ksksk = [0,1,2,3,4]
// ksksk [0] = 10
// //ksksk = [0,1,2,3,4]

// let asdf =[0,1,2,3,4]
// asdf = [0,1,2,3,4] 


// let outraletra: number| string = 10;
// outraletra = "Ana" 


// //Funções em JavaScript/typrscript
// const f =  (variavel:number):number=>10
      
// const f3 = f(10)

// console.log(`O valor de x é ${f3}`)


// //Terminem essa função para retornar a some de todos os elementeos de um vetor
// //somaVetor([1,2,3]) => 6
// //somaVetor([1,2,3,4]) => 10
// // function somaVetor(vetor:number[]){
// //     let soma = 0
// //     for (let i = 0; i < vetor.length; i++) {
// //         const element = vetor[i];
// //         soma = soma + element!
// //     }
// // }
// // console.log(` O valor da soma do vetor é ${somaVetor([1,2,3,4])}`)
// //-some as posições de um vetor que são pares
// // function somaVetorPar(vetor:number[]){
// //     let soma = 0
    
// //     for (let i = 0; i < vetor.length; i++) {
// //       const element = vetor[i];

// //       if (element!%2 === 0) {
// //               soma+= element!;
            
// //         }
// //     }
// //       return soma
// // }
// // console.log(` O valor da soma do vetor é ${somaVetorPar([1,2,3,4])}`)






// //Faça uma função qeu receba 2 vetores e faça a operação de merge entre eles 
// //Ex; mergeVetor([1,2,3],[4,5,6] => [1,2,3,4,5,6])
// function mesclarVetor(v1:number[], v2:number[]){
//     return v1.concat(v2)

// }
// console.log(mesclarVetor([1,2,3],[4,5,6]))





















//PROMISSES
//síncronas e assíncronas
//Paralelismo -> paralelo.


// console.log("Inicio da execução do código")
// //async function funcao(){}
//  const funcao = async() =>{
//   const prom = 
//   new Promise<string>((resolve,reject)=>{
//     setTimeout(()=> reject("Executei a função"),0)
//   })
//   return prom 
     
// }
// try{
//   const resultado = await funcao()
// }
// catch(erro){
//   console.log("Minha mensagem de erro:"+erro)
// }

// // const resultado = await funcao()
// // console.log(resultado)

// // funcao()
// // .then((resultado) =>console.log(resultado))
// // .catch((erro)=>console.log("Erro Promise:"+ erro))
// // console.log(funcao())
// console.log("Fim da execução do código")


// //Crie uma função que tenha 50% de chance de retornar "tere" após 
// // 5 segundos ou a função devolve o valor null
//function devolveTere()
// //E faça o tratamento de erro com o try catch.
//  function devolveTere(){
//  const prom = 
//  new Promise<string>((resolve,reject)=>{
//    Math.random()>=0.5{};
//   })
// }
  

// // }



//Funções de Vetores
//FIND
const vetor = [1,2,3,4,5,6,7]
//Procurar -> find
//Ele procura oq que nós mandarmos.
// console.log(vetor.find((num:number)=>num==3))



//FILTER
const pessoas = [{id:1, nome:"tere"},{id:2,nome:"MArcelo"}]
console.log(pessoas.filter((p)=>p.id>=1))

//MAP
//Também vamos passar uma função em cada elemento do vetor
//E criar um novo vetor transformado pela função 

function tranforma(x:number) {
    return x+2
    
}
const r = vetor.map(tranforma)
console.log(r)





//SPREAD
const vetor2 = [...vetor,8,9]
console.log(vetor2)
