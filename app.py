import ast
import operator
import os
import re

from flask import Flask, flash, get_flashed_messages, redirect, render_template, request, url_for


DEVELOPMENT_SECRET_KEY = "dev-secret-key-change-me"
DEBUG_MODE = os.environ.get("FLASK_DEBUG", "0") == "1"

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", DEVELOPMENT_SECRET_KEY)

ALLOWED_OPERATORS = {
    ast.Add: operator.add,
    ast.Sub: operator.sub,
    ast.Mult: operator.mul,
    ast.Div: operator.truediv,
    ast.USub: operator.neg,
}


def evaluate_expression(expression):
    """Safely evaluate a simple math expression."""
    try:
        expression = prepare_expression(expression)
        tree = ast.parse(expression, mode="eval")
        return _evaluate_node(tree.body)
    except ZeroDivisionError:
        return "Error: Cannot divide by zero."
    except (SyntaxError, TypeError, ValueError):
        return "Error: Please enter a valid math expression."


def prepare_expression(expression):
    """Convert calculator symbols into Python-friendly math."""
    expression = expression.replace("×", "*").replace("÷", "/")
    expression = re.sub(r"(\d+(?:\.\d+)?)%", r"(\1 / 100)", expression)
    return expression


def _evaluate_node(node):
    if isinstance(node, ast.Constant) and isinstance(node.value, (int, float)):
        return node.value

    if isinstance(node, ast.BinOp) and type(node.op) in ALLOWED_OPERATORS:
        left = _evaluate_node(node.left)
        right = _evaluate_node(node.right)
        return ALLOWED_OPERATORS[type(node.op)](left, right)

    if isinstance(node, ast.UnaryOp) and type(node.op) in ALLOWED_OPERATORS:
        operand = _evaluate_node(node.operand)
        return ALLOWED_OPERATORS[type(node.op)](operand)

    raise ValueError("Unsupported expression")


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        expression = request.form.get("expression", "").strip()
        if expression:
            flash(evaluate_expression(expression))
        else:
            flash("Error: Please enter an expression.")
        return redirect(url_for("index"))

    messages = get_flashed_messages()
    result = messages[0] if messages else None
    return render_template("index.html", result=result)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
