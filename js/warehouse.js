// let warehouses = [{
//     "code": "0123",
//     "name": "Samsung S7",
//     "import_price": 8000000,
//     "retail_price": 15000000,
//     "quantily": 0,
//     "amount": 5,
//     "import_date": '22/07/2021',
// }, ]

function createData() {
    if (localStorage.getItem('data') == null) {
        console.log('a1')
        return warehouses = [{
            "code": "0123",
            "name": "Samsung S7",
            "import_price": 8000000,
            "retail_price": 15000000,
            "quantily": 0,
            "amount": 5,
            "import_date": "2021-02-10",
        }]
    } else {
        console.log('a2')
        a = localStorage.getItem('data')
        warehouses = JSON.parse(a)
    }
}
createData()
const formatter = new Intl.NumberFormat('vn-VN', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
})

function createTable() {
    let html = '';
    for (let i = 0; i < warehouses.length; i++) {
        html += '<tr>';
        html += '<td>'
        html += warehouses[i].code
        html += '</td>'
        html += '<td>'
        html += warehouses[i].name
        html += '</td>'
        html += '<td>'
        html += warehouses[i].import_date
        html += '</td>'
        html += '<td>'
        html += formatter.format(warehouses[i].import_price)
        html += '</td>'
        html += '<td>'
        html += warehouses[i].amount
        html += '</td>'
        html += '<td>'
        html += formatter.format(warehouses[i].import_price * warehouses[i].amount)
        html += '</td>'
        if (warehouses[i].quantily == 0) {
            html += '<td>'
            html += "<span class='span1'> Hết hàng</span>"
            html += '</td>'
        } else {
            html += '<td>'
            html += "<span class = 'span2'> Còn hàng</span>"
            html += '</td>'
        }
        html += '<td><button onclick="deleteItem(' + i + ')" id="delete">Delete</button></td>'
        html += '<td><button onclick="editItem(' + i + ')" id="edit">Edit</button></td>'
        html += '</tr>';

        document.getElementById('warehouse').innerHTML = html;
    }
}

function search() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("warehouse");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function showDialog() {
    document.getElementById('myDialog').show()
}

function save() {
    code = document.getElementById('code').value
    name = document.getElementById('name').value
    date = document.getElementById('date').value
    price1 = document.getElementById('price1').value
    price2 = document.getElementById('price2').value
    amount = document.getElementById('amount').value
    quantily = document.getElementById('quantily').value

    let newData = {
        "code": code,
        "name": name,
        "import_date": date,
        "retail_price": price1,
        "import_price": price2,
        "amount": amount,
        "quantily": quantily
    }
    warehouses.push(newData)
    x = JSON.stringify(warehouses)
    window.localStorage.setItem('data', x)
    data = window.localStorage.getItem('data')
    warehouses = JSON.parse(data)
    createTable()
    document.getElementById('myDialog').close()
}

function submit() {
    index = localStorage.getItem('id')
    code = document.getElementById('code').value
    name = document.getElementById('name').value
    import_date = document.getElementById('date').value
    import_price = document.getElementById('price1').value
    price2 = document.getElementById('price2').value
    amount = document.getElementById('amount').value
    quantily = document.getElementById('quantily').value
    console.log(index)
    let newData = {
        "code": code,
        "name": name,
        "retail_price": price2,
        "quantily": quantily,
        'amount': amount,
        'import_date': import_date,
        'import_price': import_price
    }
    warehouses.fill(newData, index, index + 1)
    x = JSON.stringify(warehouses)
    window.localStorage.setItem('data', x)
    createTable()
    document.getElementById('myDialog').close()
}

function cancel() {
    document.getElementById('myDialog').close()
}

function editItem(index) {
    showDialog()
    let item = warehouses[index]
    document.getElementById('code').value = item.code
    document.getElementById('name').value = item.name
    document.getElementById('date').value = item.import_date
    document.getElementById('price2').value = item.retail_price
    document.getElementById('price1').value = item.import_price
    document.getElementById('amount').value = item.amount
    document.getElementById('quantily').value = item.quantily
    document.getElementById('update').hidden = false;
    document.getElementById('save').hidden = true;
    localStorage.setItem('id', index)
}

function deleteItem(index) {
    if (confirm("Are you sure?")) {
        warehouses.splice(index, 1);
        x = JSON.stringify(warehouses)
        window.localStorage.setItem('data', x)
        createTable();
    }

}
createTable()