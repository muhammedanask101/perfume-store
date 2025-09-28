import { RefObject } from "react";

export const useDropdownPosition = (ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>) => {
    const getDropdownPosition = () => {
        if(!ref.current) return { top:0, left:0 };

        const rect = ref.current.getBoundingClientRect();
        const dropdownWidth = 240; // w-60 = 240px = 15rem (width of dropdown)

        // calculate initial position
        let left = rect.left + window.scrollX;
        const top = rect.bottom + window.scrollY;

        // check if dropdown would go off the right edge of the viewport
        if (left + dropdownWidth > window.innerWidth) {
            // Align to right edge of the button instead
            left = rect.right + window.scrollX - dropdownWidth;

            // If still off-screen, align to the right edge of viewport with some padding
            if (left < 0) {
                left = window.innerWidth - dropdownWidth - 16;

            }
        }

        // Ensure dropdown doesnt go off left edge
        if(left < 0) {
            left = 16;
        }
        return { top, left };
    }

    return { getDropdownPosition };
}