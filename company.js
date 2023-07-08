function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function getQueryParamValue(param){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
function fecthCompProfile(symbol) {
    const url =`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
}

document.getElementById('loading').style.display = 'block';

fetch(url).then((response) => {
    response.jason().then(data => {
        const {image, companyName, description, website } = data.profile;

    document.getElementById('comp-image').src = image;
    document.getElementById('comp-name').textContent = companyName;
    document.getElementById('comp-description').textContent = description;
    document.getElementById('comp-link').innerHTML = `<a href="${website}" target="_blank">${website}</a>`;

    document.getElementById('comp-details').style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
    })
    .finally(() => {
        document.getElementById('loading').style.display = 'none';
    })
});

const ctx = document.getElementById('stock-chart');

new Chart (ctx, {
    type:'bar',
    data: {
        labels: [endpoint ],
        datasets: [{
            label:'# of Votes', 
            data: [ ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
function fetchStockPriceHistory(symbol) {
    const url =`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`;
};

console.log(url)