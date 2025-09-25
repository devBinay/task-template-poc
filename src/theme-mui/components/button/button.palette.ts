import { getCssVar } from "@/theme-mui/palette";

export type ButtonState = "default" | "hover" | "focus" | "pressed" | "disabled";
export type ButtonSize = "large" | "medium" | "small" | "icon";

export const buttonPalette = {
    light: {
        default: {
            primary: {
                default: { bgColor:  getCssVar('--blue-500'), color: getCssVar('--white-0')},
                hover: { bgColor: getCssVar('--blue-600'), color: getCssVar('--white-0')},
                focus: { bgColor: getCssVar('--blue-500'), color: getCssVar('--white-0')},
                active: { bgColor: getCssVar('--blue-500'), color: getCssVar('--white-0') },
                disabled: { bgColor: getCssVar('--gray-100'), color: getCssVar('--gray-400')},
            },
            secondary: {
            
            }
        },
        danger: {
            primary: {
                default: { bgColor:  getCssVar('--red-500'), color: getCssVar('--white-0')},
                hover: { bgColor: getCssVar('--red-600'), color: getCssVar('--white-0')},
                focus: { bgColor: getCssVar('--red-500'), color: getCssVar('--white-0')},
                active: { bgColor: getCssVar('--red-500'), color: getCssVar('--white-0') },
                disabled: { bgColor: getCssVar('--gray-100'), color: getCssVar('--gray-400')},
            },
            secondary: {
            
            }
        }
    },
    dark: {
        default: {
            primary: {
                default: { bgColor:  getCssVar('--blue-400'), color: getCssVar('--white-0')},
                hover: { bgColor: getCssVar('--blue-400'), color: getCssVar('--white-0')},
                focus: { bgColor: getCssVar('--blue-400'), color: getCssVar('--white-0')},
                active: { bgColor: getCssVar('--blue-400'), color: getCssVar('--white-0') },
                disabled: { bgColor: getCssVar('--gray-800'), color: getCssVar('--gray-500')},
            },
            secondary: {
            
            }
        },
        danger: {
            primary: {
                default: { bgColor:  getCssVar('--red-400'), color: getCssVar('--white-0')},
                hover: { bgColor: getCssVar('--red-400'), color: getCssVar('--white-0')},
                focus: { bgColor: getCssVar('--red-400'), color: getCssVar('--white-0')},
                active: { bgColor: getCssVar('--red-400'), color: getCssVar('--white-0') },
                disabled: { bgColor: getCssVar('--gray-800'), color: getCssVar('--gray-500')}, 
            },
            secondary: {
            
            }
        }

    }
}