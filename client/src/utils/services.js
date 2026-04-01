    export const BaseUrl = "http://localhost:2000/api";

    export const PostRequest=async (url, body) => {
    console.log("Making POST request to:", url);
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body,
            });
            const data = await response.json();
        if (!response.ok) {
        
            let message;
                if (data?.message) {
                    message = data.message;
                } else {
                    message = data;
                }
                return { error: true, message };
            }
        return data;
    };

    export const getRequest=async (url) => {
        console.log("Making GET request to:", url);
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                // parse safely (some error responses may be HTML or empty)
                let data = null;
                try {
                    const text = await response.text();
                    data = text ? JSON.parse(text) : null;
                } catch (e) {
                    // non-JSON response (e.g., HTML 404 page) or empty body
                    data = null;
                }
                if (!response.ok) {
                    const message = data && data.message ? data.message : `Request failed with status ${response.status}`;
                    return { error: true, message, status: response.status };
                }
                return data;
        };  