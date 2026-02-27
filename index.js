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

formElement.addEventListener('submit', (event) => {
		event.preventDefault();
		if (inputElement.value.length !== 0) {
			appendTask(inputElement.value);
			formElement.reset();
		}
	});

function loadTasks() {
	const tasksList = JSON.parse(localStorage.getItem('tasks'));
	if (tasksList === null || tasksList.length === 0) items.forEach((item) => appendTask(item)); // Если в списке нет задач, то загружаем предустановленные
	else tasksList.forEach((item) => appendTask(item));
}

function appendTask(text) {
	listElement.prepend(createItem(text));
	const items = getTasksFromDOM();
	saveTasks(items);
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
	const textElement = clone.querySelector(".to-do__item-text");
	textElement.addEventListener('blur', () => {
		textElement.setAttribute('contenteditable', 'false');
		saveTasks(getTasksFromDOM());
	});
	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
	deleteButton.addEventListener('click', () => {
		deleteButton.closest(".to-do__item").remove();
		saveTasks(getTasksFromDOM());
	});
	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
	duplicateButton.addEventListener('click', () => {
		const item = duplicateButton.closest(".to-do__item").querySelector(".to-do__item-text").textContent;
		appendTask(item);
	});
	const editButton = clone.querySelector(".to-do__item-button_type_edit");
	editButton.addEventListener('click', () => {
		const item = editButton.closest(".to-do__item").querySelector(".to-do__item-text");
		item.setAttribute('contenteditable', 'true');
		item.focus();
	});
	clone.querySelector(".to-do__item-text").textContent = item;
	return clone;
}

function getTasksFromDOM() {
	const itemText = document.querySelectorAll(".to-do__item-text");
	const tasks = [];
	itemText.forEach((item) => tasks.unshift(item.textContent));
	return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

loadTasks();