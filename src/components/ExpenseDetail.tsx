import { useMemo } from "react";
import {
  LeadingActions as SwipeLeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions as SwipeTrailingActions
} from 'react-swipeable-list';
import { formatDate } from "../helpers";
import { Expense } from "../types";
import AmountDisplay from "./AmountDisplay";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";
import "react-swipeable-list/dist/styles.css";

type ExpenseDetailProps = {
  expense: Expense;
};

function ExpenseDetail({ expense }: ExpenseDetailProps) {
  const { dispatch } = useBudget()

  const categoryInfo = useMemo(() => categories.find(cat => cat.id === expense.category), [expense]);

  const leadingActions = () => (
    <SwipeLeadingActions>
      <SwipeAction
        onClick={() => dispatch({type: 'get-expense-by-id', payload: {id: expense.id}})}
      >
        Actualizar
      </SwipeAction>
    </SwipeLeadingActions>
  );

  const trailingActions = () => (
    <SwipeTrailingActions>
      <SwipeAction
        onClick={() => dispatch({ type: 'remove-expense', payload: { id: expense.id } })}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </SwipeTrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={1}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="flex w-full justify-between items-center bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow mb-4 gap-5">
          <div>
            <img src={`/icono_${categoryInfo?.icon}.svg`}
              alt="icono gasto"
              className="w-20"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo?.name}</p>
            <p className="text-lg font-semibold text-slate-800">{expense.expenseName}</p>
            <p className="text-slate-500 text-sm mt-1">{formatDate(expense.date!.toString())}</p>
          </div>

          <AmountDisplay amount={expense.amount} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}

export default ExpenseDetail;
