let display = document.querySelector('#display');
let buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener("click", () => {
        let value = button.getAttribute('data-value');

        if (value === 'C') {
            display.value = '';
        } else if (value === 'DEL') {
            display.value = display.value.slice(0, -1); // FIXED
        } else if (value === '=') {
            display.value = calculate(display.value);
        } else {
            display.value += value;
        }
    });
});

function calculate(expression) {
    try {
        let operators = ['+', '-', '*', '/'];
        let tokens = expression.split(/([\+\-\*\/])/).filter(token => token.trim() !== '');
        if (tokens.length < 3) {
            return "Error";
        }

        let result = parseFloat(tokens[0]);

        for (let i = 1; i < tokens.length; i += 2) {
            let operator = tokens[i];
            let nextNumber = parseFloat(tokens[i + 1]);

            if (isNaN(nextNumber)) {
                return "Error";
            }

            if (operator === '+') {
                result += nextNumber;
            } else if (operator === '-') {
                result -= nextNumber;
            } else if (operator === '*') {
                result *= nextNumber;
            } else if (operator === '/') {
                result = nextNumber !== 0 ? result / nextNumber : 'Error';
            }
        }
        return result;
    } catch {
        return 'Error';
    }
}
