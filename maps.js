

function getLocalization(endereco) {

    let linkMaps = "https://www.google.com/maps/place/"

    endereco = endereco.split(' ').join('+')

    linkMaps += endereco

    console.log(linkMaps)

}
