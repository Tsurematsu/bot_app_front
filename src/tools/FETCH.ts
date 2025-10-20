export default class FETCH {
    public static url = "http://localhost:3000";

    /** Opciones comunes para enviar cookies */
    private static defaultOptions(): RequestInit {
        return {
            credentials: "include", // ✅ esto envía cookies, incluso HttpOnly
            headers: {
                "Content-Type": "application/json",
            },
        };
    }

    /** GET request */
    public static async get(endpoint: string) {
        try {
            const res = await fetch(`${this.url}${endpoint}`, {
                ...this.defaultOptions(),
                method: "GET",
            });
            if (!res.ok) throw new Error(`Error ${res.status}`);
            return await res.json();
        } catch (err) {
            // console.error("FETCH GET error:", err);
            return null;
        }
    }

    /** POST request */
    public static async post(endpoint: string, data: any = {}) {
        try {
            const res = await fetch(`${this.url}${endpoint}`, {
                ...this.defaultOptions(),
                method: "POST",
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error(`Error ${res.status}`);
            return await res.json();
        } catch (err) {
            // console.error("FETCH POST error:", err);
            return null;
        }
    }
}
