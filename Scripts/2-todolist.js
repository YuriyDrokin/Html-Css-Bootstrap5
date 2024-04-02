const addForm = document.querySelector(".add");
const tasks = document.querySelector(".tasks");
const clearAll = document.querySelector(".clear");
const messageSpan = document.querySelector(".message span");
const searchForm = document.querySelector(".search");

function updateMessage() {
  const textLength = tasks.children.length;
  messageSpan.textContent = `You have ${textLength} pending tasks`;
}



addForm.addEventListener("submit", event => {
  event.preventDefault();
  const value = addForm.task.value.trim(); // remove white space 

  if (value.length) {

    tasks.innerHTML += `<li>
                          <span>${value}</span>
                          <i class="bi bi-trash-fill delete"></i>
                        </li>`;
    addForm.reset(); // resetting for new input
    updateMessage(); // update task numbers
  }

});

tasks.addEventListener("click", event => {

  if (event.target.classList.contains("delete")) {
    event.target.parentElement.remove();
    updateMessage();
  }
});

clearAll.addEventListener("click", event => {
  const taskItems = tasks.querySelectorAll("li");
  taskItems.forEach(item => {
    item.remove();
    updateMessage();
  })
});
updateMessage();

function filterTask(term) {
  Array.from(tasks.children) // selected all the children of all the Taasks and added to the Array

    .filter(task => { // we filter them by the lowercase and trim them if there are some spaces in the line 
      return !task.textContent.toLowerCase().includes(term);
    })

    .forEach(task => { // if our search doesnt match with list of array we hide them 
      task.classList.add("hide");
    });

  /* Point of the Array below its to filter our existing array with elements and remove the hide css option from them */
  Array.from(tasks.children)
    .filter(task => {
      return task.textContent.toLowerCase().includes(term);

    })
    .forEach(task => {
      task.classList.remove("hide");
    });


}

searchForm.addEventListener("keyup", event => {
  const term = searchForm.task.value.trim();

  filterTask(term);
});

searchForm.addEventListener("click", event => {
  if (event.target.classList.contains("reset")) {
    searchForm.reset();

    const term = searchForm.task.value.trim().toLowerCase();

    filterTask(term);
  }
})