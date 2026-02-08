# 🚀 Quick Start Guide - VAPI Demo Share

## Getting Your VAPI API Keys

Before you can use the application, you need to get your VAPI API keys:

1. **Sign up for VAPI**
   - Go to [https://vapi.ai](https://vapi.ai)
   - Create an account or sign in

2. **Get Your API Keys**
   - Navigate to [https://dashboard.vapi.ai](https://dashboard.vapi.ai)
   - Go to Settings → API Keys
   - Copy your **Public Key** (starts with `pk_`)
   - Copy your **Private Key** (starts with `sk_`)

3. **Add Keys to `.env`**
   - Open the `.env` file in the project root
   - Replace the empty values:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXT_PUBLIC_VAPI_PUBLIC_KEY="your_public_key_here"
   VAPI_PRIVATE_KEY="your_private_key_here"
   ```

## Running the Application

The application is already set up and running at:

**🌐 http://localhost:3001**

Just open your browser and navigate to this URL!

## Using the Application

### Creating a Demo

1. On the homepage, you'll see a form to create a new demo
2. Fill in:
   - **Demo Name**: A descriptive name (e.g., "Sales Assistant Demo")
   - **Agent Prompt**: Instructions for how the AI should behave
   
   Example prompt:
   ```
   You are a friendly sales assistant for TechCorp. Your role is to:
   - Greet customers warmly
   - Answer questions about our products
   - Help customers understand pricing
   - Schedule demos if requested
   Keep responses concise and helpful.
   ```

3. Click "Create Demo"
4. You'll get a unique shareable link like: `http://localhost:3001/demo/ABC123XYZ`

### Sharing with Prospects

1. Copy the generated link
2. Send it to your prospects via email, SMS, or any messaging platform
3. When they open the link, they'll see:
   - The demo name
   - A big green "Start Call" button
   - The agent's prompt/instructions

### Testing a Demo

1. Click "Test Demo" or open the shareable link
2. Click the green "Start Call" button
3. Allow microphone access when prompted
4. Start talking to the AI agent!
5. Click the red "End Call" button when done

## Example Prompts

### Sales Assistant
```
You are a professional sales representative for [Company Name]. Your goal is to understand the customer's needs, explain our product benefits, and book a demo if appropriate. Be friendly, concise, and helpful.
```

### Customer Support
```
You are a customer support agent. Help customers troubleshoot issues, answer questions about our service, and escalate to human support if needed. Be patient and thorough in your explanations.
```

### Appointment Scheduler
```
You are an appointment scheduling assistant. Greet callers warmly, ask about their preferred dates and times, and confirm bookings. Be efficient and clear in your communication.
```

## Customizing Voice and AI Model

You can customize the voice and AI model in `components/DemoPage.tsx`:

### Change Voice
```typescript
voice: {
  provider: "11labs",
  voiceId: "21m00Tcm4TlvDq8ikWAM", // Default: Rachel
}
```

Popular ElevenLabs voice IDs:
- `21m00Tcm4TlvDq8ikWAM` - Rachel (warm female)
- `ErXwobaYiN019PkySvjV` - Antoni (warm male)
- `MF3mGyEYCl7XYWbV9V6O` - Elli (energetic female)

### Change AI Model
```typescript
model: {
  provider: "openai",
  model: "gpt-4", // Options: "gpt-4", "gpt-3.5-turbo"
}
```

## Troubleshooting

### "VAPI configuration missing" Error
- Make sure you've added your VAPI public key to `.env`
- Restart the dev server after adding keys
- Check that the key starts with `pk_`

### Microphone Not Working
- Ensure browser has microphone permissions
- Check system microphone settings
- Try a different browser (Chrome recommended)

### Call Not Connecting
- Verify VAPI keys are correct
- Check browser console for errors (F12)
- Ensure you have credits in your VAPI account

## Project Structure

```
calling-agent-demo/
├── app/
│   ├── api/demos/          # API endpoints for CRUD operations
│   ├── demo/[publicId]/    # Dynamic demo pages
│   ├── layout.tsx          # Root layout with Toaster
│   ├── page.tsx            # Homepage with form
│   └── globals.css         # Global styles
├── components/
│   ├── CreateDemoForm.tsx  # Form to create demos
│   └── DemoPage.tsx        # Demo interaction page with VAPI
├── lib/
│   ├── prisma.ts           # Prisma client singleton
│   ├── utils.ts            # Helper functions
│   └── types.ts            # TypeScript interfaces
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── dev.db              # SQLite database
└── .env                    # Environment variables
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Reset database
npx prisma db push --force-reset

# View database in browser
npx prisma studio
```

## Next Steps

1. **Add Your VAPI Keys** to the `.env` file
2. **Create Your First Demo** at http://localhost:3001
3. **Test It Out** by clicking "Test Demo"
4. **Share the Link** with prospects!

## Support

- **VAPI Documentation**: https://docs.vapi.ai
- **VAPI Dashboard**: https://dashboard.vapi.ai
- **Voice Library**: https://elevenlabs.io/voice-library

Enjoy building amazing AI calling experiences! 🎉
