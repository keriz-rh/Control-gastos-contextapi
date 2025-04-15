// Formatea una cantidad numérica a formato de moneda en USD
export function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }
  
  // Formatea una fecha string a un formato largo en inglés
  export function formatDate(dateStr: string): string {
    const dateObj = new Date(dateStr);
    if (isNaN(dateObj.getTime())) return "Invalid Date";
  
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    
    return new Intl.DateTimeFormat("en-US", options).format(dateObj);
  }
  