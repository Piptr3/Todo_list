import "./styles.css";

function createTodo(title, description, dueDate, priority) {
    return {
        title,
        description,
        dueDate,
        priority,
        completed: false,
        toggleComplete() {
            this.completed = !this.completed;
        }
    };
}