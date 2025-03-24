import { useAtom } from "jotai";
import { searchHistoryAtom } from "/store";
import { useRouter } from "next/router";
import { Container, ListGroup, Button, Card } from "react-bootstrap";
import styles from "../styles/History.module.css"; 

function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  let parsedHistory = [];
  searchHistory.forEach((h) => {
    const params = new URLSearchParams(h);
    parsedHistory.push(Object.fromEntries(params.entries()));
  });

  // Navigate to the artwork page with the query string when a history item is clicked
  const historyClicked = (e, index) => {
    router.push(`/artwork?${searchHistory[index]}`);
  };

  // Remove a history item from the atom
  const removeHistoryClicked = (e, index) => {
    e.stopPropagation(); // Prevent the click from triggering historyClicked
    setSearchHistory((current) => {
      const updated = [...current];
      updated.splice(index, 1);
      return updated;
    });
  };

  return (
    <Container>
      <h1>Search History</h1>
      {parsedHistory.length === 0 ? (
        <Card>
          <Card.Body>
            <h4>Nothing Here</h4>
            Try searching for some artwork.
          </Card.Body>
        </Card>
      ) : (
        <ListGroup>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item
              key={index}
              className={styles.historyListItem}
              onClick={(e) => historyClicked(e, index)}
            >
              {Object.keys(historyItem).map((key) => (
                <span key={key}>
                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </span>
              ))}
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}

export default History;
