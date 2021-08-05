function createData() {
    if (localStorage.getItem('data') == null) {
        return warehouses = [{
            'code': '0123',
            'name': 'Samsung S7',
            'retail_price': 15000000,
            'quantily': 0
        }]
    } else {
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
        html += formatter.format(warehouses[i].retail_price)
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
        html += '<td><button onclick="editItem(' + i + ')" id="edit">Edit</button></td>'
        html += '</tr>';

        document.getElementById('products').innerHTML = html;
    }
}

function search() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("");
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

function submit() {
    index = localStorage.getItem('id')
    code = document.getElementById('code').value
    name = document.getElementById('name').value
    price2 = document.getElementById('price2').value
    quantily = document.getElementById('quantily').value
    console.log(index)
    let newData = {
        "code": code,
        "name": name,
        "retail_price": price2,
        "quantily": quantily,
        'amount': warehouses[index].amount,
        'import_date': warehouses[index].import_date,
        'import_price': warehouses[index].import_price
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
    document.getElementById('price2').value = item.retail_price
    document.getElementById('quantily').value = item.quantily
    localStorage.setItem('id', index)
}
createTable()