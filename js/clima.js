async function buscarClima() {
    let municipio = document.getElementById('cidade');
    let condic = document.getElementById('condicao');
    let temp = document.getElementById('temperatura');
    let umidad = document.getElementById('umidade');
    let cidade = "";
    let estado = "";
    let latitude = "";
    let longitude = "";
    try {
        // Buscar cidade e estado pelo CEP
        const cep = "17400080"
        const viaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dadosCep = await viaCep.json();
        cidade = dadosCep.localidade;
        estado = dadosCep.uf;
        municipio.innerText = `${cidade}/${estado}`;
        console.log(dadosCep);
    } catch (error) {
        console.log(`Erro ao buscar CEP ${error}`);
        return;
    }
    try {
        // Buscar cidade e estado pelo CEP
        const dadosGeolocalizacao = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${cidade},${estado}&key=13b2d43a7b5c4fbc91d48d18af0b3d48`);
        const dadosGeo = await dadosGeolocalizacao.json();
        //console.log(dadosGeo.results[0].geometry);
        latitude = dadosGeo.results[0].geometry.lat;
        longitude = dadosGeo.results[0].geometry.lng;
        console.log(`Latitude: ${latitude} Longitude: ${longitude}`);

    } catch (error) {
        console.log(`Erro ao buscar Geolocalização: ${error}`);
        return;
    }
   try {
        const chaveOpenWeather = 'b577e17ecf11d47f90408bc5eb1e192d';  // Substitua pela sua chave da OpenWeatherMap
        const dadosClimas = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=${chaveOpenWeather}`);
        const dadosClima = await dadosClimas.json();
        const condicao = dadosClima.weather[0].description;
        const umidade = dadosClima.main.humidity;
        const temperatura = dadosClima.main.temp;
        condic.innerText = `Condição: ${condicao}`;
        temp.innerText = `Temperatura: ${temperatura} °`;
        umidad.innerText = `Umidade: ${umidade} %`;

    } catch (error) {
        console.log(`Erro ao buscar Geolocalização: ${error}`);
        return;
    }

}
buscarClima();
