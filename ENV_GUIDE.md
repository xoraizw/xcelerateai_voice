# Environment Configuration Guide

## Required Environment Variables

### DATABASE_URL
- **Purpose**: Connection string for the SQLite database
- **Default**: `file:./dev.db`
- **Note**: For production, consider PostgreSQL

### NEXT_PUBLIC_VAPI_PUBLIC_KEY
- **Purpose**: Your VAPI public API key (client-side)
- **Required**: Yes
- **Format**: Starts with `pk_`
- **Where to get it**: https://dashboard.vapi.ai → Settings → API Keys

### VAPI_PRIVATE_KEY
- **Purpose**: Your VAPI private API key (server-side, optional for future features)
- **Required**: No (for current features)
- **Format**: Starts with `sk_`
- **Where to get it**: https://dashboard.vapi.ai → Settings → API Keys

## VAPI Account Setup

1. **Create Account**
   - Visit https://vapi.ai
   - Sign up for a free account
   - Verify your email

2. **Get API Keys**
   - Go to https://dashboard.vapi.ai
   - Navigate to Settings → API Keys
   - Copy your Public Key (pk_...)
   - Copy your Private Key (sk_...) if needed

3. **Add Credits (if needed)**
   - VAPI uses a pay-as-you-go model
   - Go to Billing in dashboard
   - Add credits to start using the API
   - Typical costs: ~$0.05-0.15 per minute

## Security Notes

- Never commit `.env` to version control (already in .gitignore)
- Keep your private key secret
- Public key is safe to use in client-side code
- Rotate keys if compromised

## Testing Without Real Calls

If you want to test the UI without making actual VAPI calls:

1. You can still create demos (no API key needed)
2. The demo pages will show a configuration error
3. Once you add your key, everything will work

## Deployment Considerations

When deploying to production:

1. Set environment variables in your hosting platform
2. Use PostgreSQL instead of SQLite
3. Consider rate limiting
4. Monitor VAPI usage and costs

## Support

If you have issues with VAPI:
- Documentation: https://docs.vapi.ai
- Support: support@vapi.ai
- Discord: https://discord.gg/vapi
