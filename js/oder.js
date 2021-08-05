// let oders = [{
//     "customer": "Nguyễn Văn A",
//     "address": "ngõ 195 Trần Cung, Cổ Nhuế, Hà Nội",
//     "telephoneNumber": '0966123456',
//     "birthday": "2021-02-10",
//     "name": "Samsung S7",
//     "price": 8000000,
//     "quantily": 1,
//     "import_date": "2021-02-10",
//     "status": 'Đã giao'
// }, ]

function createData() {
    if (localStorage.getItem('dataOder') == null) {
        console.log('a1')
        return oders = [{
            "customer": "Nguyễn Văn A",
            "address": "ngõ 195 Trần Cung, Cổ Nhuế, Hà Nội",
            "telephoneNumber": '0966123456',
            "birthday": "2021-02-10",
            "name": "Samsung S7",
            "price": 8000000,
            "quantily": 1,
            "import_date": '22/07/2021',
            "status": 'Đã giao'
        }, ]
    } else {
        console.log('a2')
        a = localStorage.getItem('dataOder')
        oders = JSON.parse(a)
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
    for (let i = 0; i < oders.length; i++) {
        html += '<tr>';
        html += '<td>'
        html += oders[i].customer
        html += '</td>'
        html += '<td>'
        html += oders[i].import_date
        html += '</td>'
        html += '<td>'
        html += oders[i].name
        html += '</td>'
        html += '<td>'
        html += formatter.format(oders[i].price)
        html += '</td>'
        html += '<td>'
        html += oders[i].quantily
        html += '</td>'
        html += '<td>'
        html += formatter.format(oders[i].price * oders[i].quantily)
        html += '</td>'
        if (oders[i].status == 'Đã giao') {
            html += '<td>'
            html += "<span class='span2'> Đã giao</span>"
            html += '</td>'
        } else {
            html += '<td>'
            html += "<span class = 'span1'> Đang giao</span>"
            html += '</td>'
        }
        html += '<td><button onclick="deleteItem(' + i + ')" id="delete">Delete</button></td>'
        html += '<td><button onclick="editItem(' + i + ')" id="edit">Edit</button></td>'
        html += '</tr>';

        document.getElementById('oders').innerHTML = html;
    }
}

function search() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
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

function save() {
    customer = document.getElementById('customer').value
    address = document.getElementById('address').value
    telephoneNumber = document.getElementById('telephone-number').value
    birthday = document.getElementById('birthday').value
    name = document.getElementById('name').value
    amount = document.getElementById('amount').value
    price = document.getElementById('price').value
    import_date = document.getElementById('import_date').value
    status = document.getElementById('status').value

    let newData = {
        "customer": customer,
        "address": address,
        "telephoneNumber": telephoneNumber,
        "birthday": birthday,
        "name": name,
        "price": price,
        "quantily": amount,
        "import_date": import_date,
        "status": status
    }
    oders.push(newData)
    x = JSON.stringify(oders)
    window.localStorage.setItem('dataOder', x)
    data = window.localStorage.getItem('dataOder')
    oders = JSON.parse(data)
    createTable()
    document.getElementById('myDialog').close()
}

function showDialog() {
    document.getElementById('myDialog').show()
}

function submit() {
    index = localStorage.getItem('id1')
    customer = document.getElementById('customer').value
    address = document.getElementById('address').value
    telephoneNumber = document.getElementById('telephone-number').value
    birthday = document.getElementById('birthday').value
    name = document.getElementById('name').value
    amount = document.getElementById('amount').value
    price = document.getElementById('price').value
    import_date = document.getElementById('import_date').value
    status = document.getElementById('status').value
    let newData = {
        "customer": customer,
        "address": address,
        "telephoneNumber": telephoneNumber,
        "birthday": birthday,
        "name": name,
        "price": price,
        "quantily": amount,
        "import_date": import_date,
        "status": status
    }
    oders.fill(newData, index, index + 1)
    x = JSON.stringify(oders)
    window.localStorage.setItem('dataOder', x)
    createTable()
    document.getElementById('myDialog').close()
}

function cancel() {
    document.getElementById('myDialog').close()
}

function editItem(index) {
    showDialog()
    let item = oders[index]
    document.getElementById('customer').value = item.customer
    document.getElementById('address').value = item.address
    document.getElementById('telephone-number').value = item.telephoneNumber
    document.getElementById('birthday').value = item.birthday
    document.getElementById('name').valuer = item.name
    document.getElementById('amount').value = item.quantily
    document.getElementById('price').value = item.price
    document.getElementById('import_date').value = item.import_date
    document.getElementById('status').value = item.status
    localStorage.setItem('id1', index)
}

function deleteItem(index) {
    if (confirm("Are you sure?")) {
        oders.splice(index, 1);
        x = JSON.stringify(oders)
        window.localStorage.setItem('dataOder', x)
        createTable();
    }

}
createTable()