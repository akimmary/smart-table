import {rules, createComparison} from "../lib/compare.js";

export function initSearching(searchField) {
    const comparator = createComparison({
        field: searchField,
        skipEmptyTargetValues: true
    });

    // возвращаем функцию для render/apply
    return (data, state) => {
        const term = (state[searchField] || '').trim();
        if (!term) return data; // если поиск пустой, ничего не фильтруем

        // используем правило searchMultipleFields для фильтрации
        return data.filter(row =>
            ['date', 'customer', 'seller'].some(
                key => String(row[key] || '').trim().toLowerCase().includes(term.trim().toLowerCase())
            )
        );
    };
}