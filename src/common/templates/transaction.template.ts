export const transactionEmailTemplate = (email: string, amount: number, type: 'income' | 'outcome') => {
    const transactionTypeText = type === 'income' ? 'recibido' : 'enviado';
    const transactionColor = type === 'income' ? '#4CAF50' : '#f44336';
  
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: ${transactionColor}; text-align: center;">¡Transacción ${type === 'income' ? 'recibida' : 'enviada'}!</h2>
        <p style="font-size: 16px; color: #333;">
          Hola <strong>${email}</strong>, has ${transactionTypeText} <strong style="color: ${transactionColor};">$${amount.toFixed(2)}</strong>.
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="#" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
            Ver detalles
          </a>
        </div>
        <p style="font-size: 14px; color: #777; text-align: center;">
          Si tienes alguna duda, revisa tu historial de transacciones en la aplicación.
        </p>
      </div>
    `;
  };
  
  export default transactionEmailTemplate;
  