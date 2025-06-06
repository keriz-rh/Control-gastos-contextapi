import React, { useMemo, useState } from "react";
import { useBudget } from "../hooks/useBudget";

function BudgetForm() {
    const [budget, setBudget] = useState(0)
    const { dispatch } = useBudget()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    }

    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0;
    }, [budget])

    const habdleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch({ type: 'add-budget', payload: {budget}})
}

return (
    <form className="space-y-5" onSubmit={habdleSubmit}>
        <div className="flex flex-col space-y-5">
            <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
                Definir Presupuesto
            </label>
            <input
                id="budget"
                name="budget"
                step="0.01"
                min={0}
                type="number"
                className="w-full bg-white border border-gray-200 p-2"
                placeholder="Definir Presupuesto"
                value={budget === 0 ? '' : budget}  
                onChange={handleChange}
            />
        </div>
        <input
            type="submit"
            value='Definir Presupuesto'
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2
                 text-white font-black uppercase disabled:opacity-40"
            disabled={isValid}
        />

    </form>
);
}

export default BudgetForm;