import  { useState } from 'react';

export function EmailInput() {
    const [email, setEmail] = useState('');
    const [suggestion, setSuggestion] = useState('');

    const handleChange = (e: any) => {
        const value = e.target.value;
        setEmail(value);

        const [username, domain] = value.split('@');
console.log(username)
        // Solo mostrar sugerencia si hay un `@` y el usuario no ha terminado de escribir el dominio.
        if (domain === '') {
            setSuggestion('gmail.com');
        } else if (domain && !domain.includes('.')) {
            // Mostrar sugerencias de dominio si el usuario aún no ha terminado el dominio
            if ('gmail.com'.startsWith(domain)) {
                setSuggestion('gmail.com');
            } else if ('hotmail.com'.startsWith(domain)) {
                setSuggestion('hotmail.com');
            } else {
                setSuggestion(''); // Si no coincide con ninguna sugerencia conocida
            }
        } else {
            setSuggestion(''); // Si el dominio está completo, no mostrar sugerencias
        }
    };

    // Función para completar el correo con la sugerencia
    const handleSuggestionClick = () => {
        const [username] = email.split('@');
        setEmail(`${username}@${suggestion}`);
        setSuggestion(''); // Ocultar sugerencia después de seleccionar
    };

    return (
        <div>
            <input
                type="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="border p-2 rounded"
            />
            {suggestion && (
                <div onClick={handleSuggestionClick} className="suggestion bg-gray-200 p-2 mt-1 cursor-pointer">
                    {email.split('@')[0]}@{suggestion}
                </div>
            )}
        </div>
    );
};
