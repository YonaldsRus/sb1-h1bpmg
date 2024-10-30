import * as React from "react";
import { LogService } from '../../services/logService';

type SearchBarProps = {
    onSearch: (query: string) => void;
    placeholder?: string;
    row?: string | number;
    col?: string | number;
    className?: string;
};

export function SearchBar({ 
    onSearch, 
    placeholder = "Search...", 
    row,
    col,
    className = ''
}: SearchBarProps) {
    const [searchText, setSearchText] = React.useState("");
    const logger = LogService.getInstance();
    const isMounted = React.useRef(true);

    React.useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    const handleTextChange = (args: any) => {
        try {
            if (isMounted.current) {
                setSearchText(args.value);
                onSearch(args.value);
            }
        } catch (error) {
            logger.error('Search text change error:', error as Error);
        }
    };

    const handleSubmit = () => {
        try {
            onSearch(searchText);
        } catch (error) {
            logger.error('Search submit error:', error as Error);
        }
    };

    return (
        <searchBar
            row={row}
            col={col}
            text={searchText}
            hint={placeholder}
            onTextChange={handleTextChange}
            onSubmit={handleSubmit}
            className={`bg-white border-b border-gray-200 p-2 ${className}`}
        />
    );
}