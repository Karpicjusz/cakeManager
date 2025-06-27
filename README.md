 # Moli Cakes - Custom Cake Configurator (React Version)

 Welcome to Moli Cakes, a modern web application built with React that allows users to design and visualize their perfect custom cake step-by-step. This application showcases an interactive configurator, real-time cake visualization, and a clean, responsive user interface.

 ## ✨ Features

 *   **Interactive Cake Configurator:** A guided, multi-step process to customize various aspects of a cake, including:
     *   Cake Size (number of persons, automatically determines tiers)
     *   Sponge Type (with optional Stevia/Erythritol)
     *   Creme Flavour
     *   Creme Flavour (two distinct layers)
     *   Optional Crisp Layer
     *   Decoration Ideas (upload inspiration photo, text description)
     *   Custom Text Message (max 3 words)
     *   Delivery Date and Time
 *   **Real-time Cake Visualization:** As users make selections, the cake visualization updates dynamically, showing:
     *   A 3D-ish representation of the cake tiers.
     *   A "layer view" that visually breaks down the cake's internal components (sponge, creme, gelly, crisp) with their selected colors.
 *   **Responsive Design:** Optimized for a seamless experience across various devices (desktop, tablet, mobile).
 *   **React Context API:** Efficient state management for the configurator's complex state.
 *   **React Router:** Smooth client-side navigation between different sections of the application.
 *   **Modular Component Structure:** Well-organized components for maintainability and scalability.

 ## 🚀 Technologies Used

 *   **React.js:** Frontend JavaScript library for building user interfaces.
 *   **React Router DOM:** Declarative routing for React.
 *   **React Context API & `useReducer` Hook:** For robust and centralized state management.
 *   **CSS Modules:** For scoped and modular styling, preventing style conflicts.
 *   **JavaScript (ES6+):** Core language for application logic.

 ## 🛠️ Setup and Installation

 To get this project up and running on your local machine, follow these steps:

 ### Prerequisites

 Make sure you have the following installed:

 *   **Node.js:** (LTS version recommended) - Download from nodejs.org.
 *   **npm** (Node Package Manager) or **Yarn** - Usually comes bundled with Node.js.

 ### Installation Steps

 1.  **Clone the repository:**
     ```bash
     git clone https://github.com/your-username/molicares-react.git # Replace with actual repo URL
     cd molicares-react/ReactVersion # Adjust path if necessary
     ```

 2.  **Install dependencies:**
     ```bash
     npm install
     # OR
     yarn install
     ```

 3.  **Run the development server:**
     ```bash
     npm start
     # OR
     yarn start
     ```

     This will open the application in your default web browser at `http://localhost:3000`.

 ## 📂 Project Structure

 The project follows a standard React application structure, organized for clarity and maintainability:

 ```
 src/
 ├── App.js                     # Main application component, defines routes
 ├── index.js                   # Entry point of the React application
 ├── components/                # Reusable UI components
 │   ├── common/                # Generic, widely used components
 │   │   └── Option.js          # Selectable option card for configurator steps
 │   ├── configurator/          # Components specific to the cake configurator
 │   │   ├── steps/             # Individual step components (e.g., SpongeStep, SizeStep)
 │   │   │   ├── CremeStep.js
 │   │   │   ├── CrispStep.js
 │   │   │   ├── DecorationsStep.js
 │   │   │   ├── DeliveryStep.js
 │   │   │   ├── GellyStep.js
 │   │   │   ├── SizeStep.js
 │   │   │   ├── SpongeStep.js
 │   │   │   ├── TextStep.js
 │   │   │   └── Step.module.css # Styles for all step components
 │   │   ├── CakeVisualization.js # Component to display the cake visually
 │   │   ├── ConfigStep.js      # Wrapper component for each configurator step
 │   │   ├── Configurator.js    # Orchestrates all configurator steps
 │   │   ├── CakeVisualization.module.css
 │   │   ├── ConfigStep.module.css
 │   │   └── Configurator.module.css
 │   └── layout/                # Layout-specific components
 │       ├── Navbar.js          # Navigation bar
 │       └── Navbar.module.css
 ├── constants/                 # Application-wide constants
 │   └── cakeOptions.js         # Defines cake options, step order, and tier configurations
 ├── context/                   # React Context for global state management
 │   └── ConfiguratorContext.js # Manages the configurator's state
 ├── hooks/                     # Custom React Hooks
 │   └── useConfigurator.js     # Hook to access ConfiguratorContext
 ├── pages/                     # Top-level page components
 │   ├── ConfiguratorPage.js    # Page for the cake configurator
 │   ├── HomePage.js            # Landing page
 │   ├── PortfolioPage.js       # Portfolio display page
 │   ├── ConfiguratorPage.module.css
 │   ├── HomePage.module.css
 │   └── PortfolioPage.module.css
 ├── styles/                    # Global styles
 │   └── global.css             # CSS variables and base styles
 └── utils/                     # Utility functions
     ├── dateUtils.js           # Date formatting and calculation utilities
     └── validationUtils.js     # Input validation utilities
 ```

 ## 📝 Detailed Project Description

 ### Application Flow

 The `App.js` component sets up the main routing using `react-router-dom`. The application has three main pages: `HomePage`, `PortfolioPage`, and `ConfiguratorPage`. The `ConfiguratorPage` is where the core functionality resides.

 The `index.js` file wraps the entire application with `BrowserRouter` and `ConfiguratorProvider`, making the configurator's state accessible throughout the component tree.

 ### State Management with `ConfiguratorContext`

 The heart of the configurator's interactivity is the `ConfiguratorContext` (defined in `src/context/ConfiguratorContext.js`). It uses React's `useReducer` hook to manage a complex state object, `initialState`, which includes:

 *   `activeStep`: The currently expanded step in the configurator.
 *   `steps`: An object mapping step IDs to their `status` (`locked`, `active`, `default`, `completed`) and `isCompleted` boolean. This controls the UI and flow of the configurator.
 *   `cake`: An object storing all the user's selections for the cake (e.g., `spongeType`, `cremeType`, `persons`, `deliveryDate`).
 *   `isLayerView`: A boolean to toggle between the 3D-ish cake visualization and the layered cross-section view.

 The `reducer` function handles various actions:

 *   `SET_ACTIVE_STEP`: Changes the currently active (expanded) step. It prevents navigating to `locked` steps directly. It also updates `isLayerView` based on the active step.
 *   `COMPLETE_STEP`: This is the primary action dispatched by individual step components when a user makes a selection. It updates the `cake` state with the new value, marks the current `stepId` as `isCompleted`, and crucially, unlocks the `nextStepId` if it's currently `locked`. It also contains logic to handle optional steps (like Gelly and Crisp) where unselecting an option marks the step as `isCompleted: false`.
 *   `SET_PERSONS`: Specifically updates the `persons` count and dynamically calculates the `tiers` based on the number of persons.

 The `useConfigurator` custom hook (`src/hooks/useConfigurator.js`) provides a convenient way for any component to access the `state` and `dispatch` function from the context.

 ### Configurator Components

 *   **`Configurator.js`**: This component (`src/components/configurator/Configurator.js`) is the main container for all the configurator steps. It iterates through the `STEP_ORDER` constant (from `src/constants/cakeOptions.js`) and renders a `ConfigStep` for each.
 *   **`ConfigStep.js`**: This component (`src/components/configurator/ConfigStep.js`) acts as a wrapper for each individual configuration step. It displays the step title, number, and status. It manages the expand/collapse behavior and uses the `status` from the `ConfiguratorContext` to apply appropriate styling (`active`, `completed`, `locked`). It dispatches `SET_ACTIVE_STEP` when toggled.
 *   **Individual Step Components (`src/components/configurator/steps/`)**: Each file in this directory (e.g., `SpongeStep.js`, `CremeStep.js`) represents a single step in the cake configuration process.
     *   They use `useConfigurator()` to access and update the global state.
     *   They render `Option` components (for selectable choices) or input fields (for text, date).
     *   When a user interacts (e.g., selects an option, types text), they dispatch `COMPLETE_STEP` actions with the relevant `stepId`, `nextStepId`, and `value` to update the `cake` state and manage step completion/unlocking.
     *   **`SizeStep.js`**: Uses a slider to select the number of persons and updates the `tiers` in the cake state.
     *   **`SpongeStep.js`**: Includes a checkbox for an optional "Stevia/Erythritol" modification, which only applies if that sponge type is selected.
     *   **`DecorationsStep.js`**: Handles file uploads for inspiration photos and a textarea for detailed descriptions.
     *   **`TextStep.js`**: Implements real-time validation for a custom text message, limiting it to 3 words using `validationUtils.js`.
     *   **`DeliveryStep.js`**: Uses `dateUtils.js` to enforce a minimum delivery date (7 days in advance) and format the selected date.

 ### Cake Visualization

 *   **`CakeVisualization.js`**: This component (`src/components/configurator/CakeVisualization.js`) is responsible for rendering the visual representation of the cake.
     *   It consumes the `cake` state and `isLayerView` from `ConfiguratorContext`.
     *   It uses `useMemo` to efficiently calculate the background colors for the cake layers based on the selected sponge, creme, gelly, and crisp types from `CAKE_OPTIONS`.
     *   It conditionally renders either the multi-tier cake view or the layered cross-section view based on the `isLayerView` state, which is controlled by the `SET_ACTIVE_STEP` action in the context.

 ### Utility Functions

 *   **`dateUtils.js`**: Provides helper functions for calculating the minimum allowed delivery date and formatting dates for display.
 *   **`validationUtils.js`**: Contains logic for validating the custom text input (e.g., word count).

 ### Styling

 The application uses a combination of global CSS and CSS Modules:

 *   **`src/styles/global.css`**: Defines CSS variables for consistent theming (colors, fonts) and applies global resets and base styles.
 *   **`*.module.css` files**: Each component has its own `.module.css` file (e.g., `Option.module.css`, `ConfigStep.module.css`). This approach scopes CSS classes locally, preventing naming collisions and making styles easier to manage.

 ### Constants

 *   **`src/constants/cakeOptions.js`**: A central place to define all static data related to cake options, including:
     *   `STEP_ORDER`: The order in which configurator steps appear.
     *   `CAKE_OPTIONS`: Detailed configuration for each step, including `id`, `title`, `next` step, and `options` (with `id`, `name`, `description`, `color`).
     *   `TIER_CONFIGS`: Defines the person ranges for single, double, and triple-tier cakes.

 ## 📖 User Guide

 This guide will walk you through using the Moli Cakes configurator to design your custom cake.

 ### Navigation

 *   **Home:** The landing page, providing an overview of Moli Cakes and calls to action.
 *   **Portfolio:** Browse examples of custom cakes created by Moli Cakes.
 *   **Configure Cake:** This is where you'll design your cake using the interactive configurator.

 ### Designing Your Cake (Configurator Page)

 The configurator is a step-by-step process. You'll see a list of steps on the left (or top on mobile) and a real-time cake visualization on the right (or bottom on mobile).

 1.  **Cake Size:**
     *   Use the slider to select the approximate number of people your cake needs to serve.
     *   As you adjust, notice how the "Number of Tiers" and the cake visualization update automatically.
     *   Once you've selected a size, the next step ("Sponge Cake") will become active.

 2.  **Sponge Cake:**
     *   Choose your preferred sponge type from the available options.
     *   **Optional:** For the selected sponge, you can check the "Use Stevia/Erythritol" checkbox if you prefer a sugar-free alternative. This option is only enabled for the currently selected sponge.
     *   Selecting a sponge will activate the "Creme Flavour" step.

 3.  **Creme Flavour:**
     *   You will be prompted to select two different creme flavours, one for each layer of your cake.
     *   Choose your first flavour for "Creme Layer 1" and then your second for "Creme Layer 2".
     *   Once both are selected, this will activate the "Gelly Fruit" step.

 4.  **Gelly Fruit (Optional):**
     *   This is an optional layer. If you wish to include a gelly fruit layer, select one of the flavors.
     *   If you change your mind and want to remove the gelly layer, simply click on the *currently selected* gelly option again to unselect it.
     *   Whether you select an option or not, the "Crisp Layer" step will become active.

 5.  **Crisp Layer (Optional):**
     *   Similar to the Gelly Fruit step, this is an optional layer. Select a crisp layer if desired.
     *   Clicking a selected crisp option again will unselect it.
     *   This will activate the "Decorations" step.

 6.  **Decorations (Optional):**
     *   This step allows you to specify your decoration ideas.
     *   **Upload Inspiration Photo:** Click the "Upload Inspiration Photo" area to select an image file (JPG, PNG, max 5MB) from your device.
     *   **Describe Your Decoration Ideas:** Use the text area to describe your vision for the cake's decorations. There's a character limit to guide you.
     *   This step is optional, you can proceed without providing details.
     *   This will activate the "Custom Text" step.

 7.  **Custom Text (Optional):**
     *   Enter a short message you'd like on your cake (e.g., "Happy Birthday").
     *   **Important:** The message is limited to a maximum of 3 words. The input field will provide real-time feedback on your word count.
     *   This step is optional.
     *   This will activate the "Delivery Date" step.

 8.  **Delivery Date:**
     *   **Choose Delivery Date:** Select your preferred delivery date using the date picker. Please note that orders must be placed at least 7 days in advance.
     *   **Preferred Pick-up Time:** Select a preferred time for pick-up.
     *   Once you select a date, it will be displayed below the input fields.

 ### Cake Visualization

 On the right side of the configurator page, you'll see the "Cake Visualization" area.

 *   **3D-ish Cake View:** When you are on steps like "Cake Size" or "Decorations", you'll see a visual representation of your cake with the selected number of tiers.
 *   **Layer View:** When you are on steps related to internal components (Sponge, Creme, Gelly, Crisp), the visualization will switch to a "layer view" showing a cross-section of your cake with the selected colors for each layer. This helps you visualize the internal composition.

 ### Price Calculator
 *   Currently, the price calculator is a placeholder. Pricing functionality is planned for future updates.
 *   Note: Selecting two creme flavours does not currently affect the placeholder price.

 ## 🤝 Contributing

 Contributions are welcome! If you have suggestions for improvements or new features, please feel free to open an issue or submit a pull request.

 ## 📄 License

 This project is open-source and available under the MIT License.

 ---

 *Designed with ❤️ by Moli Cakes Team*