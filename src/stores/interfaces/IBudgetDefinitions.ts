export interface IBudgetCategories {
    description: string
    amount: number
    notes: string
    transactions: IBudgetTransaction[]
}

export interface ISavingCategories {
    description: string
    amount: number
    notes: string
    startingAmount: number
    transactions: IBudgetTransaction[]
}

export interface IBudget {
    description: string
    startingBalance: number
    startDate: Date
    endDate: Date
    id: number
    backedUp?: boolean

    bills: IBudgetCategories[]
    expenses: IBudgetCategories[]
    savings: ISavingCategories[]
}


export interface IBudgetTransaction {
    description: string
    date: Date
    id: number | null
    amount: number
}
