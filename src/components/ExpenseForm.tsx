import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import { ChangeEvent, useState } from "react";
import { DraftExpense, Value } from "../types";
import ErrorMenssage from "./ErrorMenssage";
import { useBudget } from "../hooks/useBudget";

function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })

    const [error, setError] = useState('')
    const { dispatch } = useBudget()

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const isAmountField = ['amount'].includes(name);
        setExpense({
            ...expense,
            [name]: isAmountField ? Number(value) : value
        });
    }

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //validar
        if (Object.values(expense).includes('')) {
            setError('Todos los campos son obligatorios')
            return
        }

        // Agregar un nuevo gasto
        dispatch({ type: 'add-expense', payload: { expense } })

        //reiniciar el state
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })

    }

    return (
        <form className="space-y-8" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-3xl font-extrabold text-blue-600 border-b-4 border-blue-500 py-4">
                Nuevo Gasto
            </legend>

            {error && <ErrorMenssage>{error}</ErrorMenssage>}
            <div className="flex flex-col space-y-2">
                <label htmlFor="expenseName" className="text-lg font-semibold text-gray-700">
                    Nombre del Gasto:
                </label>
                <input
                    type="text"
                    id="expenseName"
                    placeholder="Ej. Compra supermercado"
                    className="bg-slate-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    name="expenseName"
                    onChange={handleChange}
                    value={expense.expenseName}
                />
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="amount" className="text-lg font-semibold text-gray-700">
                    Cantidad:
                </label>
                <input
                    type="number"
                    id="amount"
                    placeholder="Ej. 300"
                    className="bg-slate-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    name="amount"
                    onChange={handleChange}
                    value={expense.amount}
                />
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="category" className="text-lg font-semibold text-gray-700">
                    Categoría:
                </label>
                <select
                    id="category"
                    className="bg-slate-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    name="category"
                    onChange={handleChange}
                    value={expense.category}
                >
                    <option value="">-- Seleccione --</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="date" className="text-lg font-semibold text-gray-700">
                    Fecha Gastos:
                </label>
                <DatePicker
                    className="bg-slate-100 p-2 border-0"
                    onChange={handleChangeDate}
                    value={expense.date}

                />
            </div>

            <input
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer w-full p-3 text-white uppercase font-bold rounded-lg"
                value="Registrar Gasto"
            />
        </form>
    );
}

export default ExpenseForm;
