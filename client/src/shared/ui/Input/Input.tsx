import styles from "./Input.module.scss";

interface Props{
    label: string;
    before?: string;
    errorMessage?: string;
    wrapperClassName?: string;
    id?: string;
    placeholder?: string;
}

export default function Input({
                                  label,
                                  before,
                                  errorMessage,
                                  wrapperClassName = "",
                                  id,
                                  placeholder,
                                  ...props
                              }: Props) {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
        <div className={`${styles.container} ${wrapperClassName}`}>
            {label && (
                <label htmlFor={inputId} className={styles.label}>
                    {label}
                </label>
            )}

            <div
                className={`${styles.wrapper} ${
                    errorMessage ? styles.error : ""
                }`}
            >
                {before && <span className={styles.before}>{before}</span>}

                <input
                    id={inputId}
                    placeholder={placeholder}
                    className={`${styles.input}`}
                    {...props}
                />
            </div>

            {errorMessage && <span className={styles.errorText}>{errorMessage}</span>}
        </div>
    );
}