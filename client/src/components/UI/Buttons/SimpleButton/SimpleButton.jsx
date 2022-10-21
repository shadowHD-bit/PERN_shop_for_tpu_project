import styles from './SimpleButton.scss'

export const SimpleButton = ({children, callback}) => {
    return(
        <button onClick={callback} style={styles.button}>
            {children}
        </button>
    )
}