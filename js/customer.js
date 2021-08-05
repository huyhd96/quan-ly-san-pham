// let customers = [{
//     "address": "Nguyễn Văn A",
//     "address": "ngõ 195 Trần Cung, Cổ Nhuế, Hà Nội",
//     "telephoneNumber": '0966123456',
//     "birthday": '13 / 08 / 1992',
// }, ]

function createData() {
    if (localStorage.getItem('dataOder') == null) {
        return oders = [{
            "address": "Nguyễn Văn A",
            "address": "ngõ 195 Trần Cung, Cổ Nhuế, Hà Nội",
            "telephoneNumber": '0966123456',
            "birthday": '13 / 08 / 1992',
        }, ]
    } else {
        a = localStorage.getItem('dataOder')
        oders = JSON.parse(a)
    }
}
createData()

function createTable() {
    let html = '';
    for (let i = 0; i < oders.length; i++) {
        html += '<tr>';
        html += '<td>'
        html += oders[i].address
        html += '</td>'
        html += '<td>'
        html += oders[i].address
        html += '</td>'
        html += '<td>'
        html += oders[i].telephoneNumber
        html += '</td>'
        html += '<td>'
        html += oders[i].birthday
        html += '</td>'
        html += '<td><button onclick="editItem(' + i + ')" id="edit">Edit</button></td>'
        html += '</tr>';

        document.getElementById('customers').innerHTML = html;
    }
}

function search() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagaddress("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagaddress("td")[1];
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
    index = localStorage.getItem('id1')
    customer = document.getElementById('customer').value
    address = document.getElementById('address').value
    telephoneNumber = document.getElementById('telephoneNumber').value
    birthday = document.getElementById('birthday').value
    let newData = {
        "customer": customer,
        "address": address,
        "retail_price": telephoneNumber,
        "birthday": birthday,
        "name": oders[index].name,
        "price": oders[index].price,
        "quantily": oders[index].amount,
        "import_date": oders[index].import_date,
        "status": oders[index].status,
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
    document.getElementById('telephoneNumber').value = item.retail_price
    document.getElementById('birthday').value = item.birthday
    localStorage.setItem('id1', index)
}
createTable()