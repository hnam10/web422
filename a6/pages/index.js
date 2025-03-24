
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

import { Row, Col, Image } from "react-bootstrap";

function Home() {
    return (
        <>
            <Image
                src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
                alt="Metropolitan Museum of Art"
                fluid
                rounded
            />
            <Row className="mt-4">
                <Col md={6}>
                    <p>
                        The Metropolitan Museum of Art, colloquially "the Met", is the largest art
                        museum in the Americas. Its permanent collection contains over two million
                        works, divided among 17 curatorial departments.
                    </p>
                </Col>
                <Col md={6}>
                    <p>
                        The museum was founded in 1870 to bring art and art education to the
                        American people. Its collection includes works of art from classical
                        antiquity and ancient Egypt, paintings and sculptures from nearly all the
                        European masters, and an extensive collection of American and modern art.
                    </p>
                    <p>
                        Learn more on the{" "}
                        <a
                            href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Wikipedia page
                        </a>.
                    </p>
                </Col>
            </Row>
        </>
    );
}

export default Home;
