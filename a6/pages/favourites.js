import { useAtom } from "jotai";
import { Row, Col, Card } from "react-bootstrap";
import ArtworkCard from "../components/ArtworkCard";
import { favouritesAtom } from "../store";

function Favourites() {
    const [favouritesList] = useAtom(favouritesAtom); // ✅ 즐겨찾기 목록 가져오기

    return (
        <>
            <h1>Favourites</h1>
            <Row className="gy-4">
                {favouritesList.length > 0 ? (
                    favouritesList.map((objectID) => (
                        <Col lg={3} key={objectID}>
                            <ArtworkCard objectID={objectID} />
                        </Col>
                    ))
                ) : (
                    <Col>
                        <Card>
                            <Card.Body>
                                <h4>Nothing Here</h4>
                                Try adding some new artwork to the list.
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
        </>
    );
}

export default Favourites;
