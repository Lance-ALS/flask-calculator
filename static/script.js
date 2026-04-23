const form = document.querySelector("#calculator-form");
const expression = document.querySelector("#expression");
const resultDisplay = document.querySelector("#result-display");
const buttons = document.querySelectorAll(".calculator-button");

function resetResult() {
    resultDisplay.innerHTML = `
        <span class="result-label">Result</span>
        <span class="result-placeholder">Enter an expression below, then press =.</span>
    `;
}

expression.addEventListener("input", resetResult);

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;
        const action = button.dataset.action;

        if (action === "clear") {
            expression.value = "";
            resetResult();
            expression.focus();
            return;
        }

        if (action === "backspace") {
            expression.value = expression.value.slice(0, -1);
            resetResult();
            expression.focus();
            return;
        }

        if (action === "equals") {
            form.submit();
            return;
        }

        expression.value += value;
        resetResult();
        expression.focus();
    });
});
