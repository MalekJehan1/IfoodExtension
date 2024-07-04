const interval = setInterval(() => {

    // Posicionando o botão na parte superior, ao lado dos botões de contato
    let headerbutton = document.getElementsByClassName('OrderDetails__content')[0]


    //um teste para verificar se a pagina foi carregada,
    //se a variavel "headerbutton" for diferente de undefinid, é pq a pagina carregou
    if (headerbutton) {
        headerbutton = headerbutton.firstChild
        headerbutton = headerbutton.firstChild
        //console.log('eae')
        //Criando o botão
        veButton = document.getElementsByClassName('CopyButton')
        //um teste para verificar se o botão foi criado, 
        //pois caso você saia da section de pedidos e volte
        //o botão sera criado novamente
        if (veButton.length < 1) {
            console.log('oi') // teste para verif. se está rodando kkk
            createButton(headerbutton) //cria o botão no local especif.
        }

    }
    console.log('ok')

}, 1000);

function createButton(headerbutton) {
    const button = document.createElement("button")
    button.innerHTML = "Copiar informaçõoes"
    button.classList.add("CopyButton")
    console.log('botao criado')

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

        clickAlert("Informações copiadas!", 3000)

    })

    headerbutton.appendChild(button)
}

function clickAlert(mensagem, tempoExibicao) {
    // Criar elemento de alerta
    var alerta = document.createElement('div');
    alerta.classList.add('clickAlertDiv');
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


    divOrderDetails = document.getElementsByClassName('OrderDetails__content')[0]
    const divTotal = document.getElementsByClassName('Summary__total')[0]
    divContact = document.getElementsByClassName('ContactButton__label')[0]

    text += "*`●●●● ♦ IFOOD ♦ ●●●●`*" + '\n'
    text += "*`● " + nPedido(divOrderDetails) + "`*" + '\n'
    text += "*`● Nome`*: " + nomeCliente(divOrderDetails) + '\n'
    text += "*`● Contato`*: " + contactPhone(divContact) + '\n'
    text += "*`● Valor`*: R$ " + totalPrice(divTotal) + '\n'
    text += "*`● Tipo de Pagamento`*: " + tipoPagamento(divTotal) + '\n'
    text += getEndereco(divOrderDetails)

    return text
}

function nomeCliente(divOrderDetails) {
    let pedido = divOrderDetails
    let x = 6
    for (let i = 0; i < x; i++) {
        pedido = pedido.firstChild
    }
    stringFormatada = pedido.textContent

    return capitalizeWords(stringFormatada)

}

function capitalizeWords(str) {
    return str.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}

function nPedido(divOrderDetails) {
    let pedido = divOrderDetails
    let x = 4
    for (let i = 0; i < x; i++) {
        pedido = pedido.firstChild
    }
    pedido = pedido.children[1]
    pedido = pedido.firstChild
    pedido = pedido.firstChild
    return pedido.textContent
}

function contactPhone(divContact) {

    numberContact = divContact.textContent

    numberContact = numberContact.substring(0, numberContact.indexOf('ID')) + numberContact.substring(numberContact.indexOf(':'))

    numberContact = numberContact.replaceAll(' ', '')
    numberContact = numberContact.replace(':', ';')

    return numberContact

}

function tipoPagamento(divTotal) {
    try {
        return divTotal.getElementsByClassName('InlineItem')[0].textContent
    } catch (Exception) {
        return divTotal.getElementsByClassName('SectionItem__label SectionItem__label--bold')[0].textContent
    }
}

function totalPrice(divTotal) {
    let total = divTotal.getElementsByClassName('SectionItem__postitle')[0].textContent
    total = total.substring(total.indexOf('R$') + 3)
    return total
}

function remChars(str) {

    // Define a expressão regular para caracteres que não são letras, números ou espaços
    const regexPonto = new RegExp("●", 'g')
    // Remove os caracteres especiais da string usando replace
    let txt = str.replace(regexPonto, ' ')
    // Organiza os espaços em branco (substitui múltiplos espaços por um único espaço)
    return txt.replace(/\s+/g, ' ');
}


function getEndereco(divOrderDetails) {

    let pedido = divOrderDetails
    //let pedido = divOrderDetails
    pedido = pedido.firstChild
    pedido = pedido.children[2]
    pedido = pedido.children[1]

    const childElements = pedido.querySelectorAll('*');
    const end = childElements[0].textContent.split("●")

    let text = ""
    text += "*`● Endereço`*: " + end[0] + end[1] + '\n'

    text += "*`● Referência`*:"
    if (end[2])
        text += end[2] + '\n'
    else text += "" + '\n'

    text += "*`● Complemento`*:"
    if (end[3])
        text += end[3] + '\n'
    else text += "" + '\n'

    return (text)

}

