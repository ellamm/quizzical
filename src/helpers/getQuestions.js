export default async function getQuestions({
  amount,
  category,
  difficulty,
  type,
}) {
  const params = new URLSearchParams();

  if (amount) params.append("amount", amount);
  if (category) params.append("category", category);
  if (difficulty) params.append("difficulty", difficulty);
  if (type) params.append("type", type);

  const apiURL = `https://opentdb.com/api.php?${params.toString()}`;

  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      return {
        success: false,
        results: [],
        error: `API response status: ${response.status}`,
      };
    }
    const data = await response.json();

    if (data.response_code !== 0) {
      return {
        success: false,
        results: [],
        error:
          "No questions found for the selected options. Please try different options.",
      };
    }

    console.log(data);
    return {
      success: true,
      results: data.results,
      error: null,
    };
  } catch (error) {
    console.error("Fetch error:", error.message);
    return {
      success: false,
      results: [],
      error: `Network or unexpected error: ${error.message}`,
    };
  }
}
