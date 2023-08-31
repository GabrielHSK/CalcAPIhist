// const display = document.querySelector(".display");
// const buttons = document.querySelectorAll("button");
// const especialCaractere = ["%", "*", "/", "+", "-", "="];
// const maxCaractere = 12;
// let output = "";
// let historico = [];

// const calculate = (btnValor) => {
//     display.focus();
//     if (btnValor === "=" && output !== "") {
//         const result = eval(output.replace("%", "/100"));
//         historico.push({ conta: output, resultado: result });
//         output = result;
//     } else if(btnValor === "AC") {
//         output = "";
//     } else if (btnValor === "DEL") {
//         output = output.toString().slice(0, -1);
//     } else {
//       if (output === "" && especialCaractere.includes(btnValor)) return
//       output += btnValor;
//     }

//     if (output.length > maxCaractere) {
//         output = output.slice(0, maxCaractere);
//     }  
//     display.value = output;
// };

// document.addEventListener("keydown", (event) => {
//     const key = event.key; 

//     // Verifica se a tecla pressionada é um número, operador, tecla de igual, Enter ou Backspace
//     if (/[\d%/*\-+=]/.test(key) || key === "Enter" || key === "Backspace") {
//         event.preventDefault(); // Impede o comportamento padrão do evento de teclado

//         if (key === "Enter") {
//             calculate("=");
//         } else if (key === "Backspace") {
//             calculate("DEL");
//         } else {
//             calculate(key);
//         }
//         updateHistoricoTable();
//     }
// });

// const updateHistoricoTable = () => {
//     const historicoTable = document.querySelector("table");
//     historicoTable.innerHTML = `
//         <tr class="cabecalho">
//             <th class="data">DATA</th>
//             <th class="conta">CONTA</th>
//             <th class="res">RESULTADO</th>
//         </tr>
//         ${historico.map(item => `
//             <tr>
//                 <td class="data">${new Date().toLocaleString()}</td>
//                 <td class="conta">${item.conta}</td>
//                 <td class="resultado">${item.resultado}</td>
//             </tr>
//         `).join("")}
//     `;
// };

// buttons.forEach((button) => {
//     button.addEventListener("click", (e) => {
//         calculate(e.target.dataset.value);
//         updateHistoricoTable();
//     });
// });

class Calculator {
    display = document.querySelector(".display"); 
    buttons = document.querySelectorAll("button");
    especialCaractere = ["%", "*", "/", "+", "-", "="]; 
    maxCaractere = 15; 
    maxResultadoCaractere = 12; 
    output = ""; // Variável para armazenar a expressão sendo digitada
    historico = []; // Array para armazenar o histórico de cálculos

    inicioCalc() {
        this.addEventListeners(); 
    }

    calculate(btnValor) {
        this.display.focus();

        if (btnValor === "=" && this.output !== "") {

            let outputForEval = this.output.replace("%", "/100"); // Tratamento de porcentagem

            const result = eval(outputForEval); // Avalia a expressão

            this.historico.push({ conta: this.output, resultado: result }); // Adiciona ao histórico

            this.output = result.toString(); // Atualiza a saída com o resultado

        } else if (btnValor === "AC") {

            this.output = ""; // Limpa a expressão

        } else if (btnValor === "DEL") {

            this.output = this.output.toString().slice(0, -1);

        } else {

            if (this.output === "" && this.especialCaractere.includes(btnValor)) return;

            this.output += btnValor; // Adiciona o valor ao final da expressão
        }

        if (this.output.length > this.maxCaractere) {

            this.output = this.output.slice(0, this.maxCaractere); // Limita o máximo de caracteres
        }
        this.display.value = this.formatDisplay(this.output); // Atualiza a exibição no display

        this.updateHistoricoTable(); // Atualiza a tabela de histórico
    }

    updateHistoricoTable() {

        const historicoTable = document.querySelector("table");

        historicoTable.innerHTML = `
            <tr class="cabecalho">
                <th class="data">DATA</th>
                <th class="conta">CONTA</th>
                <th class="res">RESULTADO</th>
            </tr>
            ${this.historico.map(item => `
                <tr>
                    <td class="data">${new Date().toLocaleString()}</td>
                    <td class="conta">${item.conta}</td>
                    <td class="resultado">${this.formatResultado(item.resultado)}</td>
                </tr>
            `).join("")}
        `;
    }

    addEventListeners() {

        // Listeners de clique nos botões
        this.buttons.forEach(button => {
            button.addEventListener("click", (e) => {
                this.calculate(e.target.dataset.value);
            });
        });

        // Listener de eventos de teclado
        document.addEventListener("keydown", (event) => {

            const key = event.key;

            if (/[\d%/*\-+=]/.test(key) || key === "Enter" || key === "Backspace") {
                event.preventDefault();

                if (key === "Enter") {
                    this.calculate("=");
                } else if (key === "Backspace") {
                    this.calculate("DEL");
                } else {
                    this.calculate(key);
                }
            }
        });
    }

    // Formata a exibição no display
    formatDisplay(displayValue) {
        if (displayValue.endsWith("+")) {
            return displayValue.slice(0, -1) + " +";
        }
        return displayValue;
    }

    // Formata o resultado
    formatResultado(resultado) {
        const resultadoString = resultado.toString();
        if (resultadoString.length > this.maxResultadoCaractere) {
            return resultadoString.slice(0, this.maxResultadoCaractere) + "+";
        }
        return resultadoString;
    }
}

const calculator = new Calculator();
calculator.inicioCalc(); // Inicia a calculadora
