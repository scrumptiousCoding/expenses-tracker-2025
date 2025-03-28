export interface ITimeframe {
    description: string
    startingBalance: number
    startDate: Date
    endDate: Date
    id: number

    transaction: ITransaction[]
}

export interface ITransaction {
    description: string
    date: Date
    type: string
    id: number
    amount: number
}