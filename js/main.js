var productName = document.getElementById("productname")
var productPrice = document.getElementById("productprice")
var productCategory = document.getElementById("productcat")
var productDesc = document.getElementById("productdesc")
var productImage = document.getElementById("productImage")
var productList = []
var addbtn = document.getElementById("addbtn")
var updatebtn = document.getElementById("updatebtn")
var currentIndex;
if(localStorage.getItem("productList") != null){
    productList = JSON.parse(localStorage.getItem("productList"));
    displayproduct(productList)
}








function addproduct() {
    var product = {
    name:productName.value,
    price:productPrice.value,
    category:productCategory.value,
    desc:productDesc.value,
    image:`images/${productImage.files[0]?.name}`,
}
productList.push(product);
updateLocalStorage()
displayproduct(productList)
updateInputValue()
    console.log("hello",productList);
    

}



function displayproduct(list) {
var cartona = '';
for (var i=0;i<list.length;i++){
cartona += `<div class="col-md-4">
    <div class="item text-white border border-danger rounded-3 overflow-hidden">
        <img src="${list[i].image}" class="w-100 mb-3" alt="product img">
        <div class="p-3">
            <h2 class="h4">Names : ${list[i].name}</h2>
            <p>Price : ${list[i].price}</p>
            <h3 class="h5">Category : ${list[i].category}</h3>
            <h3 class="h5">Description : ${list[i].desc}</h3>
            <button onclick="getDataToUpdate(${i})" class="btn btn-outline-warning w-100 mb-3">Update</button>
            <button onclick="deleteproduct(${i})" class="btn btn-outline-danger w-100" >Delete</button>
        </div>
    </div>
</div>`
}
document.getElementById("mydata").innerHTML = cartona
}





function deleteproduct(index){
    productList.splice(index,1);
    console.log(productList);
    updateLocalStorage()
    displayproduct(productList)
}
function updateInputValue(config) {
    productName.value = config ? config.name : null;
productPrice.value = config ? config.price : null;
productCategory.value = config ? config.category : null;
productDesc.value = config ? config.desc : null;
// productImage.value = config ? config.image : null;
}

function getDataToUpdate(index) {
    updateInputValue(productList[index])
    currentIndex = index

    addbtn.classList.add('d-none')
    updatebtn.classList.remove('d-none')

}

function updateproduct() {
productList[currentIndex].name = productName.value;
productList[currentIndex].price = productPrice.value;
productList[currentIndex].category = productCategory.value;
productList[currentIndex].desc = productDesc.value;
displayproduct(productList);

updatebtn.classList.add("d-none")
addbtn.classList.remove("d-none")
updateLocalStorage()
updateInputValue()
}

function updateLocalStorage(){
    localStorage.setItem("productList", JSON.stringify(productList))
}



function search(searchValue){
    var searchItem = []
for (var i=0; i< productList.length; i++){
    var item = productList[i];
    if(item.name.includes(searchValue)){
       
        searchItem.push(item)
    }
}
    displayproduct(searchItem)
}



function validateProductInput(element){
    var regex= {
        productname: /^[A-Za-z0-9]{5,8}$/,
        productprice: /^([1-9][0-9]|100)$/,
        productdesc: /.{10}/,
        productcat: /(TV|Mobile|laptop|screens|others)/i
    }
    if(regex[element.id].test(element.value) == true) {
   element.nextElementSibling.classList.add('d-none')
    element.classList.add("is-valid")
    element.classList.remove("is-invalid")
        
    }else{
        element.nextElementSibling.classList.remove('d-none')
        element.classList.remove("is-valid")
        element.classList.add("is-invalid")
       
    }
    
}