# 🚀 Deployment Guide for Vercel with Neon Database

## Prerequisites
- GitHub account
- Vercel account (free)
- Neon account (free, no credit card needed)

---

## Part 1: Set Up Neon Database (5 minutes)

### Step 1: Create Neon Account
1. Go to https://neon.tech
2. Click **"Sign Up"**
3. Sign up with GitHub (easiest) or email
4. No credit card required!

### Step 2: Create Database
1. After signup, click **"Create Project"**
2. Give it a name: `xcelerateai-demos` (or any name)
3. Select region: **Choose closest to you or your users**
4. Click **"Create Project"**

### Step 3: Get Connection String
1. On the dashboard, you'll see **"Connection Details"**
2. Copy the **"Connection string"** (it looks like this):
   ```
   postgresql://username:password@ep-xxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
3. **SAVE THIS** - you'll need it in a moment!

---

## Part 2: Push Code to GitHub (3 minutes)

### Step 1: Initialize Git (if not done)
```bash
git init
git add .
git commit -m "Initial commit - XcelerateAI calling agent demo"
```

### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `calling-agent-demo` (or any name)
3. Keep it **Private** (recommended)
4. Click **"Create repository"**

### Step 3: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/calling-agent-demo.git
git branch -M main
git push -u origin main
```

---

## Part 3: Deploy to Vercel (5 minutes)

### Step 1: Import Project
1. Go to https://vercel.com
2. Click **"Add New..."** → **"Project"**
3. Click **"Import"** next to your GitHub repository
4. Click **"Import"**

### Step 2: Configure Environment Variables
Before clicking "Deploy", add these environment variables:

1. Click **"Environment Variables"**
2. Add these three variables:

   **Variable 1:**
   - Name: `DATABASE_URL`
   - Value: `your_neon_connection_string` (from Part 1, Step 3)

   **Variable 2:**
   - Name: `NEXT_PUBLIC_VAPI_PUBLIC_KEY`
   - Value: `29eb6e71-263a-4830-9b49-1e92794693b6`

   **Variable 3:**
   - Name: `VAPI_PRIVATE_KEY`
   - Value: `e480ca1c-71dd-4a6a-b2e0-ed3f5521827b`

3. Click **"Deploy"**

### Step 3: Wait for Deployment
- Takes 2-3 minutes
- You'll see a success screen with confetti! 🎉

---

## Part 4: Set Up Database (2 minutes)

Your app is deployed, but we need to create the database tables.

### Option A: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Link to your project:
   ```bash
   vercel link
   ```

3. Pull environment variables:
   ```bash
   vercel env pull .env.local
   ```

4. Run migration:
   ```bash
   DATABASE_URL="your_neon_url" npx prisma migrate deploy
   ```

### Option B: Using Prisma Studio (Alternative)

1. Go to your Neon dashboard
2. Open SQL Editor
3. Run this SQL:
   ```sql
   CREATE TABLE "Demo" (
       "id" TEXT NOT NULL PRIMARY KEY,
       "name" TEXT NOT NULL,
       "prompt" TEXT NOT NULL,
       "publicId" TEXT NOT NULL,
       "apiKey" TEXT,
       "vapiConfig" TEXT,
       "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
       "updatedAt" TIMESTAMP(3) NOT NULL
   );
   
   CREATE UNIQUE INDEX "Demo_publicId_key" ON "Demo"("publicId");
   CREATE INDEX "Demo_publicId_idx" ON "Demo"("publicId");
   ```

---

## Part 5: Test Your Deployment! 🎉

1. Click on your deployment URL (looks like: `calling-agent-demo.vercel.app`)
2. Create a test demo
3. Share the link
4. Test the calling feature!

---

## 🔧 Troubleshooting

### "Database connection error"
- Check your DATABASE_URL in Vercel environment variables
- Make sure you ran the migration (Part 4)

### "VAPI configuration missing"
- Verify NEXT_PUBLIC_VAPI_PUBLIC_KEY is set in Vercel
- Redeploy if you added variables after first deployment

### "Demo not saving"
- Make sure database migration completed successfully
- Check Vercel logs for errors

---

## 📱 Your Live URLs

After deployment, you'll have:
- **Production URL**: `https://your-project.vercel.app`
- **Custom Domain**: Can add in Vercel settings

---

## 🔄 Making Updates

After initial deployment, to update your app:

```bash
git add .
git commit -m "Your update message"
git push
```

Vercel will automatically redeploy! ⚡

---

## 💰 Costs

- **Vercel**: $0/month (Hobby plan)
- **Neon**: $0/month (Free tier - 3GB storage)
- **VAPI**: Pay-as-you-go (you have $10 free credits)

**Total monthly cost: $0** 🎉

---

## 🎯 Next Steps

1. Test your deployed app thoroughly
2. Share demo links with prospects
3. Monitor usage in Neon dashboard
4. Check VAPI usage at https://dashboard.vapi.ai

**Need help?** Check Vercel logs for any deployment issues!
