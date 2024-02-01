import { ReactNode } from "react"

export function Container({children}: {children: ReactNode } ){
    return(
        <div className="w-full max-w-7xl mx-auto px-8 mt-6" >
            {children}
        </div>
    )
}