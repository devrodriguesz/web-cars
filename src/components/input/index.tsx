import { RegisterOptions, UseFormRegister } from "react-hook-form"
interface InputProps {
    type: string;
    placeholder: string;
    name: string;
    register: UseFormRegister<any>;
    error?: string;
    rules?: RegisterOptions;
}

export function Input({ name, placeholder, type, register, rules, error }: InputProps) {
    return (
        <div>
            <input
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none"
                placeholder={placeholder}
                type={type}
                {...register(name, rules)}
                id={name}
            />
            {error && <p className="text-red-500 ">{error}</p>}
        </div>
    )
}