'use strict';
const mainElement = document.getElementById(`main`);

const template = `<div class="wrapper">
<div class="options">
  <h4 class="title">Available</h4>
  <ul class="list" id="list-left">
    <li class="list__item">Option 1</li>
    <li class="list__item">Option 2</li>
    <li class="list__item">Option 3</li>
    <li class="list__item">Option 4</li>
    <li class="list__item">Option 5</li>
    <li class="list__item">Option 6</li>
  </ul>
</div>

<div class="controls">
  <button class="controls__item" id="add-all-to-right">>></button>
  <button class="controls__item" id="add-to-right">></button>
  <button class="controls__item" id="add-to-left"><</button>
  <button class="controls__item" id="add-all-to-left"><<</button>
</div>

<div class="options">
  <h4 class="title">Selected</h4>
  <ul class="list" id="list-right">
  </ul>
</div>
</div>`;

const renderFunctionalBlock = (groupNumber) => {
  const GROUP_NUMBER = groupNumber;

  const renderTemplate = (template) => {
    const container = document.createElement(`div`);
    container.classList.add(`${GROUP_NUMBER}`);
    container.innerHTML = template.trim();
    mainElement.appendChild(container);
  };

  renderTemplate(template);
  const container = document.querySelector(`.${GROUP_NUMBER}`);

  const addAllToRightBtn = container.querySelector('#add-all-to-right');
  const addToRightBtn = container.querySelector('#add-to-right');
  const addToLeftBtn = container.querySelector('#add-to-left');
  const addAllToLeftBtn = container.querySelector('#add-all-to-left');

  const availableList = container.querySelector('#list-left');
  const selectedList = container.querySelector('#list-right');

  const selectItemHandler = (evt) => {
    const target = evt.target;
    if (target.classList.contains('list__item')) {
      target.classList.toggle('selected');
    }
  };
  availableList.addEventListener('click', selectItemHandler);
  selectedList.addEventListener('click', selectItemHandler);

  const moveSelectedItemsHandler = (listFrom, listTo) => {
    let selectedItems = listFrom.querySelectorAll('.selected');
    if (selectedItems.length) {
      Array.from(selectedItems).forEach((it) => {
        it.classList.remove('selected');
        listTo.appendChild(it);
      });
    } else {
      alert('Не выбрано ни одного элемента!');
    }
  };
  addToRightBtn.addEventListener('click', () => {
    moveSelectedItemsHandler(availableList, selectedList);
  });
  addToLeftBtn.addEventListener('click', (evt) => {
    moveSelectedItemsHandler(selectedList, availableList);
  });

  const moveAllHandler = (listFrom, listTo) => {
    let list = listFrom.querySelectorAll('.list__item');
    let fragment = document.createDocumentFragment();
    Array.from(list).forEach((it) => fragment.appendChild(it));
    listTo.appendChild(fragment);
  };
  addAllToRightBtn.addEventListener('click', () => {
    moveAllHandler(availableList, selectedList);
  });
  addAllToLeftBtn.addEventListener('click', () => {
    moveAllHandler(selectedList, availableList);
  });
};

const functionalGroups = ['first-group', 'second-group','third-group', 'fouth-group', 'fifth-group', 'sixth-group'];
for (const it of functionalGroups) {
  renderFunctionalBlock(it);
}
