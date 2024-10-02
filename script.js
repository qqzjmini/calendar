document.addEventListener('DOMContentLoaded', () => {
    const currentMonthElement = document.getElementById('currentMonth');
    const daysElement = document.getElementById('days');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const todoElement = document.getElementById('todo');
    const selectedDateElement = document.getElementById('selectedDate');
    const todoInput = document.getElementById('todoInput');
    const saveTodoButton = document.getElementById('saveTodo');

    let currentDate = new Date();
    let selectedDate = null;
    let todos = {};

    const renderCalendar = () => {
        currentMonthElement.textContent = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

        daysElement.innerHTML = '';

        for (let i = 0; i < startOfMonth; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('empty-day');
            daysElement.appendChild(emptyDay);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.classList.add('day');
            day.textContent = i;

            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
            if (date.toDateString() === new Date().toDateString()) {
                day.classList.add('today');
            }

            if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
                day.classList.add('selected');
            }

            day.addEventListener('click', () => {
                selectedDate = date;
                renderCalendar();
                renderTodo();
            });

            daysElement.appendChild(day);
        }
    };

    const renderTodo = () => {
        if (selectedDate) {
            selectedDateElement.textContent = selectedDate.toLocaleDateString('en-US');
            todoInput.value = todos[selectedDate.toDateString()] || '';
            todoElement.style.display = 'block';
        } else {
            todoElement.style.display = 'none';
        }
    };

    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    saveTodoButton.addEventListener('click', () => {
        if (selectedDate) {
            todos[selectedDate.toDateString()] = todoInput.value;
            alert('Todo saved!');
        }
    });

    renderCalendar();
    renderTodo();
});