    var content = document.querySelector(".content");
    var add = document.querySelector(".btn-add");
    var list = document.querySelector(".list-content");
    var box = document.querySelector(".box");
    var numTask = 0;

    function displayTasks() {
        console.log(localStorage.length);
        for(let i = 0; i < localStorage.length; i++){
            // console.log(localStorage[`item-${i}`]);
            if(localStorage[`item-${i}`] !== undefined){
                content.value = localStorage[`item-${i}`];
                // console.log(`item-${i}`);
                localStorage.removeItem(`item-${i}`);
                createTask();
            }
           
        } 
        content.value = "";
    }

    function createTask() {
        if(content.value != "") {
            var li = document.createElement("li");
            li.setAttribute("class", `item item-${numTask}`);
            let inner = `
                        <p class="content-item">${content.value}</p>
                        <div class="btn">  
                            <i class="fa-regular fa-circle-check done" ></i>  
                            <i class="fa-regular fa-circle-xmark delete" ></i>
                        </div>
                        `;
            
            li.innerHTML = inner;
            list.appendChild(li); 
            

            localStorage.setItem(`item-${numTask}`, `${content.value}`);

            let done = li.querySelector(`.item-${numTask} .done`);
            let del = li.querySelector(`.item-${numTask} .delete`);
            
            del.setAttribute("class", `fa-regular fa-circle-xmark delete ${numTask}`);
            
            
            var f = true;
            done.addEventListener("click", () => {
                var contentItem = li.querySelector(`.content-item`);
                if(f) {
                    contentItem.style.textDecoration = "line-through";
                    contentItem.style.fontStyle = "italic";
                    contentItem.style.opacity = "0.8";  
                    f = !f;
                }
                else {
                    contentItem.style.textDecoration = "none";
                    contentItem.style.fontStyle = "normal";
                    contentItem.style.opacity = "1";  
                    f = !f;
                }
            });

            
            del.addEventListener("click", () => {
                var str = del.getAttribute("class");
                var index = str.slice(str.lastIndexOf(" ")+1);
                list.removeChild(li);
                localStorage.removeItem(`item-${index}`);
                for(let j = parseInt(index)+1; j <= localStorage.length; j++){
                    console.log(localStorage.getItem(`item-${j}`));
                    localStorage.setItem(`item-${j-1}`, localStorage.getItem(`item-${j}`));
                    localStorage.removeItem(`item-${j}`);
                }
                numTask--;
            })
            numTask++;

            
        }
        else {
            alert("You have to write something!");
        }

    }
    
    displayTasks();
    
    add.addEventListener("click", createTask);
    content.addEventListener("keydown", (event)=>{
        if(event.key == "Enter"){
            createTask();
            setTimeout(()=>{
                content.value = "";
            }, 150);
        }
    });

    content.onblur = () => {
        setTimeout(()=>{
            content.value = "";
        }, 150);
    }

    
    
   


    


    
    

    