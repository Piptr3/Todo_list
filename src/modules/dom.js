export function loadUI() {
        const leftPanel = document.getElementById("left-panel");
        const rightPanel = document.getElementById("right-panel");

        const listContainer = document.createElement('div');
        listContainer.classList.add('container');
        listContainer.classList.add('list-container');

        const todoContainer = document.createElement('div');
        todoContainer.classList.add('container');
        todoContainer.classList.add('todo-container');

        const topText = document.createElement('p');
        topText.textContent = "My Lists";

        const bottomText = document.createElement('p');
        bottomText.textContent = "My Todos";
        
        leftPanel.appendChild(topText);
        leftPanel.appendChild(listContainer);

        leftPanel.appendChild(bottomText);
        leftPanel.appendChild(todoContainer);

        const liveScreen = document.createElement('div');
        liveScreen.classList.add('live-screen');
        
        const rpText = document.createElement('p');
        rpText.textContent = "To Do";

        rightPanel.appendChild(rpText);
        rightPanel.appendChild(liveScreen);
};

export function renderLists(lists) {
        const listContainer = document.querySelector('.list-container');
        listContainer.innerHTML = "";
        
        lists.forEach((list, index) => {
                const listElement = document.createElement('div');
                listElement.classList.add('list');
                listElement.textContent = list.name;
                listElement.dataset.index = index;

                listElement.addEventListener('click', () => renderTodos(lists[index], lists));

                listContainer.append(listElement);
        });
}

export function renderTodos(list, lists) {
        const todoContainer = document.querySelector('.todo-container');
        todoContainer.innerHTML = "";
        
        list.todos.forEach((todo, index) => {
                const todoElement = document.createElement('div');
                todoElement.classList.add('todo');
                todoElement.textContent = todo.title;
                todoElement.dataset.index = index;

                todoElement.addEventListener('click', () => displayTodoDetails(todo, lists));

                todoContainer.append(todoElement);
        });
}

function displayTodoDetails(todo, lists) {
        const detailsContainer = document.querySelector(".live-screen");
        detailsContainer.innerHTML = `
            <h2>${todo.title}</h2>
            <p><strong>Description:</strong> ${todo.description}</p>
            <p><strong>Due Date:</strong> ${todo.dueDate}</p>
            <p><strong>Priority:</strong> ${todo.priority}</p>
        `;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete Todo";
        deleteButton.classList.add("delete-button");

        deleteButton.addEventListener("click", () => {
                deleteTodo(todo, lists);
        });

        detailsContainer.appendChild(deleteButton);
}

function deleteTodo(todo, lists) {
        for (let list of lists) {
            const todoIndex = list.todos.indexOf(todo);
            if (todoIndex !== -1) {
                list.todos.splice(todoIndex, 1);
                renderTodos(list, lists); 
            }
        }
    }