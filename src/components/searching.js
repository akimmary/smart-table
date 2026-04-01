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

        return data.filter(item =>
            comparator(item, { [searchField]: value })
        );
    };
}