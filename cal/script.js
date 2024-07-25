document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            const action = button.getAttribute('data-action');

            if (action === 'clear') {
                clearDisplay();
            } else if (action === 'delete') {
                deleteLastChar();
            } else if (action === 'calculate') {
                calculateResult();
            } else if (value) {
                handleInput(value);
            }
        });
    });

    function clearDisplay() {
        currentInput = '';
        previousInput = '';
        operator = '';
        updateDisplay();
    }

    function deleteLastChar() {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }

    function calculateResult() {
        if (operator && previousInput !== '' && currentInput !== '') {
            const a = parseFloat(previousInput);
            const b = parseFloat(currentInput);

            let result;
            if (operator === '+') {
                result = a + b;
            } else if (operator === '-') {
                result = a - b;
            } else if (operator === '*') {
                result = a * b;
            } else if (operator === '/') {
                result = a / b;
            }

            currentInput = result.toString();
            operator = '';
            previousInput = '';
            updateDisplay();
        }
    }

    function handleInput(value) {
        if (['+', '-', '*', '/'].includes(value)) {
            if (operator && currentInput) {
                calculateResult();
            }
            operator = value;
            previousInput = currentInput;
            currentInput = '';
        } else {
            currentInput += value;
        }
        updateDisplay();
    }

    function updateDisplay() {
        display.textContent = currentInput || '0';
    }
});
