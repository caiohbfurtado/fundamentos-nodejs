import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    const { total } = this.transactionsRepository.getBalance();
    if (!title || !value || !type) {
      throw new Error('Dados inválidos. Verifique e tente novamente');
    }

    if (type === 'outcome' && value > total) {
      throw new Error('Saldo insuficiente.');
    }

    if (type === 'income' && value <= 0) {
      throw new Error(
        'Não foi possível realizar a transação. Tente novamente.',
      );
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
