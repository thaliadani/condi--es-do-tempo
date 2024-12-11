// https://api.openweathermap.org/data/2.5/weather?q=Belo%20Horizonte&lang=pt_br&units=metric&appid=e8e2511e8fba822dabdc17679383a4e7

// https://openweathermap.org/img/wn/02d@2x.png

const form = document.querySelector('.formulario');
const procurarLocalizacao: HTMLInputElement | null = document.querySelector('#localizacao');

const sectionInfo = document.querySelector('.info');


form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    if(!procurarLocalizacao || !sectionInfo) return;

    const localizacao = procurarLocalizacao.value;

    if(localizacao.length < 3){
        alert('Localização inválida');
        return;
    }

    try{
        const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&lang=pt_br&units=metric&appid=e8e2511e8fba822dabdc17679383a4e7`)
        const dados = await resposta.json();

        const infos ={
            temperatura: Math.round(dados.main.temp),
            local : dados.name,
            icone : `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`
        }

        sectionInfo.innerHTML = `
            <div class="local-temp">
                <h2 class="local">${infos.local}</h2>
                <span class="temp">${infos.temperatura}ºC</span>
            </div>
            <figure class="icone-clima">
                <img src="${infos.icone}" alt="clima">
            </figure>
        `

    }catch(error){
        console.log('Deu um erro na obtenção dos dados da API', error)
    }
});