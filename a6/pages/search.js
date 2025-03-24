import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";

function AdvancedSearch() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitForm = (data) => {
        let queryString = "searchBy=true";

        if (data.geoLocation) {
            queryString += `&geoLocation=${data.geoLocation}`;
        }
        if (data.medium) {
            queryString += `&medium=${data.medium}`;
        }
        queryString += `&isOnView=${data.isOnView}`;
        queryString += `&isHighlight=${data.isHighlight}`;
        queryString += `&q=${data.q}`;

        router.push(`/artwork?${queryString}`);
    };

    return (
        <Form onSubmit={handleSubmit(submitForm)}>
            <Form.Group className="mb-3">
                <Form.Label>Search Query</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter search query"
                    {...register("q", { required: true })}
                    className={errors.q ? "is-invalid" : ""}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Geo Location</Form.Label>
                <Form.Control type="text" placeholder="Optional" {...register("geoLocation")} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Medium</Form.Label>
                <Form.Control type="text" placeholder="Optional" {...register("medium")} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Check type="checkbox" label="Currently on View" {...register("isOnView")} />
                <Form.Check type="checkbox" label="Highlighted Work" {...register("isHighlight")} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default AdvancedSearch;
