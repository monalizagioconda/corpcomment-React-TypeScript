import Footer from "./layout/Footer";
import Container from "./layout/Container";
import HashtagList from "./hashtag/HashtagList";
import { feedbackItemsSelector, useFeedbackItemsStore } from "../stores/feedbackItemsStore";
import { useEffect } from "react";

function App() {
  const fetchFeedbackItems = useFeedbackItemsStore(feedbackItemsSelector);

  useEffect(() => {
    fetchFeedbackItems();
  }, [fetchFeedbackItems]);

  return (
    <div className="app">
      <Footer />

      <Container />

      <HashtagList />
    </div>
  );
}

export default App;
