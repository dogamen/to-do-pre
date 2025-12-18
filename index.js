let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	const tasks = localStorage.getItem("tasks")
	if (tasks !== null)
		return JSON.parse(tasks)
	return items
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
	const textElement = clone.querySelector(".to-do__item-text");
	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
	const editButton = clone.querySelector(".to-do__item-button_type_edit");

	textElement.textContent = item

	deleteButton.addEventListener("click", event => {
		clone.remove()
		saveTasks(getTasksFromDOM())
	})

	duplicateButton.addEventListener("click", event => {
		const itemName = item
		const newItem = createItem(item)
		listElement.prepend(newItem)
		saveTasks(getTasksFromDOM())
	})

	editButton.addEventListener("click", event => {
		textElement.setAttribute("contenteditable", true)
		textElement.focus()		// Фокус на текст
	})

	textElement.addEventListener("blur", event => {
		textElement.setAttribute("contenteditable", "false")
		saveTasks(getTasksFromDOM())
	})
	return clone
}

function getTasksFromDOM() {
	const itemsNamesElements = listElement.querySelectorAll(".to-do__item-text")
	const tasks = []
	itemsNamesElements.forEach(task => {
		tasks.push(task.textContent)
	})
	return tasks
}

function saveTasks(tasks) {
	localStorage.setItem("tasks", JSON.stringify(tasks))
}

formElement.addEventListener("submit", function (event) {
	event.preventDefault()
	const text = inputElement.value
	listElement.prepend(createItem(text))
	items = getTasksFromDOM()
	saveTasks(items)
	inputElement.value = ""
})

items = loadTasks()

items.forEach(task => {
	listElement.append(createItem(task))
})