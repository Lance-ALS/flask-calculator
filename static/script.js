const form = document.querySelector("#calculator-form");
const expression = document.querySelector("#expression");
const resultDisplay = document.querySelector("#result-display");
const buttons = document.querySelectorAll(".calculator-button");
const allowedKeys = "0123456789+-*/().%";

function resetResult() {
    resultDisplay.innerHTML = `
        <span class="result-label">Result</span>
        <span class="result-placeholder">Enter an expression below, then press =.</span>
    `;
}

expression.addEventListener("input", resetResult);

function addToExpression(value) {
    expression.value += value;
    resetResult();
    expression.focus();
}

function clearExpression() {
    expression.value = "";
    resetResult();
    expression.focus();
}

function deleteLastCharacter() {
    expression.value = expression.value.slice(0, -1);
    resetResult();
    expression.focus();
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;
        const action = button.dataset.action;

        if (action === "clear") {
            clearExpression();
            return;
        }

        if (action === "backspace") {
            deleteLastCharacter();
            return;
        }

        if (action === "equals") {
            form.submit();
            return;
        }

        addToExpression(value);
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        form.submit();
        return;
    }

    if (event.key === "Backspace") {
        event.preventDefault();
        deleteLastCharacter();
        return;
    }

    if (event.key === "Escape") {
        event.preventDefault();
        clearExpression();
        return;
    }

    if (allowedKeys.includes(event.key)) {
        event.preventDefault();
        addToExpression(event.key);
    }
});
