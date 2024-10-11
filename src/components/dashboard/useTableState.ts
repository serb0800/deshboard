// 1.	key: string (обязательный)
// 	•	Уникальный ключ, используемый для сохранения и восстановления состояния таблицы из хранилища.
// 	2.	request: IRequest (обязательный)
// 	•	Функция для запроса данных, которая принимает текущее состояние таблицы и возвращает промис с данными и общим количеством записей.
// 	3.	saveToStorage?: boolean | Record<FeatureKeys, boolean> (необязательный, по умолчанию { pagination: false, columnsState: true, filter: true, sort: true, tab: true })
// 	•	Указывает, какие состояния таблицы нужно сохранять в хранилище (локальное или пользовательское).
// 	4.	defaultValue?: IDefaultValues (необязательный)
// 	•	Начальные значения для состояния таблицы.
// 	5.	isDebounceSearch?: boolean (необязательный, по умолчанию true)
// 	•	Указывает, нужно ли использовать debounce для функции поиска.

// Возвращаемые значения

// Хук useTableState возвращает массив из трех элементов:

// 	1.	IDataState
// 	•	data: never[] — Данные таблицы.
// 	•	isLoading: boolean — Флаг, указывающий на процесс загрузки данных.
// 	2.	ITableState
// 	•	sort?: SortState — Текущее состояние сортировки.
// 	•	filter?: FilterState — Текущее состояние фильтрации.
// 	•	hasFilters?: boolean — Применен фильтр или нет.
// 	•	columnsState?: ColumnState — Текущее состояние колонок (их видимость и порядок).
// 	•	pagination: PaginationState — Текущее состояние пагинации.
// 	•	searchString?: string — Текущая строка поиска.
// 	• tab?: string - Текущий таб
// 	3.	SetterReturn
// 	•	setSort: (sort: SortState) => void — Устанавливает состояние сортировки.
// 	•	setColumnState: (columnState: ColumnState) => void — Устанавливает состояние колонок.
// 	•	setFilters: (filterState: FilterState) => void — Устанавливает состояние фильтров.
// 	•	setPagination: (paginationState: PaginationState) => void — Устанавливает состояние пагинации.
// 	•	onSearch: ChangeEventHandler<HTMLInputElement> — Функция для обработки поиска.
// 	•	onChangeTable: TableProps['onChange'] — Функция для обработки изменений в таблице (сортировка, пагинация и т.д.).
// 	•	onChangeTab: SetterReturn['onChangeTab'] - Функция для изменения таба
// 	•	reload: (params?: Partial<ITableState>) => void — Перезагружает данные таблицы.

