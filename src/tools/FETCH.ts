export default class FETCH {
    public static url = ""

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
        this.url = window.location.origin.includes("localhost") ? "http://localhost:3000" : "https://back.chatbotapp.shop";
        console.log(this.url);
        
        try {
            const res = await fetch(`${this.url}${endpoint}`, {
                ...this.defaultOptions(),
                method: "GET",
            });
            if (!res.ok) throw new Error(`Error ${res.status}`);
            const response = await res.json();
            console.log("->", response);
            
            return response
        } catch (err) {
            // console.error("FETCH GET error:", err);
            return null;
        }
    }

    /** POST request */
    public static async post(endpoint: string, data: any = {}) {
         this.url = window.location.origin.includes("localhost") ? "http://localhost:3000" : "https://back.chatbotapp.shop";
         console.log(this.url);
        try {
            const res = await fetch(`${this.url}${endpoint}`, {
                ...this.defaultOptions(),
                method: "POST",
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error(`Error ${res.status}`);
            const response =  await res.json();
            console.log("->", response);
            return response
        } catch (err) {
            // console.error("FETCH POST error:", err);
            return null;
        }
    }
}
