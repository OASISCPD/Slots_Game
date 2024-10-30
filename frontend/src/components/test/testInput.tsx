import { useState } from "react";
import Select from "react-select";

const emailDomains = [
    { value: "@gmail.com", label: "@gmail.com" },
    { value: "@yahoo.com", label: "@yahoo.com" },
    { value: "@outlook.com", label: "@outlook.com" },
    { value: "@hotmail.com", label: "@hotmail.com" },
    { value: "custom", label: "Otro dominio" },
];

export function EmailInput() {
    const [username, setUsername] = useState("");
    const [domain, setDomain] = useState(emailDomains[0]);

    const handleDomainChange = (selectedOption: any) => {
        setDomain(selectedOption);
    };

    return (
        <div>
            <h1>Email</h1>
            <div className="flex">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="username"
                    className=""
                />
                <Select
                    options={emailDomains}
                    value={domain}
                    onChange={handleDomainChange}
                    className=""
                    placeholder="@domain"
                />
                {domain.value === "custom" && (
                    <input
                        type="text"
                        placeholder="otherdomain.com"
                        onChange={(e) => setDomain({ value: `@${e.target.value}`, label: `@${e.target.value}` })}
                        className="border p-2 ml-2"
                    />
                )}
            </div>
            <p>Email: {`${username}${domain.value !== "custom" ? domain.value : ""}`}</p>
        </div>
    );
}
