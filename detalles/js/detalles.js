window.onload = () => {
    const PRICE_100ML = 16.00;
    const PRICE_50ML = 15.00;
    let currentSizePrice = PRICE_100ML;
    
    let quantityInput = document.getElementById('quantity');
    let currentPriceSpan = document.querySelector('.price .current');
    let reviewsContainer = document.getElementById('reviews-container');

    const updateTotalPrice = () => {
        let quantity = parseInt(quantityInput.value) || 1;
        let discount = 0;
        
        if (quantity > 10) {
            discount = 0.20;
        } else if (quantity > 5) {
            discount = 0.10;
        }

        let subtotal = currentSizePrice * quantity;
        let finalPrice = subtotal * (1 - discount);
        
        currentPriceSpan.textContent = `$${finalPrice.toFixed(2)}`;
    };


    let imgGaleria = document.querySelector("#main-product-img");
    let imgs = document.querySelectorAll(".thumb");
    

    if (imgs.length > 0) {
        imgGaleria.src = imgs[0].src.replace("thumbs/", ""); 
        imgs[0].classList.add('active'); 
    }
    
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener('click', (evt) => {
            imgGaleria.src = evt.target.src.replace("thumbs/", ""); 
            
            imgs.forEach(item=>{
                item.classList.remove('active')
            })
            evt.target.classList.add('active')
        })
    }
    

    let sizeBtns = document.querySelectorAll(".size-btn");
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', (evt)=>{
            sizeBtns.forEach(b => b.classList.remove('active'));
            evt.target.classList.add('active');

            const selectedSize = evt.target.textContent.trim();
            if (selectedSize === '50ml') {
                currentSizePrice = PRICE_50ML;
            } else {
                currentSizePrice = PRICE_100ML;
            }
            updateTotalPrice();
        });
    });


    updateTotalPrice();

    document.getElementById('decrease').addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
            updateTotalPrice();
        }
    });

    document.getElementById('increase').addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
        updateTotalPrice();
    });
    
    document.getElementById('quantity').addEventListener('change', function() {
        let currentValue = parseInt(this.value);
        if (isNaN(currentValue) || currentValue < 1) {
            this.value = 1;
        }
        updateTotalPrice();
    });



    const getReviews = () => {
        let reviews = localStorage.getItem('productReviews');
        return reviews ? JSON.parse(reviews) : [];
    };

    const saveReviews = (reviews) => {
        localStorage.setItem('productReviews', JSON.stringify(reviews));
    };

    const renderReview = (review) => {
        let reviewElement = document.createElement('div');
        reviewElement.classList.add('review-item'); 
        
        let fullStars = '⭐️'.repeat(Math.floor(review.rating)); 
        let halfStar = (review.rating % 1 !== 0) ? '½' : '';
        let emptyStars = '☆'.repeat(5 - Math.ceil(review.rating));

        reviewElement.innerHTML = `
            <div style="border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 15px;">
                <h4 style="margin: 0; display: inline-block;">${review.name || 'Anónimo'}</h4> 
                <span style="float: right; font-size: 0.9em; color: #666;">${new Date().toLocaleDateString()}</span>
                <div class="review-rating" style="color: gold; margin: 5px 0;">${fullStars}${halfStar}${emptyStars}</div>
                <p class="review-text">${review.text}</p>
            </div>
        `;
        reviewsContainer.prepend(reviewElement);
    };

    const loadAndRenderReviews = () => {
        let reviews = getReviews();
        reviews.reverse().forEach(renderReview);

        let formHtml = `
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px dashed #ccc;">
                <h3>Añadir un Comentario</h3>
                <input type="text" id="review-name" placeholder="Tu Nombre" style="width: 100%; padding: 8px; margin-bottom: 10px;">
                <textarea id="review-text" placeholder="Escribe tu reseña aquí..." style="width: 100%; padding: 8px; margin-bottom: 10px; height: 80px;"></textarea>
                <input type="number" id="review-rating" placeholder="Calificación (1-5)" min="1" max="5" step="0.5" style="width: 100%; padding: 8px; margin-bottom: 10px;">
                <button id="submit-review" style="padding: 10px 20px; background-color: #333; color: white; border: none; cursor: pointer;">Enviar Reseña</button>
            </div>
        `;
        reviewsContainer.insertAdjacentHTML('beforeend', formHtml);
        
        document.getElementById('submit-review').addEventListener('click', () => {
            let name = document.getElementById('review-name').value;
            let text = document.getElementById('review-text').value;
            let rating = parseFloat(document.getElementById('review-rating').value);

            if (text && rating >= 1 && rating <= 5) {
                let newReview = { name, text, rating };
                let allReviews = getReviews();
                allReviews.push(newReview);
                saveReviews(allReviews);
                
                renderReview(newReview);
                document.getElementById('review-name').value = '';
                document.getElementById('review-text').value = '';
                document.getElementById('review-rating').value = '';
                alert("Reseña agregada con éxito!");
            } else {
                alert("Por favor, completa el texto y la calificación (1-5).");
            }
        });
    };
    loadAndRenderReviews();


    
    let randomRating = Math.random() * (5 - 1) + 1; 
    let roundedRating = Math.round(randomRating * 2) / 2;

    let starsHtml = '';
    let fullStarsCount = Math.floor(roundedRating);
    let hasHalfStar = roundedRating % 1 !== 0;

    for (let i = 0; i < fullStarsCount; i++) {
        starsHtml += '⭐️';
    }
    if (hasHalfStar) {
        starsHtml += '½';
    }
    
    console.log(`Punto 5: Valor aleatorio (1-5): ${roundedRating.toFixed(1)}`);
    console.log(`Punto 5: Estrellas: ${starsHtml}`);
};