import { css, html, LitElement, unsafeCSS, type PropertyValues } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import styles from "./config-layout-client.css?inline"
import ConfigLayoutClientScript, { type scrapProducts } from './ConfigLayoutClientScript';

export interface UsersEmpresaProductos {
    nombre: string;
    descripcion: string;
    precio: string;
}

export interface UsersEmpresaExampleResponses {
    pregunta: string;
    respuesta: string;
}

export interface dataResponse {
    empresa_nombre: string,
    empresa_correo: string,
    empresa_descripcion: string,
    empresa_prompt: string,
    empresa_example_responses: UsersEmpresaExampleResponses[], // Cambiado a array
    empresa_productos: UsersEmpresaProductos[], // Cambiado a array
    empresa_page_request_products: string
    empresa_pdf_data: string
}

@customElement('config-layout-client')
export class ConfigLayoutClient extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    
    @state() config: dataResponse = {
        empresa_nombre: "",
        empresa_correo: "",
        empresa_descripcion: "",
        empresa_prompt: "",
        empresa_example_responses: [], // Ahora es array
        empresa_productos: [], // Ahora es array
        empresa_page_request_products: "",
        empresa_pdf_data: ""
    }

    @query('input[name="empresa_nombre"]') in_empresa_nombre: HTMLInputElement
    @query('input[name="empresa_correo"]') in_empresa_correo: HTMLInputElement
    @query('textarea[name="empresa_descripcion"]') in_empresa_descripcion: HTMLTextAreaElement
    @query('textarea[name="empresa_prompt"]') in_empresa_prompt: HTMLTextAreaElement
    @query('input[name="empresa_page_request_products"]') in_empresa_page_request: HTMLInputElement
    
    @state() in_empresa_example_responses: Array<{ question: string, response: string }> = []
    @state() in_empresa_productos: Array<{ id: string, nombre: string, descripcion: string, precio: string }> = []
    private setIn_empresa_productos = (data :scrapProducts[] )=>{
        const newElements = []
        data.forEach(element => {
            const newProduct = {
                id: `prod_${Date.now()}`,
                nombre: element.nombre,
                descripcion: element.descripcion,
                precio: element.precio
            }
            newElements.push(newProduct)
        });
        this.in_empresa_productos = [...this.in_empresa_productos, ...newElements]
    }

    @state() modalVisible = false
    @state() modalMode: "add" | "edit" = "add"
    @state() currentProductIndex = -1
    @state() modalProductData = { nombre: "", descripcion: "", precio: "" }

    private setConfig = (e: dataResponse) => {
        this.config = e
        this.loadConfigToInputs()
    }

    protected firstUpdated(_changedProperties: PropertyValues): void {
        ConfigLayoutClientScript.loadData(this.setConfig)
    }

    private loadConfigToInputs() {
        // Cargar respuestas de ejemplo - soporta tanto array como objeto (legacy)
        const exampleResponses = this.config.empresa_example_responses || []
        
        if (Array.isArray(exampleResponses)) {
            // Formato nuevo (array)
            this.in_empresa_example_responses = exampleResponses.map(
                (data) => ({
                    question: data.pregunta,
                    response: data.respuesta
                })
            )
        } else {
            // Formato legacy (objeto) - convertir a array
            this.in_empresa_example_responses = Object.entries(exampleResponses).map(
                ([question, data]: [string, any]) => ({
                    question,
                    response: data.respuesta || data.response || ""
                })
            )
        }

        // Cargar productos - soporta tanto array como objeto (legacy)
        const productos = this.config.empresa_productos || []
        
        if (Array.isArray(productos)) {
            // Formato nuevo (array)
            this.in_empresa_productos = productos.map(
                (data, index) => ({
                    id: `prod_${index}_${Date.now()}`,
                    nombre: data.nombre,
                    descripcion: data.descripcion,
                    precio: data.precio
                })
            )
        } else {
            // Formato legacy (objeto) - convertir a array
            this.in_empresa_productos = Object.entries(productos).map(
                ([id, data]: [string, any]) => ({
                    id,
                    nombre: data.nombre,
                    descripcion: data.descripcion,
                    precio: data.precio
                })
            )
        }
    }

    private openModalAdd() {
        this.modalMode = "add"
        this.modalProductData = { nombre: "", descripcion: "", precio: "" }
        this.modalVisible = true
    }

    private openModalEdit(index: number) {
        this.modalMode = "edit"
        this.currentProductIndex = index
        const product = this.in_empresa_productos[index]
        this.modalProductData = {
            nombre: product.nombre,
            descripcion: product.descripcion,
            precio: product.precio
        }
        this.modalVisible = true
    }

    private closeModal() {
        this.modalVisible = false
        this.currentProductIndex = -1
        this.modalProductData = { nombre: "", descripcion: "", precio: "" }
    }

    private saveProduct() {
        if (!this.modalProductData.nombre.trim()) {
            alert("El nombre del producto es requerido")
            return
        }

        if (this.modalMode === "add") {
            this.in_empresa_productos = [
                ...this.in_empresa_productos,
                {
                    id: `prod_${Date.now()}`,
                    ...this.modalProductData
                }
            ]
        } else {
            this.in_empresa_productos[this.currentProductIndex] = {
                ...this.in_empresa_productos[this.currentProductIndex],
                ...this.modalProductData
            }
            this.in_empresa_productos = [...this.in_empresa_productos]
        }

        this.closeModal()
    }

    private deleteProduct(index: number) {
        // if (confirm("¿Estás seguro de eliminar este producto?")) {
        // }
        this.in_empresa_productos.splice(index, 1)
        this.in_empresa_productos = [...this.in_empresa_productos]
    }

    private async saveAllData() {
        // Validaciones
        if (!this.in_empresa_nombre?.value.trim()) {
            alert("El nombre de la compañía es requerido")
            return
        }
        if (!this.in_empresa_correo?.value.trim()) {
            alert("El correo es requerido")
            return
        }

        // Convertir respuestas de ejemplo a formato de BD (array de objetos)
        const in_empresa_example_responsesConvert: UsersEmpresaExampleResponses[] = []
        this.in_empresa_example_responses.forEach((e) => {
            if (e.question.trim()) {
                in_empresa_example_responsesConvert.push({
                    pregunta: e.question,
                    respuesta: e.response
                })
            }
        })

        // Convertir productos a formato de BD (array de objetos)
        const in_empresa_productosConvert: UsersEmpresaProductos[] = []
        this.in_empresa_productos.forEach((e) => {
            in_empresa_productosConvert.push({
                nombre: e.nombre,
                descripcion: e.descripcion,
                precio: e.precio
            })
        })

        const data: dataResponse = {
            empresa_nombre: this.in_empresa_nombre.value,
            empresa_correo: this.in_empresa_correo.value,
            empresa_descripcion: this.in_empresa_descripcion.value,
            empresa_prompt: this.in_empresa_prompt.value,
            empresa_example_responses: in_empresa_example_responsesConvert,
            empresa_productos: in_empresa_productosConvert,
            empresa_page_request_products: this.in_empresa_page_request?.value || "",
            empresa_pdf_data: this.config.empresa_pdf_data
        }

        try {
            await ConfigLayoutClientScript.saveData(data)
            console.log("✅ Datos guardados exitosamente:", data)
            alert("✅ Configuración guardada exitosamente")
            // Recargar la configuración para reflejar los cambios
            await ConfigLayoutClientScript.loadData(this.setConfig)
        } catch (error) {
            console.error("❌ Error al guardar:", error)
            alert("❌ Error al guardar la configuración. Por favor intenta de nuevo.")
        }
    }

    private addExampleResponse() {
        this.in_empresa_example_responses = [
            ...this.in_empresa_example_responses,
            { question: "", response: "" }
        ]
    }

    private removeExampleResponse(index: number) {
        this.in_empresa_example_responses.splice(index, 1)
        this.in_empresa_example_responses = [...this.in_empresa_example_responses]
    }

    render() {
        return html`
        <!-- Modal Producto -->
        <div class="modalProducto" style="display: ${this.modalVisible ? 'flex' : 'none'}">
            <div class="content">
                <div class="panel">
                    <h3>${this.modalMode === "add" ? "Agregar Producto" : "Editar Producto"}</h3>
                    
                    <span>Nombre del producto *</span>
                    <input 
                        type="text" 
                        .value=${this.modalProductData.nombre}
                        @input=${(e: Event) => {
                            const input = e.target as HTMLInputElement
                            this.modalProductData = { ...this.modalProductData, nombre: input.value }
                        }}
                        placeholder="Ej: Producto Premium"
                    >
                    
                    <span>Descripción del producto</span>
                    <textarea 
                        rows="3" 
                        .value=${this.modalProductData.descripcion}
                        @input=${(e: Event) => {
                            const input = e.target as HTMLTextAreaElement
                            this.modalProductData = { ...this.modalProductData, descripcion: input.value }
                        }}
                        placeholder="Describe el producto..."
                    ></textarea>
                    
                    <span>Precio del producto</span>
                    <input 
                        type="text" 
                        .value=${this.modalProductData.precio}
                        @input=${(e: Event) => {
                            const input = e.target as HTMLInputElement
                            this.modalProductData = { ...this.modalProductData, precio: input.value }
                        }}
                        placeholder="Ej: $50.000"
                    >
                    
                    <div class="modal-buttons">
                        <button type="button" @click=${this.saveProduct} class="save-btn">
                            ${this.modalMode === "add" ? "➕ Agregar" : "✏️ Guardar"}
                        </button>
                        <button type="button" @click=${this.closeModal} class="cancel-btn">
                            ❌ Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <h2>Configuraciones</h2>
        <form @submit=${(e: Event) => e.preventDefault()}>
            <div class="settings-section">
                
                <!-- Información de la Compañía -->
                <div class="settings-block">
                    <h3>Información de la compañía</h3>
                    <div class="field">
                        <label for="user-id">Nombre de la compañía *</label>
                        <input 
                            type="text" 
                            id="user-id" 
                            name="empresa_nombre" 
                            .value=${this.config.empresa_nombre}
                            placeholder="Mi compañía SAS"
                        >
                    </div>
                    <div class="field">
                        <label for="user-email">Correo público de contacto *</label>
                        <input 
                            type="email" 
                            id="user-email" 
                            name="empresa_correo" 
                            .value=${this.config.empresa_correo}
                            placeholder="contacto@micompania.com"
                        >
                    </div>
                    <div class="field">
                        <label for="business-context">Descripción del Negocio</label>
                        <textarea 
                            name="empresa_descripcion" 
                            id="business-context" 
                            rows="3" 
                            .value=${this.config.empresa_descripcion}
                            placeholder="Describe el enfoque del negocio..."
                        ></textarea>
                    </div>
                </div>

                <!-- Instrucciones IA -->
                <div class="settings-block">
                    <h3>Instrucciones IA</h3>
                    <div class="field">
                        <label for="context-prompt">
                            Aquí le especificas a tu asistente cómo debe actuar frente al cliente
                        </label>
                        <textarea 
                            name="empresa_prompt" 
                            id="context-prompt" 
                            rows="4"
                            .value=${this.config.empresa_prompt}
                            placeholder="Ej: Sé amable y profesional. Responde siempre en español. Enfócate en resolver dudas sobre nuestros productos..."
                        ></textarea>
                    </div>
                    <div class="field">
                        <button type="button" class="add-product-btn">🤖 Generar prompt con IA</button>
                    </div>
                </div>

                <!-- Ejemplos de respuestas -->
                <div class="settings-block">
                    <h3>Ejemplos de respuestas</h3>
                    <p class="helper-text">Ayuda a tu asistente con ejemplos de preguntas frecuentes</p>
                    <ul class="responses-list">
                        ${this.in_empresa_example_responses.map((element, index) => html`
                            <li class="response-item">
                                <div class="response-field">
                                    <span class="response-label">Pregunta</span>
                                    <input
                                        @input=${(e: Event) => {
                                            const input = e.target as HTMLInputElement
                                            this.in_empresa_example_responses[index].question = input.value
                                            this.in_empresa_example_responses = [...this.in_empresa_example_responses]
                                        }}
                                        type="text"
                                        .value=${element.question}
                                        class="response-input"
                                        placeholder="¿Cuál es el horario de atención?"
                                    />
                                </div>
                                <div class="response-field">
                                    <span class="response-label">Respuesta</span>
                                    <input
                                        @input=${(e: Event) => {
                                            const input = e.target as HTMLInputElement
                                            this.in_empresa_example_responses[index].response = input.value
                                            this.in_empresa_example_responses = [...this.in_empresa_example_responses]
                                        }}
                                        type="text"
                                        .value=${element.response}
                                        class="response-input"
                                        placeholder="Lunes a viernes de 8am a 6pm"
                                    />
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        class="response-remove"
                                        @click=${() => this.removeExampleResponse(index)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            </li>
                        `)}
                    </ul>
                    <button 
                        type="button"
                        @click=${this.addExampleResponse} 
                        class="add-item-btn"
                    >
                        ➕ Agregar Ejemplo
                    </button>
                </div>

                <!-- Productos -->
                <div class="settings-block">
                    <h3>Productos</h3>
                    <ul class="product-list">
                        ${this.in_empresa_productos.length === 0 
                            ? html`<li class="empty-state">No hay productos agregados</li>`
                            : this.in_empresa_productos.map((producto, index) => html`
                                <li class="product-item">
                                    <div class="product-info">
                                        <strong>${producto.nombre}</strong>
                                        ${producto.precio ? html`<span class="product-price">${producto.precio}</span>` : ''}
                                        ${producto.descripcion ? html`<p>${producto.descripcion}</p>` : ''}
                                    </div>
                                    <div class="product-actions">
                                        <button 
                                            type="button"
                                            class="edit-btn"
                                            @click=${() => this.openModalEdit(index)}
                                        >
                                            ✏️
                                        </button>
                                        <button 
                                            type="button"
                                            class="delete-btn"
                                            @click=${() => this.deleteProduct(index)}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </li>
                            `)
                        }
                    </ul>
                    <div class="field">
                        <button 
                            type="button"
                            class="add-product-btn" 
                            @click=${this.openModalAdd}
                        >
                            ➕ Agregar Producto
                        </button>
                    </div>
                    <div class="field">
                        <label for="page-request">
                            Aquí puedes cargar tus productos desde un sitio web
                        </label>
                        <input 
                            type="text" 
                            id="page-request" 
                            name="empresa_page_request_products"
                            .value=${this.config.empresa_page_request_products}
                            placeholder="https://www.dominio.com/tu-seccion"
                        >
                        <button @click=${(e)=>ConfigLayoutClientScript.cargarProductos(this.setIn_empresa_productos, this.in_empresa_page_request, e)} type="button" class="add-product-btn">🔗 Cargar Productos</button>
                    </div>
                </div>

                <!-- Acciones Finales -->
                <div class="settings-block">
                    <div class="field">
                        <button type="button" class="add-product-btn">📱 Contactanos si hay un error</button>
                        <button type="button" class="add-product-btn">🔗 Requerir soporte a un enlace</button>
                        <button type="button" class="add-product-btn">📁 Cargar datos desde un PDF</button>
                    </div>

                    <div class="field">
                        <button 
                            type="button" 
                            class="save-btn"
                            @click=${this.saveAllData}
                        >
                            ✅ Guardar Configuración
                        </button>
                    </div>
                    <div class="field">
                        <button 
                            type="button"
                            @click=${ConfigLayoutClientScript.logout} 
                            class="logout-btn"
                        >
                            🔓 Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </form>
        `
    }
}