import { ColumnsState } from '@ant-design/pro-components'
import { SorterResult } from 'antd/es/table/interface'
import {
    ChangeEventHandler,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'
import { TableProps } from 'antd'
import debounce from 'lodash/debounce'
import { IFilter } from '@/types'

type SortState = Omit<SorterResult<any>, 'column'> | undefined
type FilterState = Record<string, any> | undefined
type ColumnState = Record<string, ColumnsState> | undefined
type PaginationState = {
    current: number
    pageSize: number
    total?: number
}

type FeatureKeys = 'sort' | 'filter' | 'columnsState' | 'pagination' | 'tab'

type SetterReturn = {
    setSort: (sort: SortState) => void
    setColumnState: (columnState: ColumnState) => void
    setFilters: (
        filterState: FilterState | ((prev: FilterState) => FilterState)
    ) => void
    setPagination: (paginationState: PaginationState) => void
    onSearch: ChangeEventHandler<HTMLInputElement>
    onChangeTab: (val: string) => void
    onChangeTable: TableProps['onChange']
    reload: (params?: Partial<ITableState>) => void
}

type IDataState = { data: never[]; isLoading: boolean }

type ITableState = {
    sort?: SortState
    filter?: FilterState
    columnsState?: ColumnState
    pagination: PaginationState
    searchString?: string
    hasFilters?: boolean
    tab?: string
}

type GetterReturn = ITableState

type IRequest<T extends {} = {}> = (
    params: ITableState
) => Promise<{ data: T[]; total: number }>

type IDefaultValues = Partial<ITableState>

interface Options<T extends {} = {}> {
    key: string
    request: IRequest<T>
    saveToStorage?: boolean | Record<FeatureKeys, boolean>
    defaultValue?: IDefaultValues
    isDebounceSearch?: boolean
}

type ReturnType = [IDataState, GetterReturn, SetterReturn]

const initialValues: ITableState = {
    pagination: { pageSize: 50, current: 1 },
    filter: {},
}

export default function useTableState<T extends {} = {}>({
    key,
    request,
    saveToStorage = {
        pagination: false,
        columnsState: true,
        filter: true,
        sort: true,
        tab: true,
    },
    defaultValue,
    isDebounceSearch = true,
}: Options): ReturnType {
    const [tableData, setTableData] = useState<T[]>([])
    const [isDataLoading, setIsDataLoading] = useState<boolean>(false)

    const getItems = async <T extends any>(
        str: FeatureKeys,
        direction: 'LocalStorage' | 'UserSettings'
    ): Promise<T | undefined> => {
        if (direction === 'LocalStorage') {
            return JSON.parse(localStorage.getItem(`${key}_${str}`) as string)
        }
        if (direction === 'UserSettings') {
            return JSON.parse(localStorage.getItem(`${key}_${str}`) as string)
        }
    }

    const setItems = async (
        str: FeatureKeys,
        val: any,
        direction: 'LocalStorage' | 'UserSettings'
    ) => {
        if (direction === 'LocalStorage') {
            localStorage.setItem(`${key}_${str}`, JSON.stringify(val))
        }
        if (direction === 'UserSettings') {
            localStorage.setItem(`${key}_${str}`, JSON.stringify(val))
        }
    }

    const shouldSave = (ftr_key: FeatureKeys): boolean => {
        if (typeof saveToStorage === 'boolean') {
            return saveToStorage
        }
        return saveToStorage[ftr_key]
    }

    const [tableState, setState] = useState<ITableState>({
        ...initialValues,
        ...defaultValue,
    })
    const setTableState = (
        nextState: Partial<ITableState> | ((prev: ITableState) => ITableState)
    ) => {
        if (typeof nextState === 'function') {
            setState(nextState)
        } else {
            setState((prev) => ({
                ...prev,
                ...nextState,
            }))
        }
    }

    const dataLoaded = useRef(false)

    const setSort: SetterReturn['setSort'] = (val) => {
        if (shouldSave('sort')) {
            setItems('sort', val, 'UserSettings')
        }
        setTableState({ sort: val })
    }

    const setColumnState: SetterReturn['setColumnState'] = (val) => {
        if (shouldSave('columnsState')) {
            setItems('columnsState', val, 'UserSettings')
        }
        setTableState({ columnsState: val })
    }

    const setFilters: SetterReturn['setFilters'] = (val) => {
        // Не пишем в фильтр пустые значения

        let frosave: FilterState
        if (typeof val === 'function') {
            // Если val — это функция, вызываем ее с текущим состоянием
            setTableState((prev) => {
                frosave = val(prev.filter)
                return {
                    ...prev,
                    filter: val(prev.filter),
                    hasFilters: val(prev.filter)
                        ? Object.values(val(prev.filter)).filter(Boolean)
                              .length > 0
                        : false,
                }
            })
        } else {
            // Если val — это объект, передаем его напрямую
            for (let key in val) {
                if (Array.isArray(val[key]) && !val[key].length) delete val[key]
                if (!Boolean(val[key])) delete val[key]
            }
            frosave = val
            setTableState({
                filter: val,
                hasFilters: val
                    ? Object.values(val).filter(Boolean).length > 0
                    : false,
            })
        }
        if (shouldSave('filter')) {
            setItems('filter', frosave, 'LocalStorage')
        }
    }

    const setPagination: SetterReturn['setPagination'] = (val) => {
        if (shouldSave('pagination')) {
            setItems('pagination', val, 'LocalStorage')
        }
        setTableState({ pagination: val })
    }

    const resetPagination = () => {
        setPagination(initialValues.pagination)
    }

    const debounceSearch = debounce((searchString) => {
        setTableState({ searchString: searchString })
    }, 700)

    const onSearch: SetterReturn['onSearch'] = (e) => {
        const searchString = e.target.value
        if (isDebounceSearch) {
            debounceSearch(searchString)
        } else {
            setTableState({ searchString })
        }
    }

    const loadData = useCallback(
        async (newTableSate?: Partial<ITableState>) => {
            setIsDataLoading(true)

            try {
                const { data, total } = await request({
                    ...tableState,
                    ...newTableSate,
                })
                setTableData(data)
                setTableState((prev) => ({
                    ...prev,
                    pagination: { ...prev.pagination, total },
                }))
            } finally {
                setIsDataLoading(false)
            }
        },
        [tableState]
    )

    const onChangeTab: SetterReturn['onChangeTab'] = (val) => {
        if (shouldSave('tab')) {
            setItems('tab', val, 'LocalStorage')
        }
        setTableState({ tab: val })
        resetPagination()
    }

    const reload: SetterReturn['reload'] = () => {
        loadData()
    }

    const fetchDataFromStorages = async () => {
        const [sort, filter, columnsState, pagination, tab] = await Promise.all(
            [
                shouldSave('sort')
                    ? getItems<SortState>('sort', 'UserSettings')
                    : tableState.sort,
                shouldSave('filter')
                    ? getItems<FilterState>('filter', 'LocalStorage')
                    : tableState.filter,
                shouldSave('columnsState')
                    ? getItems<ColumnState>('columnsState', 'UserSettings')
                    : tableState.columnsState,
                shouldSave('pagination')
                    ? getItems<PaginationState>('pagination', 'LocalStorage')
                    : tableState.pagination,
                shouldSave('tab')
                    ? getItems<string>('tab', 'LocalStorage')
                    : tableState.tab,
            ]
        )

        setTableState({
            sort,
            filter: filter || defaultValue?.filter || {},
            columnsState,
            pagination,
            hasFilters: filter
                ? Object.values(filter).filter(Boolean).length > 0
                : false,
            tab,
        })
        dataLoaded.current = true
    }

    useEffect(() => {
        if (dataLoaded.current) {
            // Последующие рендеры
            loadData()
        } else {
            fetchDataFromStorages()
        }
    }, [
        tableState.columnsState,
        tableState.filter,
        tableState.pagination.current,
        tableState.pagination.pageSize,
        tableState.sort,
        tableState.searchString,
        tableState.tab,
    ])

    const onChangeTable: TableProps['onChange'] = (
        pagination,
        _,
        sort,
        extra
    ) => {
        const newSteteOfPagination =
            tableState.pagination.pageSize !== pagination.pageSize
        const current = newSteteOfPagination ? 1 : pagination.current
        const pageSize = pagination.pageSize
        const total = pagination.total
        if (extra.action === 'paginate' && current && pageSize) {
            setPagination({ current, pageSize, total })
        }

        if (extra.action === 'sort' && !Array.isArray(sort)) {
            const { columnKey, field, order } = sort
            setSort({ columnKey, field, order })
        }
    }

    return [
        {
            data: tableData,
            isLoading: isDataLoading,
        },
        tableState,
        {
            onChangeTable,
            setColumnState,
            setSort,
            setFilters,
            setPagination,
            onSearch,
            onChangeTab,
            reload,
        },
    ]
}
