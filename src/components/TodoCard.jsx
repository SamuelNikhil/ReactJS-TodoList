import React,{useState} from 'react' ;

function TodoCard(props) {
    
    const {children} = props;
    
    const [isEditTodo, setisEditTodo] = useState(false);
    const [editingTodo, setEditedTodo] = useState(children);

    function deleteTodo() {

        if (props.onDelete) {

            props.onDelete(); // Trigger the onDelete function passed from the parent
        }
    }

    function handleEdit(e){

        setisEditTodo(true);
    }

    function isEditing(e){

        if(isEditTodo){

            e.target.style.display = "none";
        }

    }

    function handleSaveEdit(e){

        if(e.key === "Enter"){

            props.onEdit(editingTodo);
            setisEditTodo(false);
        }
    }

    return (
    
    <li className='todoItem' >

        {  isEditTodo ? (
                <input
                    type="text"
                    value={editingTodo}
                    onChange={
                        
                        (e) => setEditedTodo(e.target.value)
                    }
    
                    onKeyDown={handleSaveEdit} // Save on Enter
                />
            ) : (
                <p>{children}</p>
            )}  
        <div className='actionsContainer'>

            <button 
                onClick={deleteTodo} 
                className="fa-solid fa-trash"
                disabled={isEditTodo}
                style={{ display: isEditTodo ? 'none' : 'inline-block' }}
                >

                </button>
            <button 
                onClick={handleEdit} 
                className="fa-regular fa-pen-to-square"
                disabled={isEditTodo}
                style={{ display: isEditTodo ? 'none' : 'inline-block' }}
                > 
                
                </button>
                    
        </div>

    </li>

  )
}


export default TodoCard