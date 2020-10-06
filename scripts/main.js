const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator-keys");
const display = calculator.querySelector(".calculator-display");

keys.addEventListener('click', event => {
  if(!event.target.closest("button")) return
    
    const key = event.target;
    const keyValue = key.textContent;
    const displayValue = display.textContent;
    const { type } = key.dataset;
    const { previousKeyType } = calculator.dataset; 
    if(type == "numero"){
        if(displayValue === "0"){
            display.textContent = keyValue;
        }else if(previousKeyType == "operador"){
            display.textContent = keyValue;
        }
        else{
            display.textContent = displayValue + keyValue;
        }
    }

    if(type == "operador"){
        const keysOperador = keys.querySelectorAll("[data-type = 'operador']");
        //console.log(keysOperador);
        keysOperador.forEach(el => el.dataset.state = "");
        key.dataset.state="selecionado";

        calculator.dataset.primeiraParte = displayValue;
        calculator.dataset.operador = keyValue;
    }

    if(type == "igual"){
        //fazer cálculo
        const primeiraParte = calculator.dataset.primeiraParte;
        const operador = calculator.dataset.operador;
        const segundaParte = displayValue;

        let resultado = '';
        if(operador == "+"){
            resultado = parseInt(primeiraParte)  + parseInt(segundaParte);
        }else if(operador == "-"){
            resultado = parseInt(primeiraParte) - parseInt(segundaParte);
        }else if(operador == "x"){
            resultado = parseInt(primeiraParte) * parseInt(segundaParte);
        }else if(operador == "/"){
            resultado = parseInt(primeiraParte) / parseInt(segundaParte);
        }
        
        display.textContent = resultado;
        console.log(primeiraParte, operador, segundaParte);
    }

    if(type == "limpa"){
        display.textContent = 0;
    }

    calculator.dataset.previousKeyType = type
    
    


})
