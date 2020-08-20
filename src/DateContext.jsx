import React, {
    createContext,
    useState,
    useEffect
} from 'react';

export const DateContext = createContext();

export const DateProvider = ({ children }) => {
    const [currentDate, setCurrentDate] = useState({
        month: '',
        year: 0
    });
    const [isLoading, setIsLoading] = useState(true)
    
    

    useEffect( () => {
        const unsubscribe = () => {
            const date = new Date();
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            // const currentMonth
            //const currentYear 
            setCurrentDate({
                month: months[date.getMonth()],
                year: date.getFullYear()
            });
            setIsLoading(false);
        };
        unsubscribe();
        return () => {
            unsubscribe();
        }
    }, []);

    if (isLoading) {
        return <>Loading...</>
    }

    return (
        <DateContext.Provider
            value={ currentDate }
        >
            {children}
        </DateContext.Provider>
    )


}