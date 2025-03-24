import useSWR from "swr";
import { useAtom } from "jotai";
import { useState } from "react";
import { favouritesAtom } from "../store";

import { Card, Button } from "react-bootstrap";
import Error from "next/error";

const fetcher = (url) => fetch(url).then((res) => res.json());

function ArtworkCardDetail({ objectID }) {
    const { data, error } = useSWR(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
        fetcher
    );
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(favouritesList.includes(objectID));

    const favouritesClicked = () => {
        if (showAdded) {
            setFavouritesList((current) => current.filter((fav) => fav !== objectID));
            setShowAdded(false);
        } else {
            setFavouritesList((current) => [...current, objectID]);
            setShowAdded(true);
        }
    };

    if (error) return <Error statusCode={404} />;
    if (!data) return null; // If data is not available yet

    return (
        <Card>
            {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} alt={data.title || "N/A"} />}
            <Card.Body>
                <Card.Title>{data.title || "N/A"}</Card.Title>
                <Card.Text>
                    <strong>Date:</strong> {data.objectDate || "N/A"} <br />
                    <strong>Classification:</strong> {data.classification || "N/A"} <br />
                    <strong>Medium:</strong> {data.medium || "N/A"}
                </Card.Text>
                <br />
                <br />
                <Card.Text>
                    <strong>Artist:</strong>{" "}
                    {data.artistDisplayName ? (
                        <>
                            {data.artistDisplayName}{" "}
                            {data.artistWikidata_URL && (
                                <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">
                                    wiki
                                </a>
                            )}
                        </>
                    ) : (
                        "N/A"
                    )}
                    <br />
                    <strong>Credit Line:</strong> {data.creditLine || "N/A"} <br />
                    <strong>Dimensions:</strong> {data.dimensions || "N/A"}
                </Card.Text>
                <Button
                    variant={showAdded ? "primary" : "outline-primary"}
                    onClick={favouritesClicked}
                >
                    {showAdded ? "+ Favourite (added)" : "+ Favourite"}
                </Button>
            </Card.Body>
        </Card>
    );
}

export default ArtworkCardDetail;
