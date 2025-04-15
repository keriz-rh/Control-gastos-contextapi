import { formatDate } from "../helpers";
import { Expense } from "../types";
import AmountDisplay from "./AmountDisplay";

type ExpenseDetailProps = {
  expense: Expense;
};

function ExpenseDetail({ expense }: ExpenseDetailProps) {
  return (
    <div className="flex justify-between items-center bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow mb-4 gap-5">
      
      <div className="flex-1">
        <p className="text-lg font-semibold text-slate-800">{expense.expenseName}</p>
        <p className="text-slate-500 text-sm mt-1">{formatDate(expense.date!.toString())}</p>
      </div>

      <AmountDisplay amount={expense.amount} />

    </div>
  );
}

export default ExpenseDetail;
