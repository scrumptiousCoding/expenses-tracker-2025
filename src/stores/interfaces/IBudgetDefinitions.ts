export interface IBudgetCategories {
    description: string
    amount: number
    notes: string
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
    savings: IBudgetCategories[]
}


export interface IBudgetTransaction {
    description: string
    startingAmount: number | undefined
    date: Date
    id: number | null
    amount: number
}
