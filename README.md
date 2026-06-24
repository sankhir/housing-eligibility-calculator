# Housing Eligibility Calculator

A full-stack web application for determining housing assistance eligibility based on household size, annual income, and county. Built with Next.js, Supabase, Vercel, and PostHog.

## Tech Stack

- **Frontend:** Next.js 15, Tailwind CSS
- **Backend/Auth/Database:** Supabase
- **Deployment:** Vercel
- **Analytics:** PostHog

## Local Setup Instructions

### 1. Clone the repository

git clone https://github.com/sankhir/housing-eligibility-calculator.git
cd housing-eligibility-calculator

### 2. Install dependencies

npm install

### 3. Set up environment variables

Create a `.env.local` file in the root of the project and add the following:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_api_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

### 4. Set up the Supabase database

In your Supabase project, open the SQL Editor and run the following:

CREATE TABLE calculations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    household_size INT NOT NULL,
    annual_income NUMERIC NOT NULL,
    county TEXT NOT NULL,
    is_eligible BOOLEAN NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE calculations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own calculations" ON calculations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own calculations" ON calculations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own calculations" ON calculations
    FOR DELETE USING (auth.uid() = user_id);

### 5. Run the development server

npm run dev

Then open http://localhost:3000 in your browser.

## Features

- User authentication (sign up, log in, log out)
- AMI-based housing eligibility calculator for Palm Beach, Broward, and Miami-Dade counties
- Calculation history saved per user account
- Delete past calculations
- PostHog analytics tracking eligibility calculation events

## Live Demo

https://housing-eligibility-calculator-ltt0bruw8-sankhir1.vercel.app
