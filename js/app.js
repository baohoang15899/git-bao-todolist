//--------------------------Variables--------------------------
let input = document.querySelector(".todo__input")
let addBtn = document.querySelector(".todo__btn")
let creatList = document.querySelector(".todo__list")
let warning = document.querySelector(".todo__warning")
// let body = document.querySelector('body')
let clock = document.querySelector(".todo__clock")
let clear = document.querySelector(".todo__clearAll-btn")
let app = {
    init:()=>{
        window.addEventListener("DOMContentLoaded",data.loadData())
        addBtn.addEventListener("click",addThing)
        creatList.addEventListener("click",remove)
        clear.addEventListener("click",data.clearAll)
    }
}

//--------------------------realtime clock--------------------------
function check (s) {
    if (s < 10) {
     s = "0" + s; 
    }
    return s
}
let days =["Sunday","Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday",]
function time() {
    let current = new Date
    let seconds = current.getSeconds()
    let minutes = current.getMinutes()
    let hours = current.getHours()
    let day = current.getDate()
    let month = current.getMonth()+1
    let year = current.getFullYear()
    hours = check(hours)
    minutes = check(minutes)
    seconds = check(seconds)
    return  days[current.getDay()]+" "+"Date: " +day+"/"+month+"/"+year+" "+"Time: "+hours +":"+ minutes+":"+seconds
}
setInterval(()=>{
    let show = time()
    clock.innerText = show
},1000)
//--------------------------Save Data--------------------------
let data = {
    saveData:function(value) {
        let list
        if (localStorage.getItem("bao_taskList") === null) {
            list = []
        }
        else{
            list = JSON.parse(localStorage.getItem("bao_taskList"))
        }
        list.push(value)
        // console.log(list);
        localStorage.setItem("bao_taskList",JSON.stringify(list))
    },
    loadData:function () {
        let list
        if (localStorage.getItem("bao_taskList") === null) {
            list = []
        }
        else{
            list = JSON.parse(localStorage.getItem("bao_taskList"))
        }
        list.forEach(show =>{
            let div = document.createElement("div")
            let content = `<div class="todo__thing">
            <p class="todo__thing-name">${show}</p>
            <button href="" class="todo__thing-remove"><i class="fas fa-trash"></i></button>
        </div>`
            div.innerHTML = content
            creatList.append(div)
            input.value = ""
        })
    },
    removeData:function(value){
        let list
        if (localStorage.getItem("bao_taskList") === null) {
            list = []
        }
        else{
            list = JSON.parse(localStorage.getItem("bao_taskList"))
        }
        // console.log(list.indexOf(value.children[0].innerText));
        list.splice(list.indexOf(value.children[0].innerText),1)
        // console.log(list);
        localStorage.setItem("bao_taskList",JSON.stringify(list))
    },
    clearAll:function() {
        let all = creatList.children
        for (let i = 0; i < all.length; i++){
            // console.log(all[i].children);
            let thing = all[i].children
            // console.log(thing[0]);
            if (thing[0]) {
                thing[0].classList.add('remove');
                thing[0].addEventListener('transitionend',()=>{
                    thing[0].remove()
                })
            }
        }
        localStorage.removeItem("bao_taskList");
    }
}
//--------------------------App function--------------------------

function addThing(){
    if (input.value === "" || input.value.trim() === ""){
        warning.innerText="Your input is empty !"
        warning.classList.add("add")
        input.addEventListener("input",()=>{
            warning.innerText=""
            warning.classList.remove("add")
        })
        return
    }
    add()
}
function remove(e){
    let clicked = e.target;
    if (clicked.classList.contains('todo__thing-remove')) {
        let thing = clicked.parentElement
        thing.style.pointerEvents = "none";
        thing.classList.add("remove")
        data.removeData(thing)
        thing.addEventListener("transitionend",()=>{
            thing.remove()
        })
    }
}
function add(){
    let div = document.createElement("div")
    let things = document.querySelectorAll('.todo__thing-name')
    for (let i = 0; i < things.length; i++) {
        if(input.value === things[i].innerText){
            input.value = ""
            warning.innerText="You've already add this !"
            warning.classList.add("add")
            input.addEventListener("input",()=>{
                warning.innerText=""
                warning.classList.remove("add")
            })
            return
        }
        }
    let content = `<div class="todo__thing">
    <p class="todo__thing-name">${input.value}</p>
    <button href="" class="todo__thing-remove"><i class="fas fa-trash"></i></button>
</div>`
    data.saveData(input.value)
    div.innerHTML = content
    creatList.append(div)
    input.value = ""
}

app.init()
