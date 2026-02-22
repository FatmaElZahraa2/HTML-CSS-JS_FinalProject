async function FillTheSlider() {
    try {
        const response = await fetch('https://dummyjson.com/products?limit=200');
        const data = await response.json();
        const allProducts = data.products;
        const uniqueCategories = [];
        const fashionCategories = [
            "mens-shirts",
            "womens-tops",
            "mens-shoes",
            "mens-watches",
            "womens-dresses",
            "womens-shoes",
            "womens-watches",
            "womens-bags",
            "womens-jewellery",
            "sunglasses",
            "fragrances",
            "skin-care"
        ];
        const seen = new Set();

        allProducts.forEach(product => {
            if (!seen.has(product.category) && fashionCategories.includes(product.category)) {
                console.log(product.category)
                seen.add(product.category);
                uniqueCategories.push(product);
            }
        });
        uniqueCategories.sort(() => Math.random() - 0.5);
        const wrapper = document.getElementById('category-list');
        wrapper.innerHTML = "";

        uniqueCategories.forEach(item => {
            wrapper.innerHTML +=`
      <div class="swiper-slide">
        <div class="cat-card">
          <div class="image-holder">
            <img src="${item.thumbnail}" alt="${item.category}">
          </div>
          <p class="CategoryName">${item.category.replace('-', ' ')}</p>
        </div>
      </div>
    `})


        new Swiper(".categorySwiper", {
            slidesPerView: 2,
            spaceBetween: 20,
            navigation: {
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
            },
            breakpoints: {
                640: { slidesPerView: 3 },
                1024: { slidesPerView: 6 }
            }
        })

    } catch (error) {
        console.error("Error loading categories:", error);
    }
}

FillTheSlider();
localStorage.setItem("ChosenProduuctID", 83)


const LinkButtons = document.querySelectorAll(".BtnLink")
LinkButtons.forEach(btn=>{
    btn.addEventListener('click',()=>{
        LinkButtons.forEach(b=>b.classList.remove('active'))
        btn.classList.add('active')
    })
})

