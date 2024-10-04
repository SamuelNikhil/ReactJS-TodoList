import { useState } from "react"
import TodoList from "./TodoList";

function TodoInput(){

    const [todo, setTodo] = useState([
                                        "Hello !"
                                    ]);

    const [newTodo, setNewTodo] = useState("");

    function handleTodoList(newTodo){

        const newTodoList = [
            ...todo, newTodo
        ]
        setTodo(newTodoList);
        setNewTodo("");
    }

    function deleteTodo (indexToDelete){

        const updatedTodos = todo.filter((_, index) => index !== indexToDelete);
        
        setTodo(updatedTodos);
    }

    function enterTodo(e){

        if(e.key === 'Enter'){

            handleTodoList(newTodo);
        }
    }

    function editTodo(todoIndex, editingTodo) {   
        
        const updatedTodos = todo.map((item, Index) =>
            
            Index ===  todoIndex ? editingTodo : item // Fix: Replace the matched todo with editedTodo
        );
        setTodo(updatedTodos)

        console.log(updatedTodos)
    }

    return(
        <header>

            <input type="text" value={newTodo} 
            
                onKeyDown ={enterTodo} 
                    
                    onChange={(e) => {

                    setNewTodo(e.target.value);
                }
            } placeholder="Enter to add" />

            <button onClick={() => {

                handleTodoList(newTodo);
                } 
            }>Add</button>

            <TodoList 
            
                    todo={todo} 
                    onDelete={deleteTodo} 
                    onEdit = {editTodo}
            />

        </header>
    );
}

export default TodoInput