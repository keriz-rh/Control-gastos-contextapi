import { useEffect, useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import FilterByCatgory from "./components/FilterByCatgory"

function App() {

  const { state } = useBudget()

  const isValidBuget = useMemo(() => state.budget > 0, [state.budget])

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state])

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Planificador de Gastos
        </h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {isValidBuget ? <BudgetTracker /> : <BudgetForm />}
      </div>

      {isValidBuget && (
        <main className="max-w-3xl mx-auto py-10">
          <FilterByCatgory />
          <ExpenseModal />
          <ExpenseList />
        </main>
      )}

      <footer className="bg-blue-600 py-4 mt-auto">
        <div className="text-center text-white">
          <p>&copy; 2025 KerizrH. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  )
}

export default App
