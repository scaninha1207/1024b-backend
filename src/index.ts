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







// //Lista de exercicios
// /**
//  * Exercício 01 - cria um novo vetor com os valores do vetor original mais dois novos valores
//  * Nome da função - criaNovoVetor
//  * Crie uma função que retorne um novo vetor com os valores do vetor original mais dois novos valores
//  * @param {number[]} vetor Vetor de números
//  * @param {number} valor1 Primeiro valor a ser adicionado
//  * @param {number} valor2 Segundo valor a ser adicionado
//  * @returns {number[]} Retorna um novo vetor com os valores do vetor original mais dois novos valores
//  * @example
//  * criaNovoVetor([1, 2, 3], 4, 5) // [1, 2, 3, 4, 5]
//  * criaNovoVetor([1, 2, 3], 0, 0) // [1, 2, 3, 0, 0]
//  */ 

// //Início do seu código
// function criaNovoVetor(vetor:number[],valor1:number,valor2:number){
// const novoVetor =  vetor.concat(valor1,valor2)
// return novoVetor

// }
//  console.log(criaNovoVetor([1, 2, 3], 0, 0))

// //Fim do seu código



// /**
//  * Exercício 02 - divisivelPor11
//  * Nome da função - divisivelPor11
//  * Crie uma função que retorna um array com os números divisíveis por 11 no intervalo
//  * @param {number} min Número mínimo
//  * @param {number} max Número máximo
//  * @returns {number[]} Retorna um array com os números divisíveis por 11 no intervalo
//  * @example
//  *  divisivelPor11(1, 100) // [11, 22, 33, 44, 55, 66, 77, 88, 99]
//  *  
//  * divisivelPor11(11, 110) // [11, 22, 33, 44, 55, 66, 77, 88, 99, 110]
//  */

// //Início do seu código
// function divisivelPor11 (min:number,max:number) {
//      let resultado:number[] = []
//     for (let i = min; i <= max; i++) {
       
//       if( i % 11 === 0){
//         resultado.push(i);
//       }
        
//     }
//     return resultado;

// }
// console.log(divisivelPor11(11, 110))
// //Fim do seu código



// /**
//  *  Exercício 03 - maioresDeIdade
//  * Nome da função - maioresDeIdade
//  * Crie uma função que retorna um array com os objetos com idade maior que 18
//  * @param {vetor:Pessoa[]} vetor Vetor de objetos com id, nome e idade
//  * @returns {Pessoa[]} Retorna um array com os objetos com idade maior que 18
//  * @example
//  * 
//  * const pessoa1 = {id: 1, nome: 'João', idade: 20}
//  * const pessoa2 = {id: 2, nome: 'Maria', idade: 18}
//  * const pessoa3 = {id: 3, nome: 'José', idade: 17}
//  * maioresDeIdade([pessoa1, pessoa2, pessoa3]) // [pessoa1, pessoa2]
//  */
// interface Pessoa{
//     id: number,
//     nome: string,
//     idade: number
// }

// //Início do seu código
// function maioresDeIdade(vetor:Pessoa[]) {

// }

//Fim do seu código



// /**
//  * Exercício 04 - resolve equação
//  * Nome da função - resolveEquacao
//  * Crie uma função que retorne os pontos em Y a partir de um vetor dos pontos em X da equação y = x^2 + 2x + 6
//  * @param {number[]} vetor Vetor de pontos em X
//  * @returns {number[]} Retorna um array com os pontos em Y
//  * @example
//  * resolveEquacao([1, 2, 3]) // [9, 14, 21]
//  */

// //Início do seu código


// //Fim do seu código


//lista 02 
/**
 * Exercício 01 - Calcular o quadrado de um número
 * Nome da função - calcularQuadrado
//  * Crie uma função que receba um número e retorne o seu valor elevado ao quadrado.
//  * @param {number} a Número a ser calculado
//  * @returns {number} Retorna o quadrado do número
//  * @example
 //  * calcularQuadrado(2) // 4
//  * calcularQuadrado(-3) // 9
//  */

// //Início do seu código
// function calcularQuadrado(a:number):number {

//   return a * a;
// }
// console.log(calcularQuadrado(-3))
// console.log(calcularQuadrado(-6))
// //Fim do seu código

// /**
//  * Exercício 02 - Verificar se um número é positivo
//  * Nome da função - ehPositivo
//  * Crie uma função que retorne verdadeiro se o número for maior que zero e falso caso contrário.
//  * @param {number} a Número a ser verificado
//  * @returns {boolean} Retorna true para positivos e false para negativos ou zero
//  * @example
//  * ehPositivo(2) // true
//  * ehPositivo(-3) // false
//  */

// //Início do seu código
// function ehPositivo(a:number) {
    
    
// }

 //Fim do seu código


//PROMISSES
//síncronas e assíncronas
//Paralelismo -> paralelo.


console.log("Inicio da execução do código")
//async function funcao(){}
 const funcao = async() =>{
  const prom = 
  new Promise<string>((resolve,reject)=>{
    setTimeout(()=> reject("Executei a função"),0)
  })
  return prom 
     
}
try{
  const resultado = await funcao()
}
catch(erro){
  console.log("Minha mensagem de erro:"+erro)
}

// const resultado = await funcao()
// console.log(resultado)

// funcao()
// .then((resultado) =>console.log(resultado))
// .catch((erro)=>console.log("Erro Promise:"+ erro))
// console.log(funcao())
console.log("Fim da execução do código")


//Crie uma função que tenha 50% de chance de retornar "tere" após 
// 5 segundos ou a função devolve o valor null
//function devolveTere()
//E faça o tratamento de erro com o try catch.
function devolveTere(){
   const prom = 
  new Promise<string>((resolve,reject)=>{
    Math.random()>=0.5{};
  })
  

}

