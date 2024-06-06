import styles from "./styles.module.css"
import { PiCursorFill } from "react-icons/pi";

export default function FocusWrapper() {
    return (
        <div className={styles.wrapper}>
            <h1>
                <PiCursorFill/>
                Click to start the game !
            </h1>
        </div>
    )
}
