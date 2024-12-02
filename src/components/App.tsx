import { useEffect, useMemo, useState } from "react";
import { TFeedbackItem } from "../lib/types";
import Footer from "./layout/Footer";
import Container from "./layout/Container";
import HashtagList from "./hashtag/HashtagList";
import HashtagItem from "./hashtag/HashtagItem";

function App() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const filteredFeedbackItems = useMemo(
    () =>
      selectedCompany ? feedbackItems.filter(feedbackItem => feedbackItem.company === selectedCompany) : feedbackItems,
    [feedbackItems, selectedCompany]
  );

  const companyList = useMemo(
    () =>
      feedbackItems
        .map(item => item.company)
        .filter((company, index, array) => {
          return array.indexOf(company) === index;
        }),
    [feedbackItems]
  );

  const handleAddToList = async (text: string) => {
    const companyName = text
      .split(" ")
      .find(word => word.includes("#"))! // funkcja jest zabezpieczona przed tym, że musi być '#', dlatego tu wiemy, że nie będzie przypadku że .find() zwróci undefined. (! - mówi coś w rodzaju, że my wiemy więcej niż TS)
      .substring(1);

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toLocaleUpperCase(),
    };

    setFeedbackItems([newItem, ...feedbackItems]);
    // setFeedbackItems(prev => [...prev, newItem])

    await fetch("https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks", {
      method: "POST",
      body: JSON.stringify(newItem),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };
  const handleSelectCompany = (company: string) => {
    setSelectedCompany(company);
  };

  useEffect(() => {
    const fetchFeedbackItems = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks");

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();
        setFeedbackItems(data.feedbacks);
      } catch (error) {
        setErrorMessage("Something went wrong. Please try again later.");
      }

      setIsLoading(false);
    };

    fetchFeedbackItems();
  }, []);

  return (
    <div className="app">
      <Footer />
      <Container
        isLoading={isLoading}
        feedbackItems={filteredFeedbackItems}
        errorMessage={errorMessage}
        handleAddToList={handleAddToList}
      />
      <HashtagList>
        {companyList.map(company => (
          <HashtagItem company={company} onSelectCompany={handleSelectCompany} />
        ))}
      </HashtagList>
    </div>
  );
}

export default App;
