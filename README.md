# LinkBio - Link in Bio Web Application

A comprehensive Link in Bio web application built with Next.js 15, React, TypeScript, and TailwindCSS. Users can create personalized profile pages with multiple external links, track analytics, and customize their appearance with 25+ beautiful themes.

## 🚀 Features

### ✨ Core Features
- **Unlimited Links**: Add, edit, and delete links with titles, URLs, and custom icons
- **Drag & Drop Reordering**: Easily reorganize links with intuitive drag-and-drop
- **Live Preview**: Real-time preview of profile page while editing
- **Click Analytics**: Track total clicks per link with detailed statistics
- **25+ Themes**: Choose from beautiful pre-built themes with custom colors
- **QR Code Generator**: Generate and download QR codes for easy sharing
- **Responsive Design**: Mobile-first, fully responsive across all devices

### 📊 Dashboard Features
- **Link Management**: CRUD operations for all links
- **Profile Customization**: Edit name, bio, profile image, and background image
- **Analytics Dashboard**: View click statistics with interactive charts
- **Theme Selector**: Browse and select from 25+ themes
- **Live Preview Panel**: See changes in real-time

### 🎨 Customization Options
- Profile picture upload (via URL)
- Custom background image (via URL)
- 25+ pre-built themes including:
  - Ocean, Sunset, Forest, Midnight, Candy
  - Neon, Rose Gold, Lavender, Minty Fresh
  - Cherry Blossom, Arctic, Galaxy, Peach
  - Monochrome, Sunrise, Aqua, Violet Dreams
  - Autumn, Emerald, Cosmic, Tropical
  - Pastel, Noir, Spring Meadow, and more!

### 📈 Analytics Features
- Total clicks across all links
- Individual link performance
- Clicks over time (line chart)
- Link performance comparison (bar chart)
- Top performing links ranking

### 🔧 Admin Panel
- User management dashboard
- View all users and their statistics
- Delete users
- Platform-wide statistics
- Search functionality

### 🌐 Public Profile Pages
- Accessible via username slug (e.g., `/johndoe`)
- Beautiful themed designs
- Animated transitions
- Click tracking on all links
- Mobile-optimized

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **Shadcn/UI** - Component library
- **Framer Motion** - Animations
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Recharts** - Analytics charts
- **QRCode.react** - QR code generation
- **DND Kit** - Drag and drop functionality

### Backend
- **Next.js API Routes** - RESTful API
- **In-Memory Mock Database** - Data storage (easily replaceable with SQL)

## 📁 Project Structure

```
src/
├── app/
│   ├── api/                    # API routes
│   │   ├── users/             # User CRUD endpoints
│   │   ├── links/             # Link CRUD & reorder endpoints
│   │   ├── analytics/         # Analytics data endpoints
│   │   └── admin/             # Admin statistics endpoints
│   ├── dashboard/             # Dashboard page
│   ├── admin/                 # Admin panel page
│   ├── [username]/            # Dynamic public profile pages
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Landing page
│   └── globals.css            # Global styles
├── components/
│   ├── dashboard/             # Dashboard components
│   │   ├── LinkManager.tsx
│   │   ├── SortableItem.tsx
│   │   ├── LinkFormDialog.tsx
│   │   ├── ProfileEditor.tsx
│   │   ├── LivePreview.tsx
│   │   ├── AnalyticsDashboard.tsx
│   │   └── QRCodeGenerator.tsx
│   └── ui/                    # Shadcn UI components
├── lib/
│   ├── types.ts               # TypeScript interfaces
│   ├── themes.ts              # Theme configurations
│   ├── mockData.ts            # Mock database & helpers
│   ├── linkIcons.tsx          # Icon configurations
│   └── utils.ts               # Utility functions
└── hooks/                     # Custom React hooks
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd linkbio
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Usage

### For Users

1. **Create Your Profile**
   - Visit `/dashboard`
   - Edit your profile information (name, bio, images)
   - Select a theme from 25+ options

2. **Add Links**
   - Click "Add Link" in the Links tab
   - Enter title, URL, and select an icon
   - Drag and drop to reorder links

3. **View Analytics**
   - Navigate to the Analytics tab
   - View total clicks, click trends, and link performance
   - See your top performing links

4. **Generate QR Code**
   - Go to the QR Code tab
   - Download your profile's QR code
   - Share offline at events or print on materials

5. **Share Your Profile**
   - Your profile is accessible at `/{username}`
   - Share this link on social media, email, etc.

### For Admins

1. Visit `/admin` to access the admin panel
2. View platform-wide statistics
3. Manage users (view, delete)
4. Search for specific users

## 🎨 Available Themes

The application includes 25+ beautiful themes:
- Default, Ocean, Sunset, Forest, Midnight
- Candy, Neon, Rose Gold, Lavender, Minty Fresh
- Cherry Blossom, Arctic, Galaxy, Peach, Monochrome
- Sunrise, Aqua, Violet Dreams, Autumn, Emerald
- Cosmic, Tropical, Pastel, Noir, Spring Meadow

Each theme includes custom colors for:
- Background gradients
- Card backgrounds
- Text colors
- Link button colors
- Hover effects
- Accent colors

## 📊 API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/username/:username` - Get user by username
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Links
- `GET /api/links?userId=:id` - Get links by user ID
- `POST /api/links` - Create new link
- `PUT /api/links/:id` - Update link
- `DELETE /api/links/:id` - Delete link
- `POST /api/links/reorder` - Reorder links
- `POST /api/links/click/:id` - Track link click

### Analytics
- `GET /api/analytics/:userId` - Get analytics for user

### Admin
- `GET /api/admin/stats` - Get platform statistics

## 🗄️ Database Schema

### Users Table
```typescript
{
  id: number;
  username: string;
  name: string;
  bio: string;
  profileImage: string;
  backgroundImage: string;
  theme: string;
  createdAt: string;
  updatedAt: string;
}
```

### Links Table
```typescript
{
  id: number;
  userId: number;
  title: string;
  url: string;
  icon: string;
  orderIndex: number;
  clickCount: number;
  createdAt: string;
  updatedAt: string;
}
```

## 🔄 Migrating to SQL Database

The current implementation uses an in-memory mock database. To migrate to a real SQL database:

1. Install your preferred database driver (e.g., PostgreSQL, MySQL)
2. Update the functions in `src/lib/mockData.ts` to use SQL queries
3. Implement proper connection pooling
4. Add database migrations
5. Update API routes to use the new database functions

## 🎯 Future Enhancements

- [ ] User authentication (login/signup)
- [ ] Email verification
- [ ] Custom domain mapping
- [ ] Advanced analytics (geographic data, referrers)
- [ ] Social media integrations
- [ ] Link scheduling
- [ ] A/B testing for links
- [ ] Custom CSS editor
- [ ] Bulk link import/export
- [ ] Team collaboration features

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Known Issues

- No authentication system (users are accessed by ID)
- In-memory database (data resets on server restart)
- Image uploads require external URLs

## 📧 Support

For support, please open an issue in the repository.

---

Built with ❤️ using Next.js and React