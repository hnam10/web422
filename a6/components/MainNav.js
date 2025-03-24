import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "/store";

function MainNav() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchField, setSearchField] = useState("");
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchField.trim() !== "") {
      let queryString = `title=true&q=${searchField}`;
      setSearchHistory((current) => [...current, queryString]);
      router.push(`/artwork?${queryString}`);
    }
    setIsExpanded(false);
  };

  return (
    <>
      <Navbar
        expanded={isExpanded}
        expand="lg"
        className="fixed-top navbar-dark bg-dark"
      >
        <Container>
          <Navbar.Toggle onClick={() => setIsExpanded(!isExpanded)} />
          <Navbar.Brand>Hansol Nam</Navbar.Brand>
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                href="/"
                active={router.pathname === "/"}
                onClick={() => setIsExpanded(false)}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                href="/search"
                active={router.pathname === "/search"}
                onClick={() => setIsExpanded(false)}
              >
                Advanced Search
              </Nav.Link>
            </Nav>
            &nbsp;
            <Form className="d-flex" onSubmit={handleSearchSubmit}>
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
              />
              <Button type="submit" variant="outline-light">
                Search
              </Button>
            </Form>
            &nbsp;
            <Nav>
              <NavDropdown title="User Name" id="basic-nav-dropdown">
                <NavDropdown.Item
                  as={Link}
                  href="/favourites"
                  active={router.pathname === "/favourites"}
                  onClick={() => setIsExpanded(false)}
                >
                  Favourites
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  href="/history"
                  active={router.pathname === "/history"}
                  onClick={() => setIsExpanded(false)}
                >
                  Search History
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}

export default MainNav;
