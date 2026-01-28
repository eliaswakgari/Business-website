# ProCMS Deployment Guide

Deploy your CMS platform to production on Vercel.

## 🚀 Deploy to Vercel (Recommended)

### Prerequisites

- GitHub account
- Vercel account (free tier works)
- Completed local setup (see SETUP_GUIDE.md)

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - ProCMS"
git branch -M main
git remote add origin https://github.com/yourusername/procms.git
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: **Next.js**
   - Root Directory: `landing-page-template-2` (if in subdirectory)
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Step 3: Add Environment Variables

In Vercel project settings, add these environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

**Important**: Use your production Supabase project, not development!

### Step 4: Deploy

1. Click **Deploy**
2. Wait 2-3 minutes
3. Your site is live! 🎉

### Step 5: Configure Custom Domain (Optional)

1. In Vercel project, go to **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_SITE_URL` environment variable

### Step 6: Update Supabase Redirect URLs

1. Go to Supabase Dashboard
2. **Authentication** → **URL Configuration**
3. Add your production URL to:
   - Site URL: `https://yourdomain.com`
   - Redirect URLs: `https://yourdomain.com/auth/callback`

## 🔒 Production Security Checklist

- [ ] Use production Supabase project (not development)
- [ ] Enable RLS policies on all tables
- [ ] Keep service role key secret
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Configure CORS in Supabase
- [ ] Set up email authentication
- [ ] Enable rate limiting
- [ ] Configure CSP headers
- [ ] Set up monitoring

## 📊 Post-Deployment

### Monitor Your Site

1. **Vercel Analytics**: Automatic in Vercel dashboard
2. **Supabase Logs**: Check database queries and errors
3. **Error Tracking**: Consider adding Sentry

### Performance Optimization

1. **Enable ISR**: Already configured for blog posts
2. **Image Optimization**: Using Next.js Image component
3. **Edge Functions**: Consider for API routes
4. **CDN**: Automatic with Vercel

### Backup Strategy

1. **Database Backups**: Automatic in Supabase (daily)
2. **Manual Backups**: Export from Supabase Dashboard
3. **Code Backups**: GitHub repository

## 🌍 Alternative Deployment Options

### Deploy to Netlify

1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables
5. Deploy

### Deploy to Your Own Server

1. Build the project: `npm run build`
2. Start server: `npm start`
3. Use PM2 or similar for process management
4. Configure Nginx reverse proxy
5. Set up SSL with Let's Encrypt

### Deploy with Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

## 🔄 Continuous Deployment

### Automatic Deployments

Vercel automatically deploys when you push to GitHub:

- **main branch** → Production
- **other branches** → Preview deployments

### Preview Deployments

Every pull request gets a unique preview URL for testing.

## 📈 Scaling

### Database Scaling

1. Upgrade Supabase plan as needed
2. Add read replicas for high traffic
3. Implement caching strategy

### Application Scaling

1. Vercel scales automatically
2. Consider Edge Functions for global performance
3. Implement CDN for static assets

## 🐛 Troubleshooting Production Issues

### Build Failures

**Check**:
- Environment variables are set
- Dependencies are installed
- TypeScript errors are fixed
- Build command is correct

### Runtime Errors

**Check**:
- Supabase connection
- Environment variables
- RLS policies
- API routes

### Performance Issues

**Check**:
- Database query optimization
- Image optimization
- Caching strategy
- Bundle size

## 📝 Maintenance

### Regular Tasks

- [ ] Update dependencies monthly
- [ ] Review security advisories
- [ ] Monitor error logs
- [ ] Check database performance
- [ ] Review and optimize queries
- [ ] Update content regularly

### Updates

```bash
# Update dependencies
npm update

# Check for security issues
npm audit

# Fix security issues
npm audit fix
```

## 🎯 Production Best Practices

1. **Environment Separation**: Use different Supabase projects for dev/prod
2. **Secrets Management**: Never commit `.env.local`
3. **Database Migrations**: Test in development first
4. **Monitoring**: Set up alerts for errors
5. **Backups**: Regular database backups
6. **Documentation**: Keep deployment docs updated

## 📞 Support

For deployment issues:
1. Check Vercel deployment logs
2. Check Supabase logs
3. Review error messages
4. Check environment variables

---

**Your CMS is now live and ready for production use!** 🚀
