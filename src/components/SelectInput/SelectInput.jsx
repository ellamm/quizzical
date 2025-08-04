import styles from "./selectInput.module.css";

export default function SelectInput({ name, label, options, onChange, value }) {
  return (
    <div className={styles.selectContainer}>
      <label htmlFor={name} className={styles.selectLabel}>
        {label}:
      </label>
      <select
        name={name}
        id={name}
        className={styles.selectStyle}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
