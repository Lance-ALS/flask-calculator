# Flask Web Calculator

A beginner-friendly calculator web app built with Python and Flask.

The app lets you type or click a math expression, press `=`, and see the result in the browser.

## Features

- Clean calculator-style web page.
- Button grid for numbers, operators, parentheses, percent, clear, and backspace.
- Supports `+`, `-`, `*`, `/`, parentheses, decimals, and `%`.
- Friendly error messages for invalid expressions and division by zero.
- Uses the Post-Redirect-Get pattern so refreshing the page does not resubmit the form.
- Keeps the result area clean by resetting it when the expression changes.

## Project Structure

```text
flask_calculator/
  app.py
  requirements.txt
  README.md
  static/
    script.js
    styles.css
  templates/
    index.html
```

What each file does:

- `app.py` contains the Flask routes and calculator logic.
- `requirements.txt` lists the Python package needed to run the app.
- `templates/index.html` contains the page structure.
- `static/styles.css` contains the page styling.
- `static/script.js` contains the button behavior in the browser.

## Requirements

- Python 3
- Flask

## How to Run

First, open a terminal in this folder:

```bash
cd flask_calculator
```

Install Flask:

```bash
python3 -m pip install -r requirements.txt
```

Start the app:

```bash
python3 app.py
```

Open this address in your browser:

```text
http://127.0.0.1:5000
```

To stop the app, return to the terminal and press `Control + C`.

## Example Expressions

Try these in the calculator:

- `2 + 3`
- `(10 + 5) / 3`
- `7.5 * 4`
- `50%`

## Notes

This project is meant for learning. The expression evaluator only allows simple calculator math and avoids Python's unsafe `eval()` function.

For local learning, the app includes a default development secret key. If you deploy it publicly, set a real `SECRET_KEY` environment variable first.
