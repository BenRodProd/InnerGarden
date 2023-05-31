export default async function fetchMotivationApi() {
    try {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomQuote = data[randomIndex];
      console.log(randomQuote)
      return randomQuote;
    } catch (error) {
      console.log("Error fetching motivation API:", error);
      return null;
    }
  }