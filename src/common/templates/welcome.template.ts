export const welcomeTemplate = (email: string): string => {
  return `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
    <h2 style="color: #4CAF50; text-align: center;">¡Bienvenido a nuestra aplicación, ${email}!</h2>
    <p style="font-size: 16px; color: #333;">
      Hola <strong>${email}</strong>, estamos emocionados de tenerte con nosotros. 
      Ahora puedes explorar todas las características de nuestra aplicación.
    </p>
    <div style="text-align: center; margin: 20px 0;">
      <a href="#" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
        Ir a la aplicación
      </a>
    </div>
    <p style="font-size: 14px; color: #777; text-align: center;">
      Si tienes alguna pregunta, no dudes en contactarnos. ¡Gracias por unirte a nosotros!
    </p>
  </div>
`;
};
