# Next.js Supabase Starter Template

A production-ready starter template built with **Next.js 16**, **Supabase**, **React Query**, and **Shadcn UI**.

<img width="1919" height="994" alt="Screenshot 2025-12-15 at 3 58 11 PM" src="https://github.com/user-attachments/assets/d051c0eb-9e1b-4155-951b-c5d83320e683" />

## 🚀 Features

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Actions)
- **Authentication**: [Supabase Auth](https://supabase.com/auth) (Magic Link configured)
- **Database**: [Supabase Postgres](https://supabase.com/database)
- **State Management**: [TanStack React Query](https://tanstack.com/query/latest)
- **UI Library**: [Shadcn UI](https://ui.shadcn.com/) + [Tailwind CSS 4](https://tailwindcss.com/)
- **Styling**: Dark mode ready, beautiful gradients, and polished aesthetics.
- **UX**: [Sonner](https://sonner.emilkowal.ski/) Toasts for notifications.

## 🛠️ Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-username/next-supabase-template.git
cd next-supabase-template
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📂 Project Structure

- `app/` - Next.js App Router pages and layouts.
  - `app/login/` - Dedicated login page.
  - `app/page.tsx` - Modern landing page.
- `components/ui/` - Reusable Shadcn UI components.
- `hooks/` - Custom hooks (e.g., `useUser`, `useUserAuth`).
- `lib/` - Supabase client configuration.
- `providers/` - React Context providers (QueryClient, Toaster).

## 🔐 Authentication

The template comes with pre-configured Email Magic Link authentication.

- **Login**: `/login` uses `supabase.auth.signInWithOtp`
- **Hooks**: `useUser` for session state, `useUserAuth` for actions.
- **Feedback**: Integrated toasts handling success/error states.

## 🎨 UI Customization

Built with Tailwind CSS. Modify `app/globals.css` to update the color palette or theme variables.
Global scrollbars are hidden by default for a cleaner look.

## 📄 License

MIT
