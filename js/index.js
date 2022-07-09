function getDanhSachSanPham(){

    var promise = axios({
        url:'http://svcy.myclass.vn/api/Product/GetAll',
        method:'GET'
    });

    promise.then(function(result){
        console.log(result.data);
        renderTableProduct(result.data,'tblProduct');
    })
}

function renderTableProduct (arrSP, idBody) {
    var htmlContent = '';
    for(var index = 0; index < arrSP.length; index ++){
        var sanPham = arrSP[index];
        htmlContent += `
            <tr>
                <td>${sanPham.id}</td>
                <td>${sanPham.name}</td>
                <td>${sanPham.price}</td>
                <td>${sanPham.img}</td>
                <td>${sanPham.description}</td>
                <td>${sanPham.type}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaSanPham">Xóa</button>
                    <button class="btn btn-primary" onclick="suaSanPham">Sửa</button>
                </td>
            </tr>
        `;
    }
    document.getElementById(idBody).innerHTML = htmlContent;
}

function suaSanPham(){
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/GetById?id=' + maSPClick,
        method: 'GET'
    });
    promise.then(function(result) {
        console.log(result.data);
        var sanPham = result.data;
        document.getElementById('id').value = sanPham.id;
        document.getElementById('name').value = sanPham.name;
        document.getElementById('price').value = sanPham.price;
        document.getElementById('img').value = sanPham.img;
        document.getElementById('description').value = sanPham.description;
        document.getElementById('type').value = sanPham.type;
    });
    promise.catch(function (err) {
        console.log('err', err);

    })
}

document.getElementById('btnUpdate').onclick = function(){
    var sanPhamCapNhat = new SanPham();
    sanPhamCapNhat.id = document.querySelector('#id').value;
    sanPhamCapNhat.name = document.querySelector('#name').value;
    sanPhamCapNhat.price = document.querySelector('#price').value;
    sanPhamCapNhat.img = document.querySelector('#img').value;
    sanPhamCapNhat.description = document.querySelector('#description').value;
    sanPhamCapNhat.type = document.querySelector('#type').value;

    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/UpdateProduct?id=' + sanPhamCapNhat.id,
        method: 'PUT',
        data: sanPhamCapNhat
    });

    promise.then(function (result) {
        console.log(result);
        getDanhSachSanPham();
    })

    promise.catch(function (error) {
        console.log(error)
    })
}

function xoaSanPham(maSPClick) {

    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/DeleteProduct?id=' + maSPClick,
        method: 'DELETE'
    });

    promise.then(function (result) {
        console.log(result.data);
        //Load lại table khi thành công
        getDanhSachSanPham();
    })

    promise.catch(function (err) {
        console.log(err)
    })
}

document.getElementById('btnCreate').onclick = async function(){
    var sanPham = new SanPham();
    sanPham.id = document.getElementById('id').value;
    sanPham.name = document.getElementById('name').value;
    sanPham.price = document.getElementById('price').value;
    sanPham.img = document.getElementById('img').value;
    sanPham.description = document.getElementById('description').value;
    sanPham.type = document.getElementById('type').value;
    console.log(sanPham);

    document.querySelector('.loading').style.display = 'block';
    var mess = '';
    try{
        var result = await axios({
            url:'http://svcy.myclass.vn/api/Product/CreateProduct',
            method: 'POST',
            data: sanPham
        });
        mess = result.data;
        getDanhSachSanPham();
    }
    catch (err) {
        alert(err.response?.data);
    }
    setTimeout(function () {
        document.querySelector('.loading').style.display = 'none';
    }, 1000)
}

window.onload = function() {
    getDanhSachSanPham();
}