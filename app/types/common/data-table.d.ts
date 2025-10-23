interface DataTableOption<T = any> {
    page: number
    itemsPerPage: number
    sortBy: DataTableSortBy<T>[]
}

interface DataTableSortBy<T = any> {
    key: Extract<keyof T, string>
    order?: boolean | 'asc' | 'desc'
}

interface DataTableHeader<T = any> {
    title: string
    align?: 'start' | 'center' | 'end'
    sortable?: false | true
    // color?: 'red'
    key: keyof T | 'Action' //| 'actions'
}

interface DataTableResult<TDatas> {
    items: TDatas[]
    itemsLength: number
}

interface DataTable<TDatas> {
    headers: readonly DataTableHeader<TDatas>[]
    options: DataTableOption
    result: DataTableResult<TDatas>
}

interface DataTableResponse<T> {
    Datas: T[];
    Total: number;
}