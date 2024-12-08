# **Tawk Assessment**

## **Weather App**

### **Overview**

This Assessment project is a Vue 3 SPA application that provides weather information using the OpenWeather API and OpenStreetMap.

---

### **Tech Stack**

- **Front-End**: Vue 3, TypeScript, Tailwind CSS
- **State Management**: Pinia
- **Validation**: Vuelidate
- **Icons**: Heroicons
- **Utilities**: VueUse
- **Networking**: Axios
- **Offline Support**: idb

---

### **Installation and Setup**

> ⚠️ **Enable Location**  
> On the first load of the application, a popup will request permission to access your current location.  
> **Please enable location services** to allow the app to display accurate weather data for your current location.

1. **Clone the repository**:
    ```sh
    git clone https://github.com/nabs32595/tawk-assesment.git
    cd tawk-assessment
    ```

2. **Set up environment variables**:
    - Copy the provided `.env.example` file and rename it to `.env`.
    - Fill in the necessary values for the environment variables.

   Example:
    ```sh
    cp .env.example .env
    ```

3. **Install dependencies**:
    ```sh
    npm install
    ```

4. **Start the development server**:
    ```sh
    npm run dev
    ```

---

### **Live Demo**

Access the live version of the application here: [Live Demo](https://nabilweather.netlify.app/)

---

### **Example Screenshots**

#### **Weather Dashboard**
![Weather Dashboard](https://via.placeholder.com/800x400?text=Weather+Dashboard)

#### **Location Permission Prompt**
![Location Permission Prompt](https://via.placeholder.com/800x400?text=Location+Permission+Prompt)

---
