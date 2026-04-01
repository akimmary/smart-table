import {rules, createComparison} from "../lib/compare.js";

export function initSearching(searchField) {
    const comparator = createComparison(
        ['skipNonExistentSourceFields', 'skipEmptyTargetValues'],
        [
            rules.searchMultipleFields(
                searchField,
                ['date', 'customer', 'seller'],
                false
            )
        ]
    );

    return (data, state) => {
        const value = state[searchField];
        if (!value) return data;

        const query = String(value).toLowerCase();

        return data.filter(item => {
            // ищем подстроку в любом из полей
            return ['date', 'customer', 'seller'].some(field => {
                return String(item[field] || '').toLowerCase().includes(query);
            });
        });
    };
}