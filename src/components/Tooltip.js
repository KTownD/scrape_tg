import './Tooltip.css';

export default function Tooltip({ tooltipText, position, children }) {

    // Changed to using sibling divs so that hover effect wouldn't pic up on the
    // tooltip div, just the tooltip-trigger div.
    return (
        <>
            <div className="tooltip-trigger">
                {children}
            </div>

            <div className={`tooltip tooltip-${position}`}>
                {tooltipText}
            </div>
        </>
    )
}
