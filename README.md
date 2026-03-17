# dnnr.dev tools

A powerful, entirely browser-based collection of developer and everyday utilities, built to be secure, fast, and 100% local. 

This project aims to provide a unified workspace for frequently used tools like JSON formatters, base64 encoders, SVG optimizers, cron generators, and more. Because everything runs purely on the client-side, your data never leaves your machine. No tracking, no data collection, no server-side processing for your sensitive strings or files.

![dnnr.dev tools](public/favicon.ico) *A minimalist, open-source approach to essential digital tools.*

## 🚀 Features

`dnnr.dev tools` includes a growing list of utilities accessible from a sleek sidebar interface:

- **JSON Tool**: Format, validate, and minify JSON data.
- **Diff Checker**: Compare two text/code snippets side-by-side to find differences.
- **To Do**: A simple, locally-saved task manager to keep track of your daily goals.
- **Bookmarks**: Manage and save your most visited links locally.
- **Timer**: A beautiful, straightforward timer and stopwatch.
- **URI Encoder/Decoder**: Easily encode or decode Uniform Resource Identifiers safely.
- **Base64 Encoder/Decoder**: Quickly convert text or files to Base64 format and back.
- **SVG Tools**: Manipulate and inspect scalable vector graphics.
- **Color Picker**: Pick, convert, and manage colors (Hex, RGB, HSL).
- **Cron Generator**: Build and decipher cron schedule expressions with an intuitive UI.
- **Generators**: Generate random strings, UUIDs, passwords, and more.
- **Spreadsheet**: Convert and preview spreadsheet data effortlessly.

## 🛡️ Privacy & Security

**100% Local**: All tools run exclusively in your browser. There is no risk of leaking API keys, passwords, or company secrets because nothing is ever sent to a remote server for processing.

**Purposeful Storage**: Some tools (like the To-do list or Timer settings) may save data locally in your browser's `localStorage` to improve your experience. These persist only on your machine.

## 🛠️ Tech Stack

This project is built using modern, robust web technologies:

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) & [shadcn/ui](https://ui.shadcn.com/) (Customized)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Other Utilities**: `diff`, `colord`, `xlsx`, `zod`, `react-hook-form`

## 💻 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- `yarn` or `npm`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/tools.dnnr.dev.git
   cd tools.dnnr.dev
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   # or npm install
   ```

3. **Run the development server:**
   ```bash
   yarn dev
   # or npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better or want to add a new tool:
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingTool`)
3. Commit your Changes (`git commit -m 'Add some AmazingTool'`)
4. Push to the Branch (`git push origin feature/AmazingTool`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.