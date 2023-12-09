import { useState, useEffect } from "react";
import ThemeContext from "./themeContext";

const ThemeState = (props) => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        getTheme();
    }, [])

    const getTheme = () => {
        const u = localStorage.getItem('cwl-theme') ? localStorage.getItem('cwl-theme') : '{"theme":"light"}';
        const parsed = JSON.parse(u);
        setTheme(parsed.theme);
    }

    const changeTheme = (theme) => {
        const u = localStorage.getItem('cwl-theme') ? localStorage.getItem('cwl-theme') : '{"theme":"light"}';
        const parsed = JSON.parse(u);
        parsed['theme'] = theme;
        setTheme(theme);
        localStorage.setItem('cwl-theme', JSON.stringify(parsed));
        return theme;
    }

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeState;
