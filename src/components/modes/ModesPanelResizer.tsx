import React, { MouseEvent, useEffect, useRef, useState } from "react";

type Props = {
    modesPanelRef: React.RefObject<HTMLDivElement>,
    anyModeActive: boolean
};

const ModePanel = ({ modesPanelRef, anyModeActive }: Props) => {
    const [isResizing, setIsResizing] = useState(false);
    const [initialWidth, setInitialWidth] = useState(0);
    const [initialX, setInitialX] = useState(0);
    const resizerRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (modesPanelRef.current && anyModeActive) {
            setInitialWidth(modesPanelRef.current.clientWidth);
            setInitialX(e.clientX);
            setIsResizing(true);
        }
    };

    useEffect(() => {
        const handleMouseUp = () => {
            setIsResizing(false);
            if (modesPanelRef.current) {
                modesPanelRef.current.classList.remove("resizing");
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            e.preventDefault();
            if (modesPanelRef.current && isResizing) {
                const newWidth = initialWidth - (e.clientX - initialX);
                modesPanelRef.current.style.width = newWidth >= 500 ? `${newWidth}px` : "";
                modesPanelRef.current.classList.add("resizing");
            }
        };

        const handleDocumentMouseMove = (e: MouseEvent) => handleMouseMove(e);
        const handleDocumentMouseUp = () => handleMouseUp();

        if (isResizing) {
            // @ts-expect-error Can't figure out how to get the type for this
            document.addEventListener("mousemove",  handleDocumentMouseMove);
            document.addEventListener("mouseup", handleDocumentMouseUp);
        }

        return () => {
            // @ts-expect-error Can't figure out how to get the type for this
            document.removeEventListener("mousemove", handleDocumentMouseMove);
            document.removeEventListener("mouseup", handleDocumentMouseUp);
        };
    }, [initialWidth, initialX, isResizing, modesPanelRef]);

    return modesPanelRef && (
        <div
            className={`modes-panel-resizer`}
            ref={resizerRef}
            onMouseDown={handleMouseDown}
        ></div>
    );
};

export default ModePanel;
