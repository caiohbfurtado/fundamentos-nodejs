import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface DataTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomes = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((acc, curr) => acc + curr.value, 0);
    const outcomes = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((acc, curr) => acc + curr.value, 0);

    return {
      income: incomes,
      outcome: outcomes,
      total: incomes - outcomes,
    };
  }

  public create({ title, value, type }: DataTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
