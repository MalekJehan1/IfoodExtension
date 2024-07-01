const interval = setInterval(() => {
    const headerbutton = document.getElementsByClassName('Flex-sc-rrnf8w-0 sc-bLHCGa dGHDvZ cMIVsi')[0]
    veButton = document.getElementsByClassName('CopyButton')
    if (headerbutton) {
        if (veButton.length < 1) {
            console.log('oi')
            createButton(headerbutton)
        }

    }

}, 1000);

function createButton(headerbutton) {
    const button = document.createElement("button")
    button.innerHTML = "Copiar informaçõoes"
    button.classList.add("CopyButton")


    button.addEventListener("click", () => {

        // Cria um elemento de input para colocar o texto
        text = start();
        console.log(text)

        const textarea = document.createElement('textarea');
        textarea.value = text;

        // O textarea precisa estar visível na página para que document.execCommand('copy') funcione corretamente
        textarea.style.position = 'fixed';
        textarea.style.opacity = 0;

        // Anexa o elemento input ao documento
        document.body.appendChild(textarea);

        // Seleciona o texto dentro do input
        textarea.select();

        // Copia o texto selecionado para a área de transferência
        document.execCommand('copy');

        // Remove o elemento input
        document.body.removeChild(textarea);

        mostrarAlertaPersonalizado("Informações copiadas!", 3000)

    })

    headerbutton.appendChild(button)
}

function mostrarAlertaPersonalizado(mensagem, tempoExibicao) {
    // Criar elemento de alerta
    var alerta = document.createElement('div');
    alerta.classList.add('alerta-personalizado');
    alerta.textContent = mensagem;

    // Adicionar alerta ao corpo do documento
    document.body.appendChild(alerta);

    // Remover alerta após o tempo especificado
    setTimeout(function () {
        alerta.remove();
    }, tempoExibicao);
}

function start() {
    let text = "";
    // Remove o ponto (.) do nome da classe
    //const divElements = document.getElementsByClassName('Flex-sc-rrnf8w-0 sc-zmges jvRBXt grTgpo');
    const divElements = document.getElementsByClassName('BaseText-sc-1a1327l-0 defZLu sc-erUUZj ccVjle');
    let nome = document.getElementsByClassName('BaseHeading-sc-x85g2i-0 fOfEBN sc-dfzyxB iIFvKc')[0].textContent
    let nPedido = remChars(document.getElementsByClassName('BaseText-sc-1a1327l-0 fFTMEZ sc-kZkypy fyfdQI')[0].textContent)
    const divTotal = document.getElementsByClassName('Summary__total')[0]


    text += nPedido + '\n'
    text += "Nome: " + nome + '\n'
    text += "Valor: R$ " + totalPrice(divTotal) + '\n'
    text += "Tipo de Pagamento: " + tipoPagamento(divTotal) + '\n'
    // Verifica se algum elemento foi encontrado
    if (divElements.length > 0) {

        text += getEndereco(divElements)


    } else {
        console.log('Elemento <div> não encontrado.');
    }

    return text
}


function tipoPagamento(divTotal) {
    return divTotal.getElementsByClassName('InlineItem')[0].textContent
}

function totalPrice(divTotal) {
    let total = divTotal.getElementsByClassName('SectionItem__postitle')[0].textContent
    total = total.substring(total.indexOf('R$') + 3)
    return total
}

function remChars(str) {
    // Define a expressão regular para caracteres que não são letras, números ou espaços
    //const regex = /[^a-zA-Z0-9\s]/g;
    const regexPonto = new RegExp("●", 'g')
    // Remove os caracteres especiais da string usando replace
    let txt = str.replace(regexPonto, '')
    // Organiza os espaços em branco (substitui múltiplos espaços por um único espaço)
    return txt.replace(/\s+/g, ' ');
}


function getEndereco(divElements) {
    // Seleciona o primeiro elemento da coleção
    const divElement = divElements[0];

    // Seleciona todos os elementos dentro da div
    const childElements = divElement.querySelectorAll('*');

    const end = childElements[0].textContent.split("●")

    let text = ""
    text += "Endereço: " + end[0] + end[1] + '\n'
    text += "Referência:" + end[2] + '\n'
    text += "Complemento:" + end[3] + '\n'

    return (text)

}

