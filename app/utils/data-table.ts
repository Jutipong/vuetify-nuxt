function useDataTable<TItems>(
    headers: DataTableHeader<TItems>[],
    sortBy: DataTableSortBy<TItems>[],
    onSubmit: Function,
) {
    const table = reactive({
        headers,
        options: {
            page: 1,
            itemsPerPage: 20,
            sortBy,
        } as DataTableOption<TItems>,
        result: {
            items: [],
            itemsLength: 0,
        },
    } as DataTable<TItems>)

    function onPageChange(page: number) {
        table.options.page = page
        onSubmit(table.options as DataTableOption<TItems>)
    }

    function onSortByChange(sortBy: any) {
        table.options.sortBy = sortBy
        onSubmit(table.options as DataTableOption<TItems>)
    }

    function onPageLengthChange(itemsPerPage: number) {
        table.options.itemsPerPage = itemsPerPage
        onSubmit(table.options as DataTableOption<TItems>)
    }

    function functionOnSubmit({ page } = { page: 1 }) {
        table.options.page = page
        onSubmit(table.options as DataTableOption<TItems>)
    }

    return {
        table,
        onSubmit: functionOnSubmit,
        onPageChange,
        onSortByChange,
        onPageLengthChange,
    }
}

export { useDataTable }
