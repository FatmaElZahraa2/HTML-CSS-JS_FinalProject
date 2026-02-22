async function ShowProductDetails() {

    try {
        const productID = localStorage.getItem("ChosenProduuctID")
        const APIresponse = await fetch(`https://dummyjson.com/products/${productID}`)
        const product = await APIresponse.json();
        console.log(product)
        const wrapper = document.getElementById('Productwrapper')
        const rate = Math.ceil(product.rating);
        let starinHtml = ""
        for (let i = 1; i <= 5; i++) {
            if (i <= rate) {
                starinHtml += '<i class="fa-solid fa-star RatingStars"></i>';
            } else {
                starinHtml += '<i class="fa-regular fa-star RatingStars" style="color: #ddd;"></i>';
            }
        }

        const isAvailable = product.availabilityStatus === "In Stock"; 
        wrapper.innerHTML = `

            

            <div class="col-lg-6 col-md-6 col-12 mb-4">
                <div class="bg-light p-4 text-center" style="border-radius:30px;">
                    <img style="max-height:450px; object-fit: contain;" class="img-fluid w-100" src="${product.thumbnail}" alt="${product.title}">
                </div>
            </div>

            <div class="col-lg-6 col-md-4 col-12 my-1">

                <h2>${product.title}</h2>
                <div class="mb-3 d-flex align-items-center">
                    <div class="me-2">${starinHtml}</div>
                    <span class="text-secondary small">(${Math.ceil(product.rating)} Rating)</span>
                </div>

                <p>Brands: <span style="color: #00797a;">${product.brand}</span></p>
                <hr>
                <div>
                    <span class="fs-3 fw-bold" style="color: #00797a;">$${product.price}</span>
                    <span class="text-muted text-decoration-line-through ms-2">$${(product.price / (1 - product.discountPercentage / 100)).toFixed(1)}</span>
                    <span class="badge bg-danger ms-2">${product.discountPercentage}% OFF</span>
                </>
                <hr>
                <p class="text-muted" style="line-height:1.5">${product.description}</p>

                <ul class="list-unstyled mb-4" style="color: #707979;">

                    <li><i class="fa-solid fa-repeat me-2"></i> ${product.returnPolicy}</li>
                    <li><i class="fa-solid fa-credit-card me-2"></i> Cash on Delivery available</li>
                     <li><i class="fa-solid fa-truck-fast me-2"></i> ${product.shippingInformation}</li>
                </ul>
                <div class="Size-Buttons row mb-4 d-flex align-items-center">
                    <strong class="col-1 fs-5 fw-medium">Size</strong><br>
                    <div class="col-11 ">
                        <button class="sizebtn ">M</button>
                        <button class="sizebtn ">L</button>
                        <button class="sizebtn ">XL</button>
                        <button class="sizebtn ">XXL</button>
                    </div>
                </div>
                <div class="d-flex align-items-center gap-3">
                    <input type="number" id="ProductQuant" class=" form-control w-25" value="1" min="1">
                    
                    <button id="AddCartbtn" class="AddCartbtn btn px-4 fw-bold text-white"
                    style="background-color: #00797a;"
                    ${!isAvailable ? "disabled" : ""}
                    >Add to Cart</button>
                    <button class="HeatBtn btn btn-ou"><i class="fa-regular fa-heart"></i></button>
                </div>
            </div>
                 
                 `
        const addCartBtn = document.getElementById('AddCartbtn')
        const Productquantity = document.getElementById('ProductQuant')
        addCartBtn.addEventListener("click", () => {
            addToCart(product, parseInt(Productquantity.value));
        });


    } catch (err) {
        console.error("Error fetching product:", err);
        document.getElementById('Productwrapper').innerHTML = `<p class="text-danger text-center">Failed to load product details.</p>`;
    }

}

function addToCart(prdct , qunt) {
    let GetTheStringCart = localStorage.getItem("ShoppingCart")
    let ShopppingCart = JSON.parse(GetTheStringCart)||[];
    const ProductExistance = ShopppingCart.findIndex(p => p.id === prdct.id);
    if(ProductExistance == -1){
        
        ShopppingCart.push({
            id:prdct.id,
            title:prdct.title,
            img:prdct.thumbnail,
            descrip:prdct.description,
            price:prdct.price,
            quantity:qunt

        })
    }else{

        ShopppingCart[ProductExistance].quantity  = parseInt(ShopppingCart[ProductExistance].quantity) + parseInt(qunt);
    }
    const BackToString = JSON.stringify(ShopppingCart) 
    localStorage.setItem("ShoppingCart" , BackToString)
    alert(`${prdct.title} added to cart successfully !`)
}

ShowProductDetails()

console.log(localStorage.getItem("ShoppingCart"))






