import { useRouter } from "next/router";
import ArtworkCardDetail from "../../components/ArtworkCardDetail";

function ArtworkDetailsPage() {
  const router = useRouter();
  const { objectID } = router.query; // Extract objectID from the URL

  // Initially, router.query may be empty
  if (!objectID) return <p>Loading...</p>;

  return <ArtworkCardDetail objectID={objectID} />;
}

export default ArtworkDetailsPage;
