// Elementos do DOM
const btnMenos = document.getElementById('btn-menos');
const btnMais = document.getElementById('btn-mais');
const tamanhoTxt = document.getElementById('tamanho-txt');
const senhaGerada = document.getElementById('senha-gerada');
const tempoTxt = document.getElementById('tempo-txt');
const barraForca = document.getElementById('barra-forca');

const chkMaiusculas = document.getElementById('chk-maiusculas');
const chkMinusculas = document.getElementById('chk-minusculas');
const chkNumeros = document.getElementById('chk-numeros');
const chkSimbolos = document.getElementById('chk-simbolos');

// Dicionários de caracteres
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
const numeros = '0123456789';
const simbolos = '!@#$%^&*()_+-=[]{}|;:,.<>?';

let tamanhoSenha = 12;

// Funções de evento para aumentar e diminuir o tamanho
btnMenos.addEventListener('click', () => {
    if (tamanhoSenha > 4) {
        tamanhoSenha--;
        atualizarInterface();
    }
});

btnMais.addEventListener('click', () => {
    if (tamanhoSenha < 30) {
        tamanhoSenha++;
        atualizarInterface();
    }
});

// Ouvir alterações nas opções
[chkMaiusculas, chkMinusculas, chkNumeros, chkSimbolos].forEach(checkbox => {
    checkbox.addEventListener('change', atualizarInterface);
});

// Função principal que atualiza a senha e os status
function atualizarInterface() {
    tamanhoTxt.textContent = tamanhoSenha;
    
    const senha = gerarSenha(tamanhoSenha);
    senhaGerada.textContent = senha;
    
    calcularForcaETempo(senha);
}

// Lógica de geração aleatória
function gerarSenha(tamanho) {
    let caracteresPermitidos = '';
    if (chkMaiusculas.checked) caracteresPermitidos += letrasMaiusculas;
    if (chkMinusculas.checked) caracteresPermitidos += letrasMinusculas;
    if (chkNumeros.checked) caracteresPermitidos += numeros;
    if (chkSimbolos.checked) caracteresPermitidos += simbolos;

    if (caracteresPermitidos === '') {
        return 'Selecione uma opção';
    }

    let resultado = '';
    for (let i = 0; i < tamanho; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
        resultado += caracteresPermitidos.charAt(indiceAleatorio);
    }
    return resultado;
}

// Simulação matemática de força e estimativa de dias baseada no tamanho e tipos de caracteres
function calcularForcaETempo(senha) {
    if (senha === 'Selecione uma opção') {
        barraForca.className = '';
        tempoTxt.textContent = 'Escolha as opções de caracteres.';
        return;
    }

    let tiposEscolhidos = 0;
    if (chkMaiusculas.checked) tiposEscolhidos++;
    if (chkMinusculas.checked) tiposEscolhidos++;
    if (chkNumeros.checked) tiposEscolhidos++;
    if (chkSimbolos.checked) tiposEscolhidos++;

    // Classificação visual de força de forma simplificada
    if (senha.length < 8 || tiposEscolhidos <= 1) {
        barraForca.className = 'fraca';
    } else if (senha.length >= 8 && senha.length < 12 && tiposEscolhidos >= 2) {
        barraForca.className = 'media';
    } else if (senha.length >= 12 && tiposEscolhidos >= 3) {
        barraForca.className = 'forte';
    } else {
        barraForca.className = 'media';
    }

    // Cálculo representativo dos dias mostrados na tela da atividade
    let baseVariedade = tiposEscolhidos * 15;
    let estimativaDias = Math.floor(Math.pow(senha.length, 3) * baseVariedade * 0.4);
    
    if(estimativaDias === 0) estimativaDias = 1;

    tempoTxt.textContent = `Um computador pode levar até ${estimativaDias} dias para descobrir essa senha.`;
}

// Inicializa o gerador assim que a página carrega
atualizarInterface();
