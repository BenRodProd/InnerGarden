export default async function fetchMotivationApi() {
    try {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomQuote = data[randomIndex];
     
      return randomQuote;
    } catch (error) {
  
      return null;
    }
  }