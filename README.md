# Pokémon Explorer

Pokémon Explorer is a modern, responsive web application built to help you discover, compare, and save your favorite Pokémon. It features a beautiful UI, smooth animations, and comprehensive details about every Pokémon.

## Features

- **Explore & Search:** Browse through the Pokédex and instantly search for any Pokémon by name.
- **Detailed Stats:** View in-depth information about a Pokémon including its type, stats, abilities, weight, and height.
- **Compare Pokémon:** Select two Pokémon side-by-side to compare their base stats directly.
- **Favorites System:** Save your favorite Pokémon to a dedicated list for quick access later.
- **Dark/Light Mode:** Seamlessly switch between a stunning dark theme and a clean light theme, complete with fluid animations.
- **Responsive Design:** Fully responsive UI that works flawlessly on desktop, tablet, and mobile devices.

## Tech Stack

- **Framework:** React 18 (with Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (with native custom variants)
- **Routing:** React Router DOM
- **Icons:** Lucide React

## API Used

This project is powered by the [PokéAPI](https://pokeapi.co/) (v2), a comprehensive RESTful API providing data for all things Pokémon.

## Installation

1. Clone the repository to your local machine:
   ```bash
   git clone <your-repository-url>
   ```
2. Navigate into the project directory:
   ```bash
   cd "Pipeline Ai assignment"
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```

## Running Locally

To start the development server, run the following command:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (or the port specified in your terminal) in your browser to view the app.

## Project Structure

```
src/
├── components/    # Reusable UI components (Navbar, PokemonCard, Hero, GlobalLoader)
├── contexts/      # React contexts (ThemeContext, FavoritesContext)
├── pages/         # Route-level components (Home, PokemonDetails, Compare, Favorites)
├── services/      # API communication logic (pokemonApi.ts)
├── styles/        # Global CSS and Tailwind configurations
├── types/         # TypeScript interfaces for API responses and component props
├── App.tsx        # Main application wrapper and router setup
└── main.tsx       # Entry point
```

## Challenges Faced

- **Managing Asynchronous Data:** Handling multiple API calls (e.g., fetching a list of Pokémon and then their individual details) required careful use of Promises and loading states to ensure a smooth user experience without race conditions.
- **Complex UI Animations:** Implementing the circular reveal animation for the dark/light mode toggle using the native View Transitions API was challenging, especially ensuring correct z-index stacking and graceful fallbacks across different browsers.
- **Responsive Layout Constraints:** Designing the fanned-out Hero cards to look dynamic on large screens while ensuring they don't overflow or crowd the viewport on narrow mobile devices required precise Tailwind CSS margin and scale adjustments.

## Future Improvements

- **Pagination & Infinite Scroll:** Instead of loading a fixed number of Pokémon, implement infinite scrolling or pagination to browse the entire PokéAPI database.
- **Advanced Filtering:** Add the ability to filter Pokémon by type, generation, or specific base stats.
- **Evolution Chains:** Display a visual evolution tree on the Pokémon Details page.
- **Caching:** Implement a caching solution (like React Query) to minimize duplicate API requests and improve load times when navigating between pages.
