# Nuvalance-ex

Tech exercise for Nuvalance backend position.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: This project requires Node.js version **`16.17.0`** or higher. You can download it from [here](https://nodejs.org/).

## Installation

1. Clone this repository: 
```bash
git clone https://github.com/Luis-Castilla/Nuvalance-ex.git
```
2. Navigate to the project directory in your terminal: 
```bash
cd Nuvalance-ex
```
3. Install the dependencies: 
```bash
npm install
```
## Commands

### Start Application
- Start the application in production mode:
```bash
npm start
```
- Start the application in development mode with Nodemon:

```bash
npm run start:dev
```

### Unit Test
- Run Unit Tests:
```bash
npm test
```
- Run Unit Tests with Coverage:
```bash
npm run test:cov
```

### Linting and Formatting
- Check for code style issues with ESLint:
```bash
npm run lint:check
```
- Automatically fix some code style issues with ESLint:
```bash
npm run lint:fix
```
- Check code formatting with Prettier:
```bash
npm run format:check
```
- Apply code formatting with Prettier:
```bash
npm run format:write
```

### JSDoc Documentation
- Generate documentation using JSDoc, After that, a folder named **`out`** will be created in root with the documentation:
```bash
npm run jsdoc
```

## Swagger

This project includes Swagger for API documentation. You can access the documentation at [http://localhost:3000/api-docs/v1](http://localhost:3000/api-docs/v1/#/).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.