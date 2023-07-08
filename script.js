const searchResults = document.getElementById('search-results')


    function debounce(func, delay) {
        let timeoutId;
        return function() {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(null, arguments);
            }, delay);
        };

    }
    function handleFormSubmit(event){
        event.preventDefault();
        const searchInput = document.getElementById('searchInput').value;
        updateInputStringParams(searchInput);
        searchStocks(searchInput);
    }
    function searchStocks(searchInput){
        const url =`https://stock-exchange-dot-full-stack-course-
        services.ew.r.appspot.com/api/v3/search?query=${searchInput}&limit=10&exchange=NASDAQ`;
        document.getElementById('loading').style.display = 'block';

    fetch (url).then((response) => {
        response.json().then(data => {

            const symbols = data.map(company => company.symbol);
            const symbolsString = symbols.join(',');

            const profileURL =`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbolsString}`
            const profilePromise = fetch(profileURL).then(response => response.json());

            const historyURL =`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbolsString}?serietype=line`
            const historyPromise = fetch(historyURL).then(response => response.json());

            Promise.all([profilePromise, historyPromise]).then(([profileData, historyData]) => {
            document.getElementById('loading').style.display = 'none';


        data.forEach(company => {
            const {name, symbol, image, changesPercentage } = company;
            const listItem = document.createElement('li');
            listItem.className = 'result-item';

            const compImage = document.createElement('img');
            compImage.className = 'comp-image';
            compImage.src = image;
            compImage.alt = `${name}Logo`;
            listItem.appendChild(compImage);

            const link = document.createElement('a');
            link.href = `/company.html?symbol=${symbol}`;
            link.textContent = `${name} (${symbol})`;

            listItem.appendChild(link);

            const stockChanges = document.createElement('span');
            stockChanges.className = `stock-changes ${changesPercentage < 0 ? 'negative' : '' }`;
            stockChanges.textContent = `%{changesPercentage}%`;
            listItem.appendChild(stockChanges);
        });
        })

        console.log('Company Profiles:', profileData);
        console.log('Stock Price History:', historyData);
    })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('loading').style.display = 'none';
        });
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('loading').style.display = 'none';
    })

    document.getElementById('search-form').addEventListener('submit', handleFormSubmit);

    const debouncedSearch = debounce((event) => {
        const searchInput = event.target.value;
        updateInputStringParams(searchInput);
        searchStocks(searchInput);
    }, 300);

    document.getElementById('searchInput').addEventListener('input', debouncedSearch);
    }

    function updateInputStringParams(searchInput) {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchInput', searchInput);
        window.history.replaceState({}, '', `${location.pathname}?${urlParams}`);
    }

function fetchStocks() {
    const url =`https://financialmodelingprep.com/api/v3/stock/real-time-price?apikey=YOUR_API_KEY`;
    fetch(url).then(response => response.json()).then(data => {
        const marqueeContent = document.getElementById('marquee-content');
        marqueeContent.innerHTML = '';

    data.forEach(stock => {
        const { symbol, price } = stock;
        const marqueeItem = document.createElement('span');
        marqueeItem.textContent = `${symbol}: $${price}`;
        marqueeContent.appendChild(marqueeItem);
    })
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
window.addEventListener('load', fetchStocks);