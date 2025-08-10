export interface ITimeframe {
    description: string
    startingBalance: number
    savingsStartingBalance: number
    startDate: Date
    endDate: Date
    id: number
    backedUp?: boolean

    transaction: ITransaction[]
    savingsTransactions: ITransaction[]
}

export interface ITransaction {
    description: string
    date: Date
    type: string
    id: number | null
    amount: number
}
