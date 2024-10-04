import TodoCard from "./TodoCard";

function TodoList(props){

    const {todo = []} = props;
    const deleteTodo = props.onDelete;
    const editTodo = props.onEdit;

    return (
        <div>

        {todo.map((

            todos, todoIndex

        ) => {

            return (

                <TodoCard key={todoIndex} 
                    
                    onDelete = {
                    
                        () => deleteTodo(todoIndex) 
                    }

                    onEdit = {
                    
                        (editingTodo) => editTodo(todoIndex, editingTodo) 
                    }

                    >
                        {todos}

                    
                </TodoCard>
                
            )
            }

        )}
    </div>
    );
}

export default TodoList