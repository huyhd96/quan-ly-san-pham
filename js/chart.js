// if (localStorage.getItem('data') == null || localStorage.getItem('dataOder') == null) {
//     yValues = []
// } else {
//     a = localStorage.getItem('data')
//     for (i = 0; i < a.length; i ++){
//     }
// }
var xValues = ["Nhập kho", "Bán", "Tồn Kho"];
var yValues = [20, 49, 51];
var barColors = [
    "#b91d47",
    "#00aba9",
    "#2b5797",
];

new Chart("myChart", {
    type: "doughnut",
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: barColors,
            data: yValues
        }]
    },
    options: {
        title: {
            display: true,
            text: "Lượng nhập kho,  lượng bán và tồn kho"
        }
    }
});