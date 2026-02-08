# VAPI Demo Share

A modern web application for creating and sharing VAPI calling agent demos with prospects. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🚀 **Quick Demo Creation** - Create shareable AI calling agent demos in seconds
- 🔗 **Shareable Links** - Generate unique links for each demo
- 📱 **Browser-Based Calls** - Prospects can talk to AI agents directly from their browser
- 🎨 **Beautiful UI** - Modern, responsive design with dark mode support
- 💾 **Database Storage** - SQLite database for demo persistence

## Prerequisites

- Node.js 18+ installed
- A VAPI account and API keys ([Get them here](https://dashboard.vapi.ai))

## Setup Instructions

### Quick Setup (Recommended)

Run the setup wizard:

```powershell
.\setup.ps1
```

The script will:
- Check for required files
- Install dependencies if needed
- Create the database
- Guide you through VAPI configuration

### Manual Setup

If you prefer manual setup:

### 1. Clone or Navigate to the Project

```bash
cd calling-agent-demo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file:

```bash
copy .env.example .env
```

Edit `.env` and add your VAPI keys:

```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_VAPI_PUBLIC_KEY="your_public_key_here"
VAPI_PRIVATE_KEY="your_private_key_here"
```

To get your VAPI keys:
1. Go to [VAPI Dashboard](https://dashboard.vapi.ai)
2. Navigate to Settings > API Keys
3. Copy your Public Key and Private Key

### 4. Set Up the Database

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Creating a Demo

1. Fill in the demo name (e.g., "Sales Assistant Demo")
2. Enter the system prompt that defines your AI agent's behavior
3. Click "Create Demo"
4. Copy and share the generated link with prospects

### Sharing with Prospects

Send the generated link to prospects. When they click it, they can:
1. Click the "Start Call" button
2. Allow microphone access
3. Talk to the AI agent in real-time

## Project Structure

```
calling-agent-demo/
├── app/
│   ├── api/
│   │   └── demos/          # API routes for demo CRUD
│   ├── demo/
│   │   └── [publicId]/     # Dynamic demo pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/
│   ├── CreateDemoForm.tsx  # Demo creation form
│   └── DemoPage.tsx        # Demo interaction page
├── lib/
│   ├── prisma.ts           # Prisma client
│   ├── utils.ts            # Utility functions
│   └── types.ts            # TypeScript types
├── prisma/
│   └── schema.prisma       # Database schema
└── package.json
```

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Prisma** - Database ORM
- **SQLite** - Lightweight database
- **VAPI AI** - Voice AI platform
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications

## Customization

### Changing the Voice

Edit the voice configuration in `components/DemoPage.tsx`:

```typescript
voice: {
  provider: "11labs",
  voiceId: "your_voice_id", // Change this
}
```

### Changing the AI Model

Edit the model configuration in `components/DemoPage.tsx`:

```typescript
model: {
  provider: "openai",
  model: "gpt-4", // or "gpt-3.5-turbo"
}
```

### Custom Styling

All styles use Tailwind CSS. Customize colors in `tailwind.config.ts`.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Database for Production

For production, replace SQLite with PostgreSQL:

1. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Update your `.env` with PostgreSQL connection string
3. Run `npx prisma db push`

## Troubleshooting

### VAPI not connecting

- Ensure your VAPI public key is correctly set in `.env`
- Check browser console for errors
- Verify microphone permissions are granted

### Database errors

- Run `npx prisma generate` to regenerate the Prisma client
- Run `npx prisma db push` to sync the database schema

## Support

For issues with VAPI, visit [VAPI Documentation](https://docs.vapi.ai)

## License

MIT
