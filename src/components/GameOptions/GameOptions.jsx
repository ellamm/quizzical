import { category, difficulty, type, amount } from "../../helpers/filters";
import SelectInput from "../SelectInput/SelectInput";
export default function GameOptions({ gameOptions, handleChange }) {
  console.log("gmame options", amount, type);
  return (
    <div>
      <SelectInput
        name="amount"
        label="Number of Questions"
        options={amount}
        value={gameOptions.amount}
        onChange={handleChange}
      />
      <SelectInput
        name="category"
        label="Category"
        options={category}
        value={gameOptions.category}
        onChange={handleChange}
      />
      <SelectInput
        name="difficulty"
        label="Difficulty"
        options={difficulty}
        value={gameOptions.difficulty}
        onChange={handleChange}
      />
      <SelectInput
        name="type"
        label="Type of questions"
        options={type}
        value={gameOptions.type}
        onChange={handleChange}
      />
    </div>
  );
}
