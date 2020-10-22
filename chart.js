const canvas = document.getElementById('chartOneContainer');
console.log(canvas);
// canvas.width  = 800;
// canvas.height  = 150;
const ctx = canvas.getContext("2d");


let chart_one = new Chart(ctx, {
    // The type of chart we want to create
    type: 'doughnut',

    // The data for our dataset
    data: {
        labels: ['Femelle', 'Mâle'],
        datasets: [{
            // label: 'My First dataset',
            backgroundColor: [
                'rgba(19, 58, 84, 1)',
                'rgba(67, 160, 184, 1)',
            ],
            borderColor: [
                'transparent', 
                'transparent'
            ],
            data: [44, 56],
        }]
    },

    options: {
        
        maintainAspectRatio : false,
        responsive: false,
        aspectRatio : 1,
        cutoutPercentage: 90,
        title: {
            display: true,
            text: 'Genre des spécimens',
            fontFamily: "'Oyko', arial, sans-serif", 
            fontColor: '#FFF',
            fontSize: '18',
        },
        legend: {
            labels: {
                fontFamily: "'Oyko', arial, sans-serif", 
                fontColor: '#FFF',
            }
        }
        
    }
});

