document.querySelector('#notes').addEventListener('change',function(e){
    if (e.target.checked==true){
        tasks[findItemIndex({'text':e.target.id})]['completed']=true
        showTasks(getIncompleteTasks())
    }
})



document.querySelector('#add-delete-form').addEventListener('submit',function(e){
        e.preventDefault()
    }
)



document.querySelector('#add-task').addEventListener('click', function(e){
    const newTask={'text':document.querySelector("#add-task-input").value,'completed':false,'priority':"MP"}
    
    if (newTask.text==''){
        alert('Please type in something first :)')
    }
    else{
        const taskPriority=document.getElementById('add-task-priority-input').value
        if (taskPriority!=''){
            if ("hp mp lp".includes(taskPriority.toLowerCase()) ){
                newTask['priority']=taskPriority
                tasks.push(newTask)
            }
            else{
                alert('Wrong priority value!\nAccepted values: HP MP LP')
            }
        }
        else{
            alert('Please set task priority! :)')
        }

       
        showTasks(getIncompleteTasks())
        document.querySelector("#add-task-input").value=""
        document.getElementById('add-task-priority-input').value=""
    }
})



document.querySelector('#search-task-input').addEventListener('input',function(e){
    const text=e.target.value
    showTasks(tasks.filter(
        function(aToDo){
            return aToDo.text.toLowerCase().includes(text.toLowerCase())
                }
            )
        )

})


document.querySelector('#search-task').addEventListener('click', function(e){
    const inputText=document.querySelector("#search-task-input").value

    if (inputText==''){
        alert('Please type in something first :)')
    }
    else{
        showTasks(getIncompleteTasks().filter(
            function(aToDo){ 
                return aToDo.text.toLowerCase().includes(inputText.toLowerCase())
                }
            )
        )
        document.querySelector("#search-task-input").value=""
    }
})



document.querySelector('#hide-tasks').addEventListener('click', function(e){
    htClicked+=1
    if (htClicked%2==0){
        hideTasks()
        e.target.textContent='Show tasks'
    }
    else{
        showTasks(getIncompleteTasks())
        e.target.textContent='Hide Tasks'
    }
   
})



document.getElementById('completed-tasks').addEventListener('change',function(e){
    if (e.target.checked===true){
        showTasks(tasks.filter(
            function(aToDo){
                return aToDo.completed===true
                }
            )
        )
    }
    else{
        showTasks(getIncompleteTasks())
    }

})



document.getElementById('hp-tasks').addEventListener('change',function(e){
    if (e.target.checked===true){
        showTasks(tasks.filter(
            function(aToDo){
                return aToDo.priority.toLowerCase()==="hp" && aToDo.completed===false
                }
            )
        )
    }
    else{
        showTasks(getIncompleteTasks())
    }

})

document.getElementById('all-tasks').addEventListener('change',function(e){
    if (e.target.checked===true){
        showTasks(tasks)
    }
    else{
        showTasks(getIncompleteTasks())
    }

})



document.querySelector('#delete-task').addEventListener('click', function(e){
    const inputText=document.querySelector("#delete-task-input").value
    
    
    if (getIncompleteTasks().length>0){
        if (inputText===''){
            alert('Please type in something first :)')
        }
        else{
            const index=parseInt(inputText, 10)
            if (!isNaN(index)){
                if(index>=1 && index<=getIncompleteTasks().length){
                    const removedItem=getIncompleteTasks().splice(index-1,1)[0]
                    tasks.splice(findItemIndex(removedItem),1)
                    showTasks(getIncompleteTasks())
                }
                else{
                    alert('Invalid number!')
                }
            }

            else{
                alert('Please type in a number :)')
            }
            document.querySelector("#delete-task-input").value=""
        }
    }
    else{
        alert('Incomplete tasks list is empty!')
    }
})



window.onbeforeunload = function() {
        localStorage.setItem('userData',JSON.stringify(tasks))
}