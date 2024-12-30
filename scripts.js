const cta = document.querySelector('.js-submit-button');

cta.addEventListener('click', () => {
    validateEmailInput();
});

window.addEventListener('keydown', () => {
    buttonDown(event);
});

function buttonDown(event) {
    if (event.key === 'Enter') {
        validateEmailInput();
    }
}

function validateEmailInput() {
    const label = document.querySelector('.input-label');

    const inputElement = document.querySelector('.js-email-input');
    const inputValue = inputElement.value.trim();

    label.querySelectorAll('.error').forEach(msg => msg.remove());

    const cardContainer = document.querySelector('.card');
    cardContainer.innerHTML = '';

    if (inputValue && inputValue.endsWith('@gmail.com')) {
        const container = document.createElement('div');
        container.classList.add('success-card');
        container.innerHTML = ''; 
        
        container.innerHTML = 
            `
                <img class="icon-success" src="assets/images/icon-success.svg" alt="icon-success">

                <div>
                    <h1 class="success-header">
                        Thanks for subscribing!
                    </h1>

                    <p class="success-desc">
                        A confirmation email has been sent to <strong>${inputValue}</strong>.
                        Please open it and click the button inside to confirm your subscription.
                    </p>
                </div>

                <button class="dismiss-button">
                    Dismiss message
                </button>
            `;

        cardContainer.appendChild(container); 
        document.querySelector('main').style.display = 'none';  
        
        dismissSuccessCard(inputElement, container);   
        inputElement.classList.remove('active-error');
    } else {        
        //const errorText = document.createElement('p');
        //errorText.classList.add('error');

        if (inputValue === '') {
            displayError(label, 'Field cannot be empty');
            inputElement.classList.add('active-error');
            
        } else {
            displayError(label, 'Valid email required');
            inputElement.classList.add('active-error');
        }
        //label.appendChild(errorMessage);
    }
}

function displayError(label, message) {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('error');
    errorMessage.textContent = message;
    label.appendChild(errorMessage);
}

function dismissSuccessCard(inputElement, container) {
    const dismissCta = container.querySelector('.dismiss-button');

    dismissCta.addEventListener('click', () => {

            inputElement.value = '';
            document.querySelector('main').style.display = 'block';
            container.remove();
        
    });
}

const imageBg = document.querySelector('.header-image');

function resizeWindow() {
    // Use window.innerWidth instead of window.width
    if (window.innerWidth <= 600) {
        // Add check to ensure image element exists
        if (imageBg) {
            imageBg.src = 'assets/images/illustration-sign-up-mobile.svg';
            //console.log('Changed to mobile background');
        }
    } else {
        if (imageBg) {
            imageBg.src = 'assets/images/illustration-sign-up-desktop.svg';
            //console.log('Changed to desktop background');
        }
    }
}

// Check if image element exists before adding event listener
if (imageBg) {
    // Run on initial load
    resizeWindow();
    
    // Add debounced resize listener to prevent excessive function calls
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resizeWindow, 250); // Wait 250ms after last resize event
    });
} else {
    console.error('Background image element not found');
}

/*
// Optional: Add load event listener to ensure image loads properly
imageBg?.addEventListener('load', () => {
    console.log('Background image loaded successfully');
});

// Optional: Add error handling for image loading
imageBg?.addEventListener('error', () => {
    console.error('Failed to load background image');
});*/