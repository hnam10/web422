
/*********************************************************************************
*  WEB422 – Assignment 5
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Hansol Nam Student ID: 113021190 Date: Mar. 23 2025
*
*
********************************************************************************/ 

import { useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Row, Col, Card, Pagination } from "react-bootstrap";
import ArtworkCard from "../../components/ArtworkCard";
import Error from "next/error";
import validObjectIDList from "../../public/data/validObjectIDList.json"; 

const PER_PAGE = 12;
const fetcher = (url) => fetch(url).then((res) => res.json());

function Artwork() {
  const [artworkList, setArtworkList] = useState(null);
  const [page, setPage] = useState(1);

  const router = useRouter();
  const finalQuery = router.asPath.split("?")[1];

  // Fetch Met Museum search results
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`,
    fetcher
  );

  // When `data` is loaded, filter out invalid IDs using `validObjectIDList`
  useEffect(() => {
    if (data && data.objectIDs) {
      // 1) Filter only IDs that exist in our valid list
      const filteredResults = validObjectIDList.objectIDs.filter((x) =>
        data.objectIDs.includes(x)
      );

      // 2) Break them into pages of size PER_PAGE
      const results = [];
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        results.push(filteredResults.slice(i, i + PER_PAGE));
      }

      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  // Pagination handlers
  const previousPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const nextPage = () => {
    if (artworkList && page < artworkList.length) setPage((prev) => prev + 1);
  };

  // Error / Loading states
  if (error) return <Error statusCode={404} />;
  if (!artworkList) return null; // or <p>Loading...</p>;

  return (
    <>
      <Row className="gy-4">
        {artworkList.length > 0 ? (
          artworkList[page - 1].map((objectID) => (
            <Col lg={3} key={objectID}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))
        ) : (
          <Col>
            <Card>
              <Card.Body>
                <h4>Nothing Here</h4>
                Try searching for something else.
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>

      {artworkList.length > 0 && (
        <Row className="mt-4">
          <Col className="d-flex justify-content-center">
            <Pagination>
              <Pagination.Prev onClick={previousPage} disabled={page === 1} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} disabled={page === artworkList.length} />
            </Pagination>
          </Col>
        </Row>
      )}
    </>
  );
}

export default Artwork;
