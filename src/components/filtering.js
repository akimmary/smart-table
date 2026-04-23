export function initFiltering(filterElements, searchElements) {
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            elements[elementName].append(...Object.values(indexes[elementName]).map(name => {
                const el = document.createElement('option');
                el.textContent = name;
                el.value = name;
                return el;
            }))
        })
    }

 const applyFiltering = (query, state, action) => {
        // @todo: #4.2 — обработать очистку поля

        if (action?.name === "clear") {
            const field = action.dataset.field; // получаем имя поля
            const parent = action.parentElement; // родительский контейнер кнопки
            const input = parent.querySelector(`input[data-field="${field}"]`); // ищем input внутри родителя
            if (input) {
                input.value = ''; // сброс в UI
            }
        }
        
        const filter = {};
        Object.keys(filterElements).forEach(key => {
            const el = filterElements[key];

            if (el && ['INPUT', 'SELECT'].includes(el.tagName) && el.value) {
                filter[`filter[${el.name}]`] = el.value;
            }
        });

        const globalSearch = searchElements?.search;
            if (globalSearch && globalSearch.value) {
            filter['search'] = globalSearch.value;
        }

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query; // если в фильтре что-то добавилось, применим к запросу
    }

    return {
        updateIndexes,
        applyFiltering,
    }
} 
