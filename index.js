const formulary = document.getElementById('mortgage-form');

const amountInput = document.getElementById('amount');
const termInput = document.getElementById('term');
const interestInput = document.getElementById('interest');

const radiosButtons = document.getElementsByName('mortgageType');

const amountErrorText = document.getElementById('amount').parentElement.nextElementSibling;
const termErrorText = document.getElementById('term').parentElement.nextElementSibling;
const interestErrorText = document.getElementById('interest').parentElement.nextElementSibling;
const radiosErrorText = document.querySelector('fieldset').lastElementChild;

const currencyText = document.getElementById('amount').previousElementSibling;
const yearText = document.getElementById('term').parentElement.querySelector('span');
const percentageText = document.getElementById('interest').parentElement.querySelector('span');
if (!currencyText || !yearText || !percentageText) {
    console.error("Une unité (£, years, %) n'a pas été trouvée dans le DOM");
  }

const resultInitialContent = document.querySelectorAll('.results-initial');
const activeContent = document.getElementById('results-active');
const repayText = document.getElementById('repaysInfo');
const repayTotalText = document.getElementById('total-repay-info');

if (!activeContent) {
    console.log("L'élément #results-active n'a pas été trouvé dans le DOM");
}
if (!repayText) {
    console.log("L'élément #repaysInfo n'a pas été trouvé dans le DOM");
}
if (!repayTotalText) {
    console.log("L'élément #total-repay-info n'a pas été trouvé dans le DOM");
}
if (resultInitialContent.length === 0) {
    console.log("Aucun élément avec la classe .results-initial n'a été trouvé dans le DOM");
}


// clear event function
const clearButton = document.querySelector('a[role="button"]');
function handleClearFields(e) {
    e.preventDefault();

    amountInput.value = "";
    termInput.value = "";
    interestInput.value = "";

    for (const radio of radiosButtons) {
        radio.checked = false;
    }

    amountErrorText.classList.add("hidden");
    amountInput.classList.remove("border-red-500");
    currencyText.classList.remove("text-red-500");

    termErrorText.classList.add("hidden");
    termInput.classList.remove("border-red-500");
    yearText.classList.remove("text-red-500");

    interestErrorText.classList.add("hidden");
    interestInput.classList.remove("border-red-500");
    percentageText.classList.remove("text-red-500");

    radiosErrorText.classList.add("hidden");

    // Revenir à l'état initial des résultats
    activeContent.classList.add("hidden");
    resultInitialContent.forEach(element => {
        element.classList.remove("hidden");
    });
}
clearButton.addEventListener('click', handleClearFields);


//form validation logic 
formulary.addEventListener('submit', (e) => {
    e.preventDefault();

    let mortgageAmount = document.getElementById('amount').value;
    let termValue = document.getElementById('term').value;
    let interestValue = document.getElementById('interest').value;

    let isChecked = false;
    let isFormValid = true;

    if(!mortgageAmount || mortgageAmount <= 0) {
       
        amountErrorText.classList.remove("hidden");
        amountInput.classList.add("border-red-500");
        currencyText.classList.add("text-red-500");
        isFormValid = false;
    } else {
        amountErrorText.classList.add("hidden");
        amountInput.classList.remove("border-red-500");
        currencyText.classList.remove("text-red-500");
    }

    if(!termValue || termValue <= 0) {
        termErrorText.classList.remove("hidden");
        termInput.classList.add("border-red-500");
        yearText.classList.add("text-red-500");
        isFormValid = false;
    } else {
        termErrorText.classList.add("hidden");
        termInput.classList.remove("border-red-500");
        yearText.classList.remove("text-red-500");
    }

    if(!interestValue || interestValue <= 0) {
        interestErrorText.classList.remove("hidden");
        interestInput.classList.add("border-red-500");
        percentageText.classList.add("text-red-500");
        isFormValid = false;
    } else {
        interestErrorText.classList.add("hidden");
        interestInput.classList.remove("border-red-500");
        percentageText.classList.remove("text-red-500");
    }

    let type = "";
    for (const radio of radiosButtons) {
        if (radio.checked) { 
            isChecked = true; 
            type = radio.value;
        }
    }
    if(!isChecked) {
        radiosErrorText.classList.remove("hidden");
        isFormValid = false; 
    } else {
        radiosErrorText.classList.add("hidden");
    }

    if(isFormValid) {
        console.log('Hello Noob in CODE!');
       
            
            let amount = parseFloat(mortgageAmount);
            let term = parseFloat(termValue);
            let interest = parseFloat(interestValue);

            // Vérification pour éviter NaN
            if (isNaN(amount) || isNaN(term) || isNaN(interest)) {
                console.log("Erreur : une valeur est invalide", { amount, term, interest });
                return;
            }

            
            let monthlyPayment;
            let totalMonths = termValue * 12;
            let monthlyRate;
            let totalRepayment;
            
            if(type === "repayment") {
                monthlyRate = interestValue / 100 / 12;
                monthlyPayment = (amount * monthlyRate * (1 + monthlyRate) ** totalMonths) / ((1 + monthlyRate) ** totalMonths - 1)
            } else if (type === "interest-only") {
                monthlyPayment = (amount * (interestValue / 100)) / 12;
            }
             totalRepayment = monthlyPayment * totalMonths; 
        
            

             resultInitialContent.forEach(element => {element.classList.add("hidden")});

                activeContent.classList.remove("hidden");
                repayText.textContent = `£ ${monthlyPayment.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                repayTotalText.textContent = `£ ${totalRepayment.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
        activeContent.classList.add("hidden");
        resultInitialContent.forEach(element => {
            element.classList.remove("hidden")
        });
    }
})


