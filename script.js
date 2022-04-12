const currencyFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
    roundingIncrement: 5
});

function currency(n) {
    return currencyFormat.format(n);
};

function expenseRecord(name = "", amount = 0) {
    return {
        name: name,
        amount: amount
    };
}

function expenseElement(record = {}, index = 0) {
    return `
        <div class="expense-item" data-index="${index}">
            <button onclick="onRemoveExpense(this)">Remove</button>
            ${record.name}
            ${currency(record.amount)}
        </div>
    `
}

let expenseRecordList = [];

function getTotal() {
    return expenseRecordList.reduce((c, i) => i.amount + c, 0);
}

function updateTotal(e) {
    e.innerHTML = currency(getTotal());
}

function renderExpenseList(listElement) {
    listElement.innerHTML = expenseRecordList.map(expenseElement).join("");
}

function onAddExpense(e) {
    try {
        const parentElement = e.closest(".expense-content");
        const nameElement = parentElement.querySelectorAll(".name")[0];
        const amountElement = parentElement.querySelectorAll(".amount")[0];
        const amount = parseFloat(amountElement.value)
        const name = nameElement.value;

        if (name.length < 1 || isNaN(amount)) {
            return;
        }

        expenseRecordList.push(
            expenseRecord(
                name,
                amount
            )
        );

        nameElement.value = "";
        amountElement.value = "";
        nameElement.focus();

        renderExpenseList(
            parentElement.querySelectorAll(".expense-list")[0]
        );

        updateTotal(parentElement.querySelectorAll(".total")[0]);

    } catch (error) {
        console.error(error);
        return;
    }
}
function onRemoveExpense(e){
    try {
        const item = e.closest(".expense-item");
        const index = [...item.parentElement.children].indexOf(item);
        expenseRecordList.splice(index, 1);
        const root = item.closest(".expense-content");
        updateTotal(root.querySelectorAll(".total")[0]);
        item.remove();
    } catch (error) {
        console.error(error);
        return;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".name")[0].focus();
});