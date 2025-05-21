import axios from "axios"

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000",
  timeout: 10_000
})

// 👉 глобальный перехват ошибок (по желанию)
http.interceptors.response.use(
  (r) => r,
  (e) => {
    console.error(e)
    // здесь можно вывести Element-Plus-уведомление
    return Promise.reject(e)
  }
)